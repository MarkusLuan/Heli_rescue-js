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
        
        // Dedectar colisao de tiro
        if (dedectarColisaoTiro(tiro)){
            index = tiros.indexOf(tiro);
            tiros.splice(index, 1);

            canvas_obj.drawImage(img_explosao, tiro.x, tiro.y - 40, 40, 40);
        }
    }
}

function dedectarColisaoTiro(tiro){
    var colidiu = false;

    let inimigo = inimigos.find(inimigo => {
        var minX = inimigo.x;
        var maxX = inimigo.x + inimigo.w;
        var minY = inimigo.y;
        var maxY = inimigo.y + inimigo.h;

        return tiro.por != inimigo &&
                (tiro.x >= minX && tiro.x <= maxX) &&
                (tiro.y >= minY && tiro.y <= maxY);
    });

    if (inimigo != null){
        var index = inimigos.indexOf(inimigo);
        inimigos.splice(index, 1);

        //if (tiro.por == player) pontos += 2;
        colidiu = true;
    }

    if (tiro.por != player){
        var minX = player.x;
        var maxX = player.x + player.w;
        var minY = player.y;
        var maxY = player.y + player.h;

        if ((tiro.x >= minX && tiro.x <= maxX) &&
            (tiro.y >= minY && tiro.y <= maxY)){
            //pontos -= 5;
            colidiu = true;
        }
    }

    return colidiu;
}

function desenharPlayer(player){
    let x = player.x;

    canvas_obj.save();
    if (player.direcao < 0){
        canvas_obj.translate(w, 0);
        canvas_obj.scale(-1, 1);
        x = w - (x + player.w);
    }

    canvas_obj.drawImage(player.sprite.img, player.sprite.x, player.sprite.y, player.sprite.w, player.sprite.h, x, player.y, player.w, player.h);
    canvas_obj.restore();

    player.sprite.next();
}

function spawndarInimigo(){
    console.log("spawndando inimigo");

    let y = parseInt(Math.random() * h);
    let inimigo;

    if (y < (h-65)) {
        inimigo = Helicoptero();
        inimigo.direcao = -1;
        inimigo.velocidade = -0.2;
    }
    else {
        inimigo = Carro();
        inimigo.direcao = 1;
        inimigo.velocidade = -0.5;
    }

    // Ajustar
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

        desenharPlayer(inimigo);

        //Remover o tiro da memória caso já tenha saido da tela
        if (inimigo.x <= 0){
            var index = inimigos.indexOf(inimigo);
            inimigos.splice(index, 1);
        }
    }
}