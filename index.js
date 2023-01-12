// Canvas and graphics context
let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 640;
cnv.height = 480;

let keyImg = document.getElementById("keyImg");
class Key {
    constructor(x, y, pos) {
        this.x = x;
        this.y = y;
        this.pos = pos;
        this.angle = 0;
    }
}
// 0 1
// 2 3
// 4 5
// 6 7
let keys = [];
for (let i = 0; i < 8; i++) {
    keys[i] = new Key(235 + i % 2 * 100, 55 + Math.floor(i / 2) * 100, i)
}

window.addEventListener("load", draw)
function draw() {
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    // rotateAll();
    for (let i = 0; i < 8; i++) {
        ctx.drawImage(keyImg, keys[i].x, keys[i].y)
    }
    quadrantSwap();
    setTimeout(draw, 1000/60);
}

function quadrantSwap() {
    for (let i = 0; i < 8; i++) {
        if (keys[i].x > 234 && keys[i].x < 336) {
            if (keys[i].pos % 2 === 0) {
                keys[i].x++;
            } else {
                keys[i].x--;
            }
        }
        if (Math.floor(keys[i].pos / 2) % 2 === 0) {
            keys[i].y++;
        } else {
            keys[i].y--;
        }
    }
}

function rotateAll() {
    for (let i = 0; i < 8; i++) {
        ctx.save();
        keys[i].angle += 1 * Math.PI / 180;
        ctx.translate(320, 240);
        ctx.rotate(keys[i].angle);
        ctx.drawImage(keyImg, keys[i].x - 317, keys[i].y - 237)
        ctx.restore();
    }
}