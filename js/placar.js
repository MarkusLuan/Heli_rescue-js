let pontos = 0;
let resgates = 0;

function updatePlacar(){
    const placar = document.getElementById("placar");
    const placarGameOver = document.getElementById("placar_game_over");

    placar.innerText = placarGameOver.innerText = `Pontuação: ${pontos}\nResgates: ${resgates}`;
}