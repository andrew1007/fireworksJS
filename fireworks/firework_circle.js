class FireworkCircle {
  constructor(x = 0, y = 0, ctx, canvas, color){
    this.x = x
    this.y = y
    // this.gravity = 0.1
    this.resistance = 0.98
    this.context = ctx
    this.canvas = canvas
    this.posX = this.canvas.width / 2
    this.posY = this.canvas.height
    let angle = Math.random() * Math.PI * 2
    // let angle = Math.PI * 2;
    // let speed = Math.cos(Math.random() * Math.PI / 2) * (10 * (Math.random() / 2 + 0.5))
    let speed =  11
    this.velX = Math.cos(angle) * speed + 1;
    this.velY = Math.sin(angle) * speed * 0.90;
    this.radius = 10
    this.size = 4.5
    this.shrink = .985 + Math.random()/1000
    // this.shrink = 0
    this.color = color
  }

  velX(){
    return Math.cos(this.angle) * this.speed
  }

  velY(){
    return Math.cos(this.angle) * this.speed
  }

  update(){
    this.velX *= this.resistance
    this.velY *= this.resistance
    // this.velY += this.gravity

    this.x += this.velX
    this.y += this.velY
    this.size *= this.shrink
  }


  exists(){
    if (this.size < 3){
      return false
    } else {
      return true
    }
  }

  render() {
    this.context.fillStyle = this.color + ", 1)";

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
    this.context.closePath();
    this.context.fill();

    this.context.restore();
  }
}

module.exports = FireworkCircle;
