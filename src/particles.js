const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray;

//mouse position, scale area to canvas size
let mouse= {
  x:null,
  y:null,
  radius: ((canvas.height/100) * (canvas.width/100))
};

window.addEventListener('mousemove', 
	function(event){
		mouse.x = event.x;
		mouse.y = event.y;
});


//create particle
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
  
  //method for drawing particle -- directionXY
  draw(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI * 2, false);
    ctx.fillStyle = 'white';
    ctx.fill();
  }
  //check mouse and particle position, then move and draw the particle
  update(){
    //check if particle is on canvas
    if (this.x > canvas.width || this.x < 0){
			   this.directionX = -this.directionX; 
	  } 
    if (this.y > canvas.height || this.y < 0){
		    this.directionY = -this.directionY;
	  }
      
   // check mouse position particle position - collision detection
   let dx = mouse.x - this.x;
   let dy = mouse.y - this.y;
   let distance = Math.sqrt(dx*dx + dy*dy);
   if (distance < mouse.radius + this.size){
        if (mouse.x < this.x && this.x < canvas.width - this.size*10){
         this.x+=2;
        }
        if (mouse.x > this.x && this.x > this.size*10){
         this.x-=2;
        }
        if (mouse.y < this.y && this.y < canvas.height - this.size*10){
         this.y+=2;
        }
        if (mouse.y > this.y && this.y > this.size*10){
         this.y-=2;
        }
    }
     // move particle
    this.x += this.directionX;
    this.y += this.directionY;
    // call draw method
    this.draw();
  }
}

//create particle arrray
function init(){
  particlesArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 8000;
  for (let i = 0; i < numberOfParticles; i++){
    let size = (Math.random() * 5) + 1;
    let x = (Math.random() * ((innerWidth - size * 2) - (size - 2)) + size * 2);
    let y = (Math.random() * ((innerHeight - size * 2) - (size - 2)) + size * 2);
    //speed will be random number
    let directionX = (Math.random()* 1.2  - 1);
    let directionY = (Math.random()* 1.2 - 1);
    let color = '#FEC763';
    
    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

//draw line if particles are close enough together
function connect(){
  let opacity = 1;
  for (let a = 0; a < particlesArray.length; a++){
    for (let b = a; b < particlesArray.length; b++){
      let distance = ((particlesArray[a].x - particlesArray[b].x) ** 2) + ((particlesArray[a].y - particlesArray[b].y) ** 2 );
      if (distance < (canvas.height/6 ** 2)){
        opacity = 1 - (distance/2000);
        ctx.strokeStyle = 'rgb(200, 200, 200,' + opacity + ')';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

//animate loop
function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,innerWidth,innerHeight);
	
  for (let particle of particlesArray){
    particle.update();
  }
  connect();
}

// RESIZE SETTING - empty and refill particle array every time window changes size + change canvas size
window.addEventListener('resize',
	function(){
		canvas.width = innerWidth;
		canvas.height = innerHeight;
        mouse.radius = ((canvas.height/80) * (canvas.width/80));
		init();
	}
)
// 2) SET MOUSE POSITION AS UNDEFINED when it leaves canvas//////
window.addEventListener('mouseout',
	function(){
		mouse.x = undefined;
	    mouse.y = undefined;
        console.log('mouseout');
	}
)