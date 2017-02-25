const Rocket = require("./rocket");
const RocketStreak = require("./rocket_streak")
const Particle = require("./particle");
const FireworkCircle = require("./firework_circle");


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
      let any_rocket_streaks = this.rockets.slice(0,3).filter( (rocket) => {
        return rocket.constructor.name === "RocketStreak"
      })
      var rocket
      if (Math.random() > 0.85 && any_rocket_streaks.length < 1){
        rocket = new RocketStreak
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
    if (Math.random() > 0.85){
      rocket = new RocketStreak
      (
        this.x,
        this.y,
        this.context,
        this.canvas,
        this.color
      )
    }
    else {
      rocket = new Rocket
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
      console.log(firework.constructor.name === "RocketStreak");
    let color = this.getRandomColor()
      if (firework.exploded()){
        switch(firework.constructor.name){
          case "RocketStreak":
          for(let i=0; i < 45; i++){
            console.log("yes");
            this.particles = this.particles.concat(new FireworkCircle(firework.x, firework.y, this.context, this.canvas, this.color))
          }
          case "Rocket":
          for(let i=0; i < 30; i++){
            this.particles = this.particles.concat(new Particle(firework.x, firework.y, this.context, this.canvas, 5, this.color))
          }
        }
        this.rockets.splice(i, 1)
      }
        firework.render()
        firework.update()
      })
      this.particles = this.particles.filter( (particle) => {
        return particle.exists()
      })
      this.particles.forEach((particle, i) => {
        if (!particle.exists()) {
          this.particles.splice(i, 1)
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

for (let i =0; i < 6; i++){
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
  for (let i = 0; i < 4; i++){
    var x = new Launch(xPos, canvas.height, ctx, canvas)
      x.addFirework(e)
      x.update()
  }
}
)
