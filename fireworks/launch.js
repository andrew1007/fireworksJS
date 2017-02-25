const Rocket = require("./rocket");
const RocketStreak = require("./rocket_streak")
const Particle = require("./particle");
const ParticleCircle = require("./particle_circle");
const ParticleChain = require("./particle_chain")
const RocketChain = require("./rocket_chain")

class Launch {
  constructor(x, y, ctx, canvas){
    this.rockets=[]
    this.particles = []
    this.context = ctx
    this.canvas = canvas
    this.x = x
    this.y = y
    this.color = this.getRandomColor(1)
  }

  addFirework(e){
      let xPos = this.x;
      let yPos= this.y;
      var rocket
      let rng = Math.random()
      if (rng > 0.85 ){
        rocket = new RocketStreak
        (
          xPos,
          yPos,
          this.context,
          this.canvas,
          this.color
        )
      } else if (rng > 0.60){
        rocket = new RocketChain
        (
          xPos,
          yPos,
          this.context,
          this.canvas,
          this.color
        )
      }
      else {
        rocket = new Rocket
        (
          xPos,
          yPos,
          this.context,
          this.canvas,
          this.color
        )
      }
      this.rockets = this.rockets.concat(rocket)
  }

  welcomeFireworks(){
    var rocket
    let rng = Math.random()
    if (rng > 0.80 ){
      rocket = new RocketStreak
      (
        this.x,
        this.y,
        this.context,
        this.canvas,
        this.color
      )
    } else {
      rocket = new RocketChain
      (
        this.x,
        this.y,
        this.context,
        this.canvas,
        this.color
      )
    }
    this.rockets.push(rocket)
    this.update()
  }

  getRandomColor(){
    let r = 0 + Math.round(Math.random() * 225);
    let g = 0 + Math.round(Math.random() * 225);
    let b = 0 + Math.round(Math.random() * 225);
    return `rgba(${r}, ${g}, ${b}`
  }

  // clearBoard(){
  //   this.context.fillStyle = "rgba(0, 0, 0, .10)";
  //   this.context.fillRect(0,0, canvas.width, canvas.height)
  // }

  exists(){
    return this.rockets.length > 0
  }

  update(){
    if (this.particles.length >  1 || this.rockets.length > 0){
      requestAnimationFrame(() => this.update())
    }
    this.rockets.forEach((firework, i) =>{
    let color = this.getRandomColor()
      if (firework.exploded()){
        switch(firework.constructor.name){
          case "RocketStreak":
          for(let i=0; i < 45; i++){
            this.particles = this.particles.concat(new ParticleCircle(firework.x, firework.y, this.context, this.canvas, this.color))
          }
          break
          case "RocketChain":
          for(let i=0; i < 5; i++){
            this.particles = this.particles.concat(new ParticleChain(firework.x, firework.y, this.context, this.canvas, 5, this.color))
          }
          break
          case "Rocket":
          for(let i=0; i < 30; i++){
            this.particles = this.particles.concat(new Particle(firework.x, firework.y, this.context, this.canvas, 5, this.color))
          }
          break
        }
        this.rockets.splice(i, 1)
      }
        firework.render()
        firework.update()
      })
      this.particles.forEach((particle, i) => {
        if (!particle.exists()) {
          if (particle.constructor.name === "ParticleChain"){
            for(let i=0; i < 20; i++){
              this.particles = this.particles.concat(new Particle(particle.x, particle.y, this.context, this.canvas, 5, this.color))
          }
          this.particles.splice(i, 1)
        } else {
            this.particles.splice(i, 1)
          }
        }
        particle.render()
        particle.update()
      })
    }

}

document.body.style.overflow = "hidden"
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext( '2d' )
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  let canvas = document.getElementById('canvas')
  let ctx = canvas.getContext( '2d' )
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
})

var fireworksArr = []
clearScreen = () =>{
  ctx.fillStyle = "rgba(6, 3, 10, .15)";
  ctx.fillRect(0,0, canvas.width, canvas.height)
  requestAnimationFrame(() => clearScreen())
}

clearScreen()

const oneThird = Math.floor(ctx.canvas.width / 3)
const twoThird = Math.floor(ctx.canvas.width / 2 )
const oneWhole = Math.floor(ctx.canvas.width * 2 / 3)

for (let i =0; i < 3; i++){
  new Launch(oneThird, canvas.height, ctx, canvas).welcomeFireworks()
  new Launch(twoThird, canvas.height, ctx, canvas).welcomeFireworks()
  new Launch(oneWhole, canvas.height, ctx, canvas).welcomeFireworks()
}

window.setTimeout(() =>{
  document.getElementById("fireworks-message").style.zIndex="-1"
}, 3000)


document.addEventListener("click",
(e) => {
  let xPos = e.clientX;
  let yPos= e.clientY;
  fireworksArr = fireworksArr.filter( firework => {
    return firework.exists()
  })
  for (let i = 0; i < 2; i++){
    var x = new Launch(xPos, canvas.height, ctx, canvas)
      x.addFirework(e)
      x.update()
  }
}
)
