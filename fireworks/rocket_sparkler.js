class RocketSparkler {
  constructor(x, y, context, canvas, color){
    this.x = x
    this.y = y
    this.shrink = .999;
    this.size = 6;

    this.resistance = 0.983;
    this.gravity = 0.1

    this.alpha = 1;
    this.fade = 0;
    this.color = `${color}, 1)`;

    this.context = context
    this.canvas = canvas
    this.velX = Math.random() * 10 - 3;
    this.velY = -10 + Math.random() * 6;
  }

  update(){

    this.velX *= this.resistance;
    this.velY *= this.resistance;

    this.velY += this.gravity;
    this.x += this.velX;
    this.y += this.velY;
  }

  exploded(){
    if (this.velY >= -Math.random()*0){
      return true
    } else{
      return false
    }
  }

  randomX(){
    if (Math.random() > 0.5)
      return Math.random() * 3
    else {
      return  Math.random() * -3
    }
  }

  render(){
    // console.log(this.color);
    this.context.fillStyle = this.color + ", 1)";

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
    for (let i=0; i < 15; i++){
      let streakY = i * 5
      this.context.fillStyle = this.color + `,${1 - i * 0.02}`
      this.context.arc(this.x + i * -this.velX * 1 + this.randomX() * i * 0.2, this.y + streakY + this.velY, this.size, 0, Math.PI * 2, true);
    }
    this.context.closePath();
    this.context.fill();

    this.context.restore();
  }
}

module.exports = RocketSparkler;
