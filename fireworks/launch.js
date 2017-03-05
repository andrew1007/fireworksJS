const Rocket = require("./rocket");
const RocketStreak = require("./rocket_streak")
const Particle = require("./particle");
const ParticleCircle = require("./particle_circle");
const ParticleChain = require("./particle_chain")
const RocketChain = require("./rocket_chain")
const RocketStreamer = require("./rocket_streamer")

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
    this.chanceRocketStreak = 0.7
    this.chanceRocketChain = 0.50
    this.chanceRocketDefault = 0
    this.chanceRocketStreamer = 0.85
    this.particleCircleCount = 45
    this.particleChainCount = 3
    this.particleDefaultCount = 30
  }

  sparkler(xPos, yPos){
  }

  rocketStreamer(xPos, yPos){
    let rocket = new RocketStreamer
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

  triggerRocketStreamer(rng){
    return rng > this.chanceRocketStreamer
  }

  addFirework(e){
    let xPos = this.x;
    let yPos= this.y;
    let rng = Math.random()
    switch(true){
      case this.triggerRocketStreamer(rng):
        this.rocketStreamer(xPos, yPos)
        break
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

  welcomeFireworks(counter){
    let rng = Math.random()
    switch(counter){
      case 0:
      this.rocketDefault(this.x, this.y)
        break
      case 1:
        this.rocketChain(this.x, this.y)
        break
      case 2:
        this.rocketStreak(this.x, this.y)
        break
      case 3:
        this.rocketStreamer(this.x, this.y)
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

  particleCircle(firework, newColor = false){
    let rng = Math.random()
    // let counter = 0
    // let lessThanCouner = (num) => {
    //   return counter < num
    // }
    // setInterval( () => {
    //   switch(true){
    //     case (lessThanCouner(10)):
    for (let i=0; i < this.particleCircleCount; i++){
      if (newColor){
        this.color = this.getRandomColor()
      }
      this.particleCount += 45
      this.particles = this.particles.concat(new ParticleCircle(firework.x, firework.y, this.context, this.canvas, this.color))
    }
    //     break
    //     default:
    //       clearInterval()
    //       return
    //   }
    //   counter += 1
    // }, 100)
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

  particleDefault(firework, particleCount, newColor = false){
    for(let i=0; i < particleCount; i++){
      if (newColor) {
        this.color = this.getRandomColor()
      }
      this.particles = this.particles.concat(new Particle(firework.x, firework.y, this.context, this.canvas, 5, this.color))
    }
  }

  triggerParticles(){
    this.rockets.forEach((firework, i) =>{
      if (firework.constructor.name === "RocketStreamer"){
        if (firework.trigger()){
          this.particleDefault(firework, 20, true)
        }
      }
    let rng = Math.random()
      if (firework.exploded()){
        switch(firework.constructor.name){
          case "RocketStreak":
            this.particleCircle(firework)
          break
          case "RocketChain":
            this.particleChain(firework)
          break
          case "RocketStreamer":
            this.particleCircle(firework, true)
          break
          case "Rocket":
            this.particleDefault(firework, 30)
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
        this.particleDefault(particle, 20)
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
// document.addEventListener("mousemove", (e) => {
//   console.log("asdfasdf");
// })
//
// document.addEventListener("onclick", (e) => {
//   console.log("asdfasdf");
//   // if (e.which === 1 && e.clientX % 20 <= 1){
//     triggerRockets(e, 3)
//   // }
// })
module.exports = Launch;
