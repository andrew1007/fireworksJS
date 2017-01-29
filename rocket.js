class Rocket {
  constructor(x, y, context, canvas, color){
    this.x = x
    this.y = y
    this.shrink = .999;
    this.size = 3;

    this.resistance = 0.99;
    this.gravity = 0.07

    this.alpha = 1;
    this.fade = 0;
    this.color = color;

    this.context = context
    this.canvas = canvas
    this.velX = Math.random() * 6 - 3;
    this.velY = Math.random() * -4 * (y / 320) - 6.5;
  }

  update(){

    this.velX *= this.resistance;
    this.velY *= this.resistance;

    this.velY += this.gravity;
    this.x += this.velX;
    this.y += this.velY;
  }

  exploded(){
    if (this.velY >= 0){
      return true
    } else{
      return false
    }
  }

  render(){
    // console.log(this.color);
    this.context.fillStyle = this.color;

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
    this.context.closePath();
    this.context.fill();

    this.context.restore();
  }
}

module.exports = Rocket;
