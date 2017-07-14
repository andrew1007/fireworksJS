class ParticleBaseClass {
  constructor(x, y, ctx, canvas, color) {
    this.x = x
    this.y = y
    this.resistance = 0.98
    this.context = ctx
    this.canvas = canvas
    this.posX = this.canvas.width / 2
    this.posY = this.canvas.height
    this.shrink = .980 + Math.random()/1000
    this.color = color
    this.gravity = 0.1
    this.size = 4
    this.angle = (Math.random() / -1) * Math.PI * 2
  }

  velX(){
    return Math.cos(this.angle) * this.speed
  }

  velY(){
    return Math.cos(this.angle) * this.speed + this.gravity
  }

  update(){
    this.velX *= this.resistance
    this.velY *= this.resistance
    this.velY += this.gravity

    this.x += this.velX
    this.y += this.velY
    this.size *= this.shrink
  }
}

module.exports = ParticleBaseClass
