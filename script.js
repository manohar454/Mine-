const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class HeartParticle {
    constructor(x, y, speedMult = 1) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 12 + 8;
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 3 + 2) * speedMult;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.01;
        this.color = `hsl(${Math.random() * 30 + 335}, 100%, 60%)`;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.04;
        this.alpha -= this.decay;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        let topY = this.y - this.size / 2;
        ctx.moveTo(this.x, topY + this.size / 4);
        ctx.bezierCurveTo(this.x, topY, this.x - this.size / 2, topY, this.x - this.size / 2, topY + this.size / 2);
        ctx.bezierCurveTo(this.x - this.size / 2, topY + (this.size * 0.9), this.x, topY + (this.size * 1.2), this.x, this.y + this.size * 0.6);
        ctx.bezierCurveTo(this.x, topY + (this.size * 1.2), this.x + this.size / 2, topY + (this.size * 0.9), this.x + this.size / 2, topY + this.size / 2);
        ctx.bezierCurveTo(this.x + this.size / 2, topY, this.x, topY, this.x, topY + this.size / 4);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}

function createExplosion(x, y, count = 15, mult = 1) {
    for (let i = 0; i < count; i++) {
        particles.push(new HeartParticle(x, y, mult));
    }
}

document.getElementById('openGiftBtn').addEventListener('click', () => {
    document.getElementById('giftOverlay').style.opacity = '0';
    document.getElementById('giftOverlay').style.transform = 'translateY(-100vh)';
    
    setTimeout(() => {
        document.getElementById('giftOverlay').style.display = 'none';
        const stage = document.getElementById('mainStage');
        stage.style.display = 'block';
        setTimeout(() => stage.classList.add('reveal'), 50);
        createExplosion(window.innerWidth / 2, window.innerHeight / 2, 60, 2);
    }, 500);
});

const noBtn = document.getElementById('noBtn');
function moveNoButton(e) {
    if(e) e.preventDefault();
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;
    const newX = Math.max(20, Math.random() * maxX);
    const newY = Math.max(20, Math.random() * maxY);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    createExplosion(newX + 20, newY + 10, 3, 0.5);
}

noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton);

document.getElementById('yesBtn').addEventListener('click', () => {
    document.getElementById('gameBox').style.display = 'none';
    document.getElementById('successMsg').style.display = 'block';
    
    let end = Date.now() + 2500;
    (function frame() {
        createExplosion(Math.random() * window.innerWidth, Math.random() * window.innerHeight * 0.7, 3, 0.8);
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
});

window.addEventListener('click', (e) => {
    if(e.clientY > 80) createExplosion(e.clientX, e.clientY, 8, 0.8);
});

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => {
        p.update();
        p.draw();
        return p.alpha > 0;
    });
    requestAnimationFrame(loop);
}
loop();
