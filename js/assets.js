// Imagens
const img_montains = document.createElement("img");
img_montains.src = "assets/sprites/Mountains.jpg";

const img_nuvem = document.createElement("img");
img_nuvem.src = "assets/sprites/nuvem.png";

const img_arvore = document.createElement("img");
img_arvore.src = "assets/sprites/arvore.png";

const img_explosao = document.createElement("img");
img_explosao.src = "assets/sprites/explosao.png";

// Audios
const audio_bg = new Audio("assets/audio/bg.mp3");
audio_bg.loop = true;
audio_bg.volume = 0.8;

const audio_tiro = new Audio("assets/audio/tiro.mp3");
audio_tiro.onplay = function() {
    console.log("on play");
    setTimeout(() => {
        console.log("fim on play");
        this.pause();
        this.currentTime = 0;
    }, 1000);
};

const audio_explosao = new Audio("assets/audio/explosao.mp3");