// Canvas and graphics context
let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 640;
cnv.height = 480;

let keyImg = document.getElementById("keyImg");
let keys = [
    {pos: 0},
    {pos: 1},
    {pos: 2},
    {pos: 3},
    {pos: 4},
    {pos: 5},
    {pos: 6},
    {pos: 7}
];

window.addEventListener("load", draw)
function draw() {
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    for (let y = 0; y < 4; y++) {
        ctx.drawImage(keyImg, 235, 55 + y * 100);
        ctx.drawImage(keyImg, 335, 55 + y * 100);
    }
    setTimeout(draw, 1000/60);
}

function quadrantSwap() {
    
}