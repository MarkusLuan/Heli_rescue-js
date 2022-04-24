function init(){
    tiros = [];
    inimigos = [];
    player = Helicoptero(10, 10, false);

    canvas_obj = canvas.getContext("2d");
    w = canvas_el.width;
    h = canvas_el.height;

    spawndarInimigo();

    audio_bg.play();
}

function limparCanvas() {
    canvas_obj.fillStyle = "#000";

    canvas_obj.fillRect(0, 0, w, h);

    canvas_obj.fillStyle = "#000";
}

function onUpdate() {
    limparCanvas();

    desenharCenario();
    desenharPlayer(player);

    moverTiros();
    moverInimigos();

    updatePlacar();
}