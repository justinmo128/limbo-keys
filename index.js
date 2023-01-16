// Canvas and graphics context
let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 640;
cnv.height = 480;
const keyImg = document.getElementById("keyImg");
let sequenceNum = 0;
let keySpeed = 4;
let loop = 0;
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
    for (let i = 0; i < 8; i++) {
        ctx.drawImage(keyImg, keys[i].x, keys[i].y)
    }
    setTimeout(draw, 1000/240);
}

for (let i = 0; i < 21; i++) {
    setTimeout(choose, i * 250);
}
function choose() {
    let randNum = Math.floor(Math.random() * 2)
    if (randNum === 0 || randNum) {
        const curInt = setInterval(diagonalSwap, 1000/120);
        setTimeout(() => {
            clearInterval(curInt);
            for (let i = 0; i < 8; i++) {
                if (keys[i].pos % 4 === 0) {
                    keys[i].pos += 3;
                } else if (keys[i].pos === 1 || keys[i].pos === 5) {
                    keys[i].pos++;
                } else if (keys[i].pos === 2 || keys[i].pos === 6) {
                    keys[i].pos--;
                } else {
                    keys[i].pos -= 3;
                }
                keys[i].x = 235 + i % 2 * 100;
                keys[i].y = 55 + Math.floor(i / 2) * 100;
            }
        }, 250);
    } else {
        const curInt = setInterval(bigRotation, 1000/120);
        setTimeout(() => {
            clearInterval(curInt);
            for (let i = 0; i < 8; i++) {
                if (keys[i].pos === 0) {
                    keys[i].pos++;
                } else if (keys[i].pos === 7) {
                    keys[i].pos--;
                } else if (keys[i].pos % 2) {
                    keys[i].pos += 2;
                } else {
                    keys[i].pos -= 2;
                }
                keys[i].x = 235 + i % 2 * 100;
                keys[i].y = 55 + Math.floor(i / 2) * 100;
            }
        }, 250);
    }
}

function diagonalSwap() {
    if (keys.find(k => k.pos === 0).x < 336) {
        for (let i = 0; i < 8; i++) {
            if (keys[i].pos % 2 === 0) {
                keys[i].x += keySpeed;
            } else {
                keys[i].x -= keySpeed;
            }
            if (Math.floor(keys[i].pos / 2) % 2 === 0) {
                keys[i].y += keySpeed;
            } else {
                keys[i].y -= keySpeed;
            }
        }
    }
}

function bigRotation() {
    if (keys.find(k => k.pos === 0).x < 336) {
        for (let i = 0; i < 8; i++) {
            if (keys[i].pos % 7 !== 0) {
                if (keys[i].pos % 2) {
                    keys[i].y += keySpeed;
                } else {
                    keys[i].y -= keySpeed;
                } 
            } else if (keys[i].pos === 0) {
                keys[i].x += keySpeed;
            } else {
                keys[i].x -= keySpeed;
            }
        }
    }
}

function smallRotation() {

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