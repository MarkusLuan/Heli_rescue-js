function init(){
    tiros = [];
    player = Helicoptero(10, 10);

    canvas_obj = canvas.getContext("2d");
    w = canvas_el.width;
    h = canvas_el.height;
}

function limparCanvas() {
    canvas_obj.fillStyle = "#000";

    canvas_obj.fillRect(0, 0, w, h);

    canvas_obj.fillStyle = "#000";
}

function desenharPlayer(){
    canvas_obj.drawImage(player.sprite.img, player.sprite.x, player.sprite.y, player.sprite.w, player.sprite.h, player.x, player.y, player.w, player.h);
    player.sprite.next();
}

function onUpdate() {
    limparCanvas();

    desenharCenario();
    desenharPlayer();
    moverTiros();
}