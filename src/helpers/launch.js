const Rocket = require("../rockets/rocket");
const RocketStreak = require("../rockets/rocket_streak");
const RocketChain = require("../rockets/rocket_chain");
const RocketStreamer = require("../rockets/rocket_streamer");

const ParticleDefault = require("../particles/particle_default");
const ParticleCircle = require("../particles/particle_circle");
const ParticleChain = require("../particles/particle_chain");

class Launch {
  constructor(x, y, ctx, canvas) {
    this.rockets = []
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

  rockArgs(x, y) {
    return [x, y, this.context, this.canvas, this.color]
  }

  rocketStreamer(xPos, yPos) {
    let rocket = new RocketStreamer(...this.rockArgs(xPos, yPos))
    this.rockets = this.rockets.concat(rocket)
  }

  rocketStreak(xPos, yPos) {
    let rocket = new RocketStreak(...this.rockArgs(xPos, yPos))
    this.rockets = this.rockets.concat(rocket)
  }

  rocketChain(xPos, yPos) {
    let rocket = new RocketChain(...this.rockArgs(xPos, yPos))
    this.rockets = this.rockets.concat(rocket)
  }

  rocketDefault(xPos, yPos) {
    let rocket = new Rocket(...this.rockArgs(xPos, yPos))
    this.rockets = this.rockets.concat(rocket)
  }

  addFirework(e) {
    let streamerChance = (rng) => rng > this.chanceRocketStreamer
    let streakChance = (rng) => rng > this.chanceRocketStreak
    let chainChance = (rng) => rng > this.chanceRocketChain
    let xPos = this.x;
    let yPos = this.y;
    let rng = Math.random()
    switch (true) {
      case streamerChance(rng):
        this.rocketStreamer(xPos, yPos)
        break
      case streakChance(rng):
        this.rocketStreak(xPos, yPos)
        break
      case chainChance(rng):
        this.rocketChain(xPos, yPos)
        break
      default:
        this.rocketDefault(xPos, yPos)
    }
  }

  welcomeFireworks(counter) {
    switch (counter) {
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

  getRandomColor() {
    let randColor = () => 80 + Math.round(Math.random() * 150)
    let a = 1
    let color = 'rgba('
    Array.from(Array(3)).forEach(_ => color += `${randColor()}, `)
    color += `${a})`
    return color
  }

  partArgs(firework) {
    return [firework.x, firework.y, this.context, this.canvas, 5, this.color]
  }

  pushParticle(object) {
    this.particles.push(object)
  }

  particleCircle(firework, newColor = false) {
    let rng = Math.random()
    for (let i = 0; i < this.particleCircleCount; i++) {
      if (newColor) this.color = this.getRandomColor()
      this.particleCount += 45
      this.pushParticle(new ParticleCircle(...this.partArgs(firework)))
    }
  }

  particleChain(firework) {
    let rng = Math.random()
    for (let i = 0; i < this.particleChainCount; i++) {
      if (rng > 0.60) this.color = this.getRandomColor()
      this.pushParticle(new ParticleChain(...this.partArgs(firework)))
    }
  }

  particleDefault(firework, particleCount, newColor = false) {
    for (let i = 0; i < particleCount; i++) {
      if (newColor) this.color = this.getRandomColor()
      this.pushParticle(new ParticleDefault(...this.partArgs(firework)))
    }
  }

  triggerParticles() {
    this.rockets.forEach((firework, i) => {
      if (firework.constructor.name === "RocketStreamer") {
        if (firework.trigger()) this.particleDefault(firework, 20, true)
      }
      let rng = Math.random()
      console.log(firework.exploded())
      if (firework.exploded()) {
        console.log('EXPLODED')
        switch (firework.constructor.name) {
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

  clearParticles() {
    this.particles.forEach((particle, i) => {
      if (!particle.exists()) {
        let rng = Math.random()
        if (particle.constructor.name === "ParticleChain") {
          if (rng > 0.80) this.color = this.getRandomColor()
          this.particleDefault(particle, 20)
        }
        this.particles.splice(i, 1)
        this.particleCount -= 1
      }
      particle.render()
      particle.update()
    })
  }

  update() {
    if (this.particles.length > 1 || this.rockets.length > 0) {
      requestAnimationFrame(() => this.update())
    }
    this.triggerParticles()
    this.clearParticles()
  }
}
module.exports = Launch;
