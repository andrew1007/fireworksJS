let RocketBaseClass = require('./rocket_base_class')

class RocketStreak extends RocketBaseClass {
  constructor(x, y, context, canvas, color){
    super(x, y, context, canvas, color)
    this.shrink = .999;
    this.size = 2.5;
    this.velX = Math.random() * 1 - 1;
  }

  randomX(){
    if (Math.random() > 0.5)
      return Math.random() * 3
    else {
      return  Math.random() * -3
    }
  }

  randomY(){
    return Math.random()*5 + 30
  }

  streak() {
    return this.y + streakY + this.velY, this.size, 0, Math.PI * 2
  }

  posX(i) {
    return this.x + i * -this.velX * 1 + this.randomX() * i * 0.2
  }

  posY(i) {
    return this.y + i * 5 + this.velY
  }

  render(){
    // console.log(this.color);
    this.context.fillStyle = this.color;

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
    for (let i=0; i < 20; i++){
      this.context.fillStyle = this.color + `,${1 - i * 0.02}`
      this.context.arc(this.posX(i), this.posY(i), this.size, 0, Math.PI * 2, true);
    }
    this.context.closePath();
    this.context.fill();

    this.context.restore();
  }
}

module.exports = RocketStreak;
