const Tiro = (_por, cor) => {
    const por = _por;
    
    var x = (por.x + por.w/2) - 2;
    var y = por.y + por.h;
    var direcao = 10; //O tiro se move de 10 em 10 pixeis e tem tamanho de 10 pixeis

    // Se o tiro for do jogador será da esquerda para direita
    // Se não será da direita para esquerda
    if (por != player){
        direcao *= -1;
    }

    return {
        "x": x,
        "y": y,
        "por": por,
        "direcao": direcao,
        "cor": cor
    }
};