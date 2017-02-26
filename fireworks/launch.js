const Rocket = require("./rocket");
const RocketStreak = require("./rocket_streak")
const Particle = require("./particle");
const ParticleCircle = require("./particle_circle");
const ParticleChain = require("./particle_chain")
const RocketChain = require("./rocket_chain")
const RocketSparkler = require("./rocket_sparkler")

class Launch {
  constructor(x, y, ctx, canvas){
    this.rockets=[]
    this.particles = []
    this.context = ctx
    this.canvas = canvas
    this.x = x
    this.y = y
    this.color = this.getRandomColor(1)
    this.particleCount = 0
    this.chanceRocketStreak = 0.85
    this.chanceRocketChain = 0.60
    this.chanceRocketDefault = 0
    this.particleCircleCount = 45
    this.particleChainCount = 3
    this.particleDefaultCount = 30
  }

  sparkler(xPos, yPos){
    let rocket = new RocketSparkler
    (
      xPos,
      yPos,
      this.context,
      this.canvas,
      this.color
    )
    this.rockets = this.rockets.concat(rocket)
  }

  rocketStreak(xPos, yPos){
    let rocket = new RocketStreak
    (
      xPos,
      yPos,
      this.context,
      this.canvas,
      this.color
    )
    this.rockets = this.rockets.concat(rocket)
  }

  rocketChain(xPos, yPos){
    let rocket = new RocketChain
    (
      xPos,
      yPos,
      this.context,
      this.canvas,
      this.color
    )
    this.rockets = this.rockets.concat(rocket)
  }

  rocketDefault(xPos, yPos){
    let rocket = new Rocket
    (
      xPos,
      yPos,
      this.context,
      this.canvas,
      this.color
    )
    this.rockets = this.rockets.concat(rocket)
  }

  triggerRocketStreak(rng){
    return rng > this.chanceRocketStreak
  }

  triggerRocketChain(rng){
    return rng > this.chanceRocketChain
  }

  addFirework(e){
    let xPos = this.x;
    let yPos= this.y;
    var rocket
    let rng = Math.random()
    switch(true){
      case this.triggerRocketStreak(rng):
        this.rocketStreak(xPos, yPos)
        break
      case this.triggerRocketChain(rng):
        this.rocketChain(xPos, yPos)
        break
      default:
        this.rocketDefault(xPos, yPos)
    }
  }

  welcomeFireworks(){
    let rng = Math.random()
    switch(true){
      case this.triggerRocketStreak(rng):
        this.rocketStreak(this.x, this.y)
        break
      case this.triggerRocketChain(rng):
        this.rocketChain(this.x, this.y)
        break
      default:
        this.rocketDefault(this.x, this.y)
    }
    this.update()
  }

  getRandomColor(){
    let r = 0 + Math.round(Math.random() * 225);
    let g = 0 + Math.round(Math.random() * 225);
    let b = 0 + Math.round(Math.random() * 225);
    return `rgba(${r}, ${g}, ${b}`
  }

  getPrettyColor(){

  }

  exists(){
    return this.rockets.length > 0
  }

  particleCircle(firework){
    let rng = Math.random()
    for (let i=0; i < this.particleCircleCount; i++){
      if (rng > 0.50){
        this.color = this.getRandomColor()
      }
      this.particleCount += 45
      this.particles = this.particles.concat(new ParticleCircle(firework.x, firework.y, this.context, this.canvas, this.color))
    }
  }

  particleChain(firework){
    let rng = Math.random()
    for(let i=0; i < this.particleChainCount; i++){
      if (rng > 0.60){
        this.color = this.getRandomColor()
      }
      this.particles = this.particles.concat(new ParticleChain(firework.x, firework.y, this.context, this.canvas, 5, this.color))
    }
  }

  particleDefault(firework){
    for(let i=0; i < this.particleDefaultCount; i++){
      this.particles = this.particles.concat(new Particle(firework.x, firework.y, this.context, this.canvas, 5, this.color))
    }
  }

  triggerParticles(){
    this.rockets.forEach((firework, i) =>{
    let color = this.getRandomColor()
    let rng = Math.random()
      if (firework.exploded()){
        switch(firework.constructor.name){
          case "RocketStreak":
            this.particleCircle(firework)
          break
          case "RocketChain":
            this.particleChain(firework)
          break
          case "Rocket":
            this.particleDefault(firework)
          break
        }
        this.rockets.splice(i, 1)
      }
        firework.render()
        firework.update()
      })
  }

  clearParticles(){
    this.particles.forEach((particle, i) => {
      if (!particle.exists()) {
        let rng = Math.random()
        if (particle.constructor.name === "ParticleChain"){
          if (rng > 0.80){
            this.color = this.getRandomColor()
          }
        this.particleDefault(particle)
      }
      this.particles.splice(i, 1)
      this.particleCount -= 1
      }
      particle.render()
      particle.update()
    })
  }

  update(){
    if (this.particles.length >  1 || this.rockets.length > 0){
      requestAnimationFrame(() => this.update())
    }
    this.triggerParticles()
    this.clearParticles()
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
}, 2000)

var fireworksArr = []

document.addEventListener("click",
(e) => {
  let xPos = e.clientX;
  let yPos= e.clientY;
  fireworksArr = fireworksArr.filter( firework => {
    return firework.exists()
  })
  for (let i = 0; i < 5; i++){
    var x = new Launch(xPos, canvas.height, ctx, canvas)
      x.addFirework(e)
      x.update()
  }
}
)
