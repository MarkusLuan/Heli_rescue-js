let pontos = 0;
let resgates = 0;

function updatePlacar(){
    const placar = document.getElementById("placar");

    placar.innerText = `Pontuação: ${pontos}\nResgates: ${resgates}`;
}