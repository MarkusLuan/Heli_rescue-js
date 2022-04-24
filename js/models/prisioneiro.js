const Prisioneiro = (x, y) => {
    const w = 26;
    const h = 26;
    const velocidade = 0.5;

    return {
        "x": x,
        "y": y,
        "w": w,
        "h": h,
        "direcao": 1,
        "velocidade": velocidade,
        "sprite": Sprite("prisioneiro.png", 0, 768, 256, 256, 4),
        "tipo": "PRISIONEIRO"
    };
};