class RocketChain {
  constructor(x, y, context, canvas, color){
    this.x = x
    this.y = y
    this.shrink = .999;
    this.size = 6;

    this.resistance = 0.983;
    this.gravity = 0.07

    this.alpha = 1;
    this.fade = 0;
    this.color = `${color}, 1)`;

    this.context = context
    this.canvas = canvas
    this.velX = Math.random() * 6 - 3;
    this.velY = -20.5 + Math.random() * 6;
  }

  update(){

    this.velX *= this.resistance;
    this.velY *= this.resistance;

    this.velY += this.gravity;
    this.x += this.velX;
    this.y += this.velY;
  }

  exploded(){
    if (this.velY >= -Math.random()*3){
      return true
    } else{
      return false
    }
  }

  render(){
    // console.log(this.color);
    this.context.fillStyle = this.color;

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.size, 0, Math.PI * 3, true);
    this.context.closePath();
    this.context.fill();

    this.context.restore();
  }
}

module.exports = RocketChain;
