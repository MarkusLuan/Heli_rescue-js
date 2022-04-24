function onKeyPress(event){
    var key = event.code;
    key = key.toUpperCase();
    key = key.replace("KEY", "");

    keysMovimentacao(key);
    
    console.log(key);
    console.log(player.x + ", " + player.y);
}

function keysMovimentacao(key) {
    if (key == "ARROWUP" && player.y > 2){
        player.y -= player.velocidade;
    }
    
    if (key == "ARROWLEFT" && player.x > 2){
        player.x -= player.velocidade;
    }

    if (key == "ARROWRIGHT" && (player.x + player.w) < (w + 2)){
        player.x += player.velocidade;
    }

    if (key == "ARROWDOWN" && (player.y + player.h) < (h - 2)){
        player.y += player.velocidade;
    }

    if (key == "SPACE"){
        tiros.push(Tiro(player, "#0000FF"));
    }
}