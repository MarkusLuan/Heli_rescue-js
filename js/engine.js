function init(){
    canvas_obj = canvas.getContext("2d");
    w = canvas_el.width;
    h = canvas_el.height;
}

function limparCanvas() {
    canvas_obj.fillStyle = "#FFF";

    canvas_obj.fillRect(0, 0, w, h);

    canvas_obj.fillStyle = "#000";
}

function onUpdate() {
    limparCanvas();
}