// Canvas and graphics context
let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 640;
cnv.height = 480;
const keyImg = document.getElementById("keyImg");
const greenKey = document.getElementById("greenKey");
const keySpeed = 2;
let keyHighlight;
let pickTime;
let timer;
let pickStatus;
let restartable;
let mouse = {
    x: 0,
    y: 0
}
let keys = [];
class Key {
    constructor(x, y, pos) {
        this.x = x;
        this.y = y;
        this.pos = pos;
        this.correct = false;
    }
}

window.addEventListener("load", draw)
function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    for (let i = 0; i < 8; i++) {
        ctx.drawImage(keyImg, keys[i].x, keys[i].y, 64, 64)
        if (keyHighlight && keys[i].correct) {
            ctx.drawImage(greenKey, keys[i].x, keys[i].y, 64, 64)
        }
    }
    ctx.font = "30px Roboto";
    ctx.textAlign = "center";
    if (pickTime) {
        ctx.fillStyle = "white";
        ctx.fillText(timer, 320, 240);
    }
    if (timer === 0) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, cnv.width, cnv.height);
        ctx.fillStyle = "white";
        ctx.fillText("PICK A KEY COWARD", 320, 450);
    }
    if (pickStatus === 1) {
        ctx.fillStyle = "rgb(200, 0, 0)";
        ctx.fillRect(0, 0, cnv.width, cnv.height);
    } else if (pickStatus === 2) {
        ctx.fillStyle = "rgb(0, 200, 0)";
        ctx.fillRect(0, 0, cnv.width, cnv.height);
    }
    if (restartable) {
        ctx.fillStyle = "gray";
        ctx.fillRect(240, 208, 160, 64);
        ctx.fillStyle = "white";
        ctx.fillText("RESTART", 320, 250)
    }
    setTimeout(draw, 1);
}

reset();
function reset() {
    keyHighlight = true;
    pickTime = false;
    timer = 5;
    pickStatus = 0;
    restartable = false;
    initKeys();
    start();
}

function initKeys() {
    for (let i = 0; i < 8; i++) {
        keys[i] = new Key(235 + i % 2 * 100, 55 + Math.floor(i / 2) * 100, i)
    }
    let i = Math.floor(Math.random() * 7);
    keys[i].correct = true;
}

function start() {
    setTimeout(() => {
        keyHighlight = false;
    }, 250);
    setTimeout(() => {
        keyHighlight = true;
    }, 300);
    setTimeout(() => {
        keyHighlight = false;
    }, 500);
    setTimeout(() => {
        keyHighlight = true;
    }, 550);
    setTimeout(() => {
        keyHighlight = false;
    }, 700);
    setTimeout(() => {
        for (let i = 0; i < 26; i++) {
            setTimeout(choose, i * (300));
        }
    }, 1000);
    setTimeout(() => {
        pickTime = true;
    }, 8800);
    setTimeout(() => {
        timer--;
    }, 9800);
    setTimeout(() => {
        timer--;
    }, 10800);
    setTimeout(() => {
        timer--;
    }, 11800);
    setTimeout(() => {
        timer--;
    }, 12800);
    setTimeout(() => {
        restartable = true;
    }, 13800);
}

function choose() {
    let randNum = Math.floor(Math.random() * 6);
    for (let i = 0; i < 8; i++) {
        keys[i].x = 235 + keys[i].pos % 2 * 100;
        keys[i].y = 55 + Math.floor(keys[i].pos / 2) * 100;
    }
    if (randNum === 0) {
        for (let i = 0; i < 50; i++) {
            setTimeout(diagonalSwap, 6 * i);
        }
    } else if (randNum === 1) {
        for (let i = 0; i < 50; i++) {
            setTimeout(bigRotation, 6 * i);
        }
    } else if (randNum === 2) {
        for (let i = 0; i < 50; i++) {
            setTimeout(smallRotation, 6 * i);
        }
    } else if (randNum === 3) {
        for (let i = 0; i < 50; i++) {
            setTimeout(swap, 6 * i);
        }
    } else if (randNum === 4) {
        for (let i = 0; i < 50; i++) {
            setTimeout(shuffle, 6 * i);
        }
    } else {
        for (let i = 0; i < 50; i++) {
            setTimeout(topSwap, 6 * i);
        }
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
            keys[i].x -= keySpeed;
            keys[i].y += keySpeed;
        } else if (keys[i].pos === 5) {
            keys[i].y += keySpeed;
        } else if (keys[i].pos === 7) {
            keys[i].x -= keySpeed;
        }
    }
    if (keys.find(k => k.pos === 2).x >= 335) {
        for (let i = 0; i < 8; i++) {
            if (keys[i].pos % 2 === 0 && keys[i].pos !== 0 || keys[i].pos == 7) {
                keys[i].pos--;
            } else if (keys[i].pos === 1 || keys[i].pos === 3) {
                keys[i].pos++
            } else if (keys[i].pos === 5) {
                keys[i].pos += 2;
            }
        }
    }
}

function topSwap() {
    for (let i = 0; i < 8; i++) {
        if (keys[i].pos === 6 || keys[i].pos === 7) {
            keys[i].y -= keySpeed * 3;
        } else {
            keys[i].y += keySpeed;
        }
    }
    if (keys.find(k => k.pos === 0).y >= 155) {
        for (let i = 0; i < 8; i++) {
            if (keys[i].pos === 6 || keys[i].pos === 7) {
                keys[i].pos -= 6;
            } else {
                keys[i].pos += 2
            }
        }
    }
}

document.addEventListener("mousemove", mousemoveHandler);
function mousemoveHandler(event) {
    // Get rectangle info about canvas location
    let cnvRect = cnv.getBoundingClientRect(); 

    // Calc mouse coordinates using mouse event and canvas location info
    mouse.x = Math.round(event.clientX - cnvRect.left);
    mouse.y = Math.round(event.clientY - cnvRect.top);
}

document.addEventListener("click", pickKey)
function pickKey() {
    if (pickTime && timer) {
        if (mouse.x >= keys.find(k => k.correct).x &&
            mouse.x <= keys.find(k => k.correct).x + 64 &&
            mouse.y >= keys.find(k => k.correct).y &&
            mouse.y <= keys.find(k => k.correct).y + 64) {
                pickTime = false;
                pickStatus = 2;
        } else {
            for (let i = 0; i < 8; i++) {
                if (mouse.x >= keys[i].x &&
                    mouse.x <= keys[i].x + 64 &&
                    mouse.y >= keys[i].y &&
                    mouse.y <= keys[i].y + 64) {
                        pickTime = false;
                        pickStatus = 1;
                }
            }
        }
    }
    if (restartable &&
        mouse.x >= 240 &&
        mouse.x <= 400 &&
        mouse.y >= 208 &&
        mouse.y <= 272) {
        reset();
    }
}