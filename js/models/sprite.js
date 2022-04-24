const Sprite = (img, x, y, w, h, quant) => {
    var atual = 1;

    const imgEl = document.createElement("img");
    imgEl.src = "assets/sprites/" + img;
    imgEl.style.transform = "scaleX(-1)";

    var sprite = {
        "x": x,
        "y": y,
        "w": w,
        "h": h,
        "img": imgEl
    };

    const changeSprite = () => {
        sprite.x = x + (w * atual) - w;
    };

    sprite.setAtual = (a) => {
        if (a > 0 && a <= quant) {
            atual = a;
        }

        changeSprite();
    };

    sprite.next = () => {
        if (atual >= quant || quant == 1) atual = 1;
        else atual += 1;

        sprite.setAtual(atual);
    };

    sprite.refresh = () => {
        atual = 1;
        sprite.setAtual(atual);
    };

    return sprite;
};