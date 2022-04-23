let posCenario = 0;
let velocidadeCenario = 2;
const velocidadeCenarioMaxima = 40;

function desenharRua(){
    canvas_obj.fillStyle = "#555";

    canvas_obj.fillRect(0, h-40, w, 40);

    // Desenha faixas
    for (let a=0; a<30; a += 1){
        let posX = (10 + (a*50)) + posCenario;
        if (posX < -20) continue;
        if (posX > (w + 20)) break;

        canvas_obj.fillStyle = "#FFF";
        canvas_obj.fillRect(posX, (h-20), 20, 5);
    }
}

function desenharCeu(){
    canvas_obj.drawImage(img_nuvem, (w + (posCenario * 0.8)), 10, 50, 50);

    canvas_obj.drawImage(img_nuvem, (w + (posCenario * 0.5) + 50), 60, 50, 50);
}

function desenharArvore(){
    for (let a=0; a<30; a+=1){
        let posX = 20 + (posCenario) + (a*150);

        if (posX < -35) continue;
        if (posX > (w + 35)) break;

        canvas_obj.drawImage(img_arvore, posX, (h-75), 35, 40);
    }
}

function desenharCenario(){
    canvas_obj.drawImage(img_montains, 0, 0, w, h);
    
    desenharCeu();
    desenharArvore();
    desenharRua();

    posCenario -= velocidadeCenario;

    if (posCenario <= -800) posCenario = 0;
    if (velocidadeCenario < velocidadeCenarioMaxima) velocidadeCenario += 0.005;
}