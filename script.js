const canvas = document.querySelector("#canvas2");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let letterSet = [];
let mouse = {
    x: undefined,
    y: undefined,
};
window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});
canvas.addEventListener("mouseleave", () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

// let charSet = "#+0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let charSet = "SOUGATA";
charSet = charSet.split("");
let fontSize = 15;
let fontColor = "rgb(0,255,0)"; //random or color code like "rgb(0,255,0)";

class Particle {
    constructor(x, y, color, char, speed) {
        this.x = x;
        this.color = color;
        this.y = y;
        this.char = char;
        this.speed = speed;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillText(this.char, this.x, this.y);
        ctx.fill();
    }
    update() {
        this.y += this.speed;
        if (this.y > canvas.height + fontSize) {
            this.y = 0 - fontSize;
        }
    }
}
function init() {
    letterSet = [];
    for (let i = 0; i < 500; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let hue = Math.floor(Math.random() * 360);
        let color;
        if (fontColor == "random") {
            color = `hsla(${hue},100%,50%,1)`;
        } else {
            color = fontColor;
        }
        let char = charSet[Math.floor(Math.random() * charSet.length)];
        let speed = Math.random() * 2 + 2;
        letterSet.push(new Particle(x, y, color, char, speed));
    }
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    connect();
    for (let i = 0; i < letterSet.length; i++) {
        letterSet[i].draw();
        letterSet[i].update();
    }
    requestAnimationFrame(animate);
}
init();
animate();
window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});
function connect() {
    let opacity = 1;
    for (let i = 0; i < letterSet.length; i++) {
        let dx = letterSet[i].x - mouse.x;
        let dy = letterSet[i].y - mouse.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
            ctx.strokeStyle = `rgba(0, 255, 0, ${1 - distance / 150})`;
            ctx.beginPath();
            ctx.lineWidth = 1.5;
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(letterSet[i].x, letterSet[i].y);
            ctx.stroke();
        }
    }
}
