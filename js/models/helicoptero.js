const Helicoptero = (x, y, isInimigo) => {
    const w = 80;
    const h = 26;
    const velocidade = 2;

    const img = isInimigo ? "helicopter_inimigo.png": "helicopter.png";

    return {
        "x": x,
        "y": y,
        "w": w,
        "h": h,
        "direcao": 1,
        "velocidade": velocidade,
        "sprite": Sprite(img, 0, 0, 96, 32, 8),
        "tipo": "HELICOPTERO"
    };
};