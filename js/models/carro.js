const Carro = (x, y) => {
    const w = 80;
    const h = 26;
    const velocidade = 2;

    return {
        "x": x,
        "y": y,
        "w": w,
        "h": h,
        "direcao": 1,
        "velocidade": velocidade,
        "sprite": Sprite("carro.png", 0, 0, 165, 70, 1),
        "tipo": "CARRO"
    };
};