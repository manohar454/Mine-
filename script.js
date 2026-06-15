const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const particles = [];

class Heart {

    constructor(x,y){

        this.x=x;
        this.y=y;

        this.size=Math.random()*10+8;

        this.speedX=(Math.random()-0.5)*4;
        this.speedY=(Math.random()-0.5)*4;

        this.alpha=1;

    }

    update(){

        this.x+=this.speedX;

        this.y+=this.speedY;

        this.alpha-=0.02;

    }

    draw(){

        ctx.save();

        ctx.globalAlpha=this.alpha;

        ctx.fillStyle="hotpink";

        ctx.beginPath();

        ctx.moveTo(this.x,this.y);

        ctx.bezierCurveTo(this.x-8,this.y-8,this.x-20,this.y+8,this.x,this.y+20);

        ctx.bezierCurveTo(this.x+20,this.y+8,this.x+8,this.y-8,this.x,this.y);

        ctx.fill();

        ctx.restore();

    }

}

function burst(x,y){

    for(let i=0;i<20;i++){

        particles.push(new Heart(x,y));

    }

}

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(let i=particles.length-1;i>=0;i--){

        particles[i].update();

        particles[i].draw();

        if(particles[i].alpha<=0){

            particles.splice(i,1);

        }

    }

    requestAnimationFrame(animate);

}

animate();

const gift=document.getElementById("openGiftBtn");

const overlay=document.getElementById("giftOverlay");

const stage=document.getElementById("mainStage");

const music=document.getElementById("bgMusic");

gift.onclick=function(){

overlay.style.opacity="0";

setTimeout(()=>{

overlay.style.display="none";

stage.style.display="block";

music.play().catch(()=>{

console.log("Autoplay blocked");

});

burst(window.innerWidth/2,window.innerHeight/2);

},700);

};

window.onclick=function(e){

burst(e.clientX,e.clientY);

};

const noBtn=document.getElementById("noBtn");

noBtn.addEventListener("mouseover",move);

noBtn.addEventListener("touchstart",move);

function move(){

const x=Math.random()*(window.innerWidth-120);

const y=Math.random()*(window.innerHeight-80);

noBtn.style.position="fixed";

noBtn.style.left=x+"px";

noBtn.style.top=y+"px";

burst(x,y);

}

document.getElementById("yesBtn").onclick=function(){

document.getElementById("gameBox").style.display="none";

document.getElementById("success").style.display="block";

setInterval(()=>{

burst(

Math.random()*window.innerWidth,

Math.random()*window.innerHeight

);

},250);

};
