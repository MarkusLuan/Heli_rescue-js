const Helicoptero = (x, y) => {
    const w = 80;
    const h = 26;
    const velocidade = 2;

    return {
        "x": x,
        "y": y,
        "w": w,
        "h": h,
        "velocidade": velocidade,
        "sprite": Sprite("helicopter.png", 10, 0, 96, 32, 7)
    };
};