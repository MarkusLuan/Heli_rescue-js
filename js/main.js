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

        /*
        // TODO: Dedectar colisao
        if (tiroColidir(tiro)){
            index = tiros.indexOf(tiro);
            tiros.splice(index, 1);
        }
        */
    }
}