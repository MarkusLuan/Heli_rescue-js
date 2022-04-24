function init(){
    reset();
    
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

function reset(){
    pontos = 0;
    resgates = 0;

    tiros = [];
    inimigos = [];
    player = Helicoptero(10, 10, false);

    if (updateInterval){
        clearInterval(updateInterval);
    }
    updateInterval = setInterval(onUpdate, 60);

    posCenario = 0;
    velocidadeCenario = 2;
}

function gameOver() {
    audio_bg.pause();
    audio_bg.currentTime = 0;

    clearInterval(updateInterval);

    main_menu.style.display = "";
    game_over.style.display = "";
    canvas.style.display = "none";
}