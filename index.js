// Canvas and graphics context
let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 640;
cnv.height = 480;
const keyImg = document.getElementById("keyImg");
const greenKey = document.getElementById("greenKey");
let sequenceNum = 0;
let keySpeed = 2;
let loop = 0;
let keyHighlight = true;
class Key {
    constructor(x, y, pos) {
        this.x = x;
        this.y = y;
        this.pos = pos;
        this.angle = 0;
        this.correct = false;
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
randKey();
function randKey() {
    let i = Math.floor(Math.random() * 7);
    keys[i].correct = true;
}

window.addEventListener("load", draw)
function draw() {
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    for (let i = 0; i < 8; i++) {
        ctx.drawImage(keyImg, keys[i].x, keys[i].y)
        if (keyHighlight && keys[i].correct) {
            ctx.drawImage(greenKey, keys[i].x, keys[i].y)
        }
    }
    setTimeout(draw, 1);
}

flashKey();
function flashKey() {
    setTimeout(() => {
        keyHighlight = false;
    }, 250)
    setTimeout(() => {
        keyHighlight = true;
    }, 300)
    setTimeout(() => {
        keyHighlight = false;
    }, 500)
    setTimeout(() => {
        keyHighlight = true;
    }, 550)
    setTimeout(() => {
        keyHighlight = false;
    }, 700)
    setTimeout(() => {
        for (let i = 0; i < 26; i++) {
            setTimeout(choose, i * 250);
        }
    }, 1000)
}

function choose() {
    let randNum = Math.floor(Math.random() * 4)
    for (let i = 0; i < 8; i++) {
        keys[i].x = 235 + keys[i].pos % 2 * 100;
        keys[i].y = 55 + Math.floor(keys[i].pos / 2) * 100;
    }
    if (randNum === 0) {
        for (let i = 0; i < 50; i++) {
            setTimeout(diagonalSwap, 4 * i);
        }
    } else if (randNum === 1) {
        for (let i = 0; i < 50; i++) {
            setTimeout(bigRotation, 4 * i);
        }
    } else if (randNum === 2) {
        for (let i = 0; i < 50; i++) {
            setTimeout(smallRotation, 4 * i);
        }
    } else if (randNum === 3) {
        for (let i = 0; i < 50; i++) {
            setTimeout(swap, 4 * i);
        }
    } else if (randNum === 4) {
        for (let i = 0; i < 50; i++) {
            setTimeout(shuffle, 4 * i);
        }
    } else {
        console.log("Bruh")
    }
}

function diagonalSwap() {
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
    if (keys.find(k => k.pos === 0).x >= 335) {
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
        }
    }
}

function bigRotation() {
    for (let i = 0; i < 8; i++) {
        if (keys[i].pos === 0) {
            keys[i].x += keySpeed;
        } else if (keys[i].pos === 7) {
            keys[i].x -= keySpeed;
        } else if (keys[i].pos % 2) {
            keys[i].y += keySpeed;
        } else {
            keys[i].y -= keySpeed;
        }
    }
    if (keys.find(k => k.pos === 0).x >= 335) {
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
        }
    }
}

// 0 1
// 2 3
// 4 5
// 6 7
function smallRotation() {
    for (let i = 0; i < 8; i++) {
        if (keys[i].pos % 4 === 0) {
            keys[i].x += keySpeed;
        } else if (keys[i].pos % 4 === 1) {
            keys[i].y += keySpeed;
        } else if (keys[i].pos % 4 === 2) {
            keys[i].y -= keySpeed;
        } else {
            keys[i].x -= keySpeed;
        }
    }
    if (keys.find(k => k.pos === 0).x >= 335) {
        for (let i = 0; i < 8; i++) {
            if (keys[i].pos % 4 === 0) {
                keys[i].pos++;
            } else if (keys[i].pos % 4 === 1) {
                keys[i].pos += 2;
            } else if (keys[i].pos % 4 === 2) {
                keys[i].pos -= 2;
            } else {
                keys[i].pos--;
            }
        }
    }
}

function swap() {
    for (let i = 0; i < 8; i++) {
        if (keys[i].pos % 2 === 0) {
            keys[i].x += keySpeed;
        } else {
            keys[i].x -= keySpeed;
        }
    }
    if (keys.find(k => k.pos === 0).x >= 335) {
        for (let i = 0; i < 8; i++) {
            if (keys[i].pos % 2 === 0) {
                keys[i].pos++;
            } else {
                keys[i].pos--;
            }
        }
    }
}

function shuffle() {
    for (let i = 0; i < 8; i++) {
        if (keys[i].pos % 2 === 0 && keys[i].pos !== 0) {
            keys[i].x += keySpeed;
            keys[i].y -= keySpeed;
        } else if (keys[i].pos === 1 || keys[i].pos === 3) {
            
        }
    }
    if (keys.find(k => k.pos === 0).x >= 335) {
        for (let i = 0; i < 8; i++) {
            if (keys[i].pos % 2 === 0) {
                keys[i].pos++;
            } else {
                keys[i].pos--;
            }
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