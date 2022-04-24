function moverTiros(){
    //Desenha cada tiro no canvas
    for (var tiro of tiros){
        tiro.x += tiro.direcao;

        canvas_obj.fillStyle = tiro.cor;

        canvas_obj.beginPath();
        canvas_obj.moveTo(tiro.x, tiro.y);
        canvas_obj.rect(tiro.x, tiro.y, Math.abs(tiro.direcao), 2);
        canvas_obj.fill();
        canvas_obj.closePath();

        //Remover o tiro da memória caso já tenha saido da tela
        if (tiro.x <= 0 || tiro.x >= w){
            var index = tiros.indexOf(tiro);
            tiros.splice(index, 1);
        }
        
        dedectarColisaoTiro(tiro);
    }
}

function isColidiu(obj1, obj2){
    const deburarColisao = false;
    if (deburarColisao){
        canvas_obj.strokeStyle = "#FF0000";
        canvas_obj.strokeRect(obj1.x, obj1.y, 5, 5);
        canvas_obj.strokeRect(obj1.x, (obj1.y + obj1.h), 5, 5);
        canvas_obj.strokeRect((obj1.x + obj1.w), obj1.y, 5, 5);
        canvas_obj.strokeRect((obj1.x + obj1.w), (obj1.y + obj1.h), 5, 5);

        canvas_obj.strokeRect(obj2.x, obj2.y, 5, 5);
        canvas_obj.strokeRect(obj2.x, (obj2.y + obj2.h), 5, 5);
        canvas_obj.strokeRect((obj2.x + obj2.w), obj2.y, 5, 5);
        canvas_obj.strokeRect((obj2.x + obj2.w), (obj2.y + obj2.h), 5, 5);
    }

    // Se o ponto da esquerda do obj1 cruza com o obj2
    let colidiuX = (obj1.x >= obj2.x) && obj1.x <= (obj2.x + obj2.w)
        || (obj2.x >= obj1.x) && obj2.x <= (obj1.x + obj1.w); // Se o ponto da direita do obj1 cruza com o obj2

    // Se o ponto de cima do obj1 cruza com o obj2
    let colidiuY = (obj1.y >= obj2.y) && obj1.y <= (obj2.y + obj2.h)
        || (obj2.y >= obj1.y) && obj2.y <= (obj1.y + obj1.h); // Se o ponto de baixo do obj1 cruza com o obj2

    return colidiuX && colidiuY;
}

function dedectarColisaoJogador(objeto){
    let colidiu = isColidiu(objeto, player);

    return colidiu;
}

function dedectarColisaoTiro(tiro){
    let colidiu = false;

    let inimigo = inimigos.find(inimigo => {
        return tiro.por != inimigo &&
            isColidiu(tiro, inimigo);
    });

    if (inimigo != null){
        var index = inimigos.indexOf(inimigo);
        inimigos.splice(index, 1);

        if (tiro.por == player) pontos += 5;
        explodir(inimigo);

        colidiu = true;
    }

    if (tiro.por != player && dedectarColisaoJogador(tiro)) {
        explodir(player);
        gameOver();

        colidiu = true;
    }

    if (prisioneiro && isColidiu(tiro, prisioneiro)) {
        prisioneiro = null;
        if (tiro.por == player) pontos -= 10;
        
        colidiu = true;
    }

    if (colidiu) {
        index = tiros.indexOf(tiro);
        tiros.splice(index, 1);
    }

    return colidiu;
}

function desenharSprite(objeto){
    let x = objeto.x;

    canvas_obj.save();
    if (objeto.direcao < 0){
        canvas_obj.translate(w, 0);
        canvas_obj.scale(-1, 1);
        x = w - (x + objeto.w);
    }

    canvas_obj.drawImage(objeto.sprite.img, objeto.sprite.x, objeto.sprite.y, objeto.sprite.w, objeto.sprite.h, x, objeto.y, objeto.w, objeto.h);
    canvas_obj.restore();

    objeto.sprite.next();
}

function spawndarInimigo(){
    console.log("spawndando inimigo");

    let y = parseInt(Math.random() * h);
    let inimigo;

    if (y < (h-65)) {
        inimigo = Helicoptero(0, 0, true);
        inimigo.direcao = -1;
        inimigo.velocidade = -0.2;
    }
    else {
        inimigo = Carro();
        inimigo.direcao = 1;
        inimigo.velocidade = -0.5;
    }

    // Ajustar posição inimigo
    if ((y + inimigo.h) > h){
        console.log("Ajustar posição inimigo: ", inimigo.y);
        y -= inimigo.h;
        console.log("Nova posição inimigo: ", inimigo.y);
    }

    inimigo.x = w;
    inimigo.y = y;
    inimigos.push(inimigo);
    
    let proximoInimigo = 2500 *  parseInt(Math.random() * 10); // parseInt(Math.random() * 360) * 100;
    setTimeout(spawndarInimigo, proximoInimigo);
    console.log(`Proximo inimigo em ${proximoInimigo}`);
}

function explodir(objeto){
    let audio = new Audio(audio_explosao.src);
    audio.play();

    canvas_obj.drawImage(img_explosao, objeto.x, objeto.y, objeto.w, objeto.h);
}

function moverInimigos(){
    //Desenha cada tiro no canvas
    for (var inimigo of inimigos){
        inimigo.x += inimigo.velocidade * velocidadeCenario;

        if (inimigo.tipo == "HELICOPTERO"){
            var atirar = parseInt(Math.random() * 50);

            if (atirar == 1) {
                var tiro = Tiro(inimigo, "#FF0000");
                tiros.push(tiro);
            }
        }

        desenharSprite(inimigo);

        //Remover o inimigo da memória caso já tenha saido da tela
        if ((inimigo.x + inimigo.w) <= 0){
            var index = inimigos.indexOf(inimigo);
            inimigos.splice(index, 1);
        }

        if (dedectarColisaoJogador(inimigo)) {
            var index = inimigos.indexOf(inimigo);
            inimigos.splice(index, 1);

            explodir(inimigo);
            gameOver();
        }

        if (prisioneiro && isColidiu(inimigo, prisioneiro) && (prisioneiro.y >= (inimigo.y - 10) && prisioneiro.y <= (inimigo.y + 10))) {
            prisioneiro = null;
        }
    }
}

function spawndarPrisioneiro(){
    let x = -20;
    let y = h - parseInt(Math.random() * 40);

    prisioneiro = Prisioneiro(x, y);
    prisioneiro.y -= prisioneiro.h;
}

function moverPrisioneiro() {
    if (prisioneiro == null) return;
    
    prisioneiro.x += prisioneiro.velocidade;
    desenharSprite(prisioneiro);

    if (isColidiu(prisioneiro, player)) {
        pontos += 10;
        resgates += 1;
        prisioneiro = null;
        return;
    };

    if (prisioneiro.x + prisioneiro.w >= w) {
        prisioneiro = null;
        return;
    }
}