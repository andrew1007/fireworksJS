class RocketStreak {
  constructor(x, y, context, canvas, color){
    this.x = x
    this.y = y
    this.shrink = .999;
    this.size = 2.5;

    this.resistance = 0.983;
    this.gravity = 0.07;

    this.alpha = 1;
    this.fade = 0;
    this.color = color

    this.context = context
    this.canvas = canvas
    this.velX = Math.random() * 1 - 1;
    this.velY = -20.5 + Math.random() * 4 + (y / 400);
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

  render(){
    // console.log(this.color);
    this.context.fillStyle = this.color;

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
    for (let i=0; i < 20; i++){
      let streakY = i * 5
      this.context.fillStyle = this.color + `,${1 - i * 0.02}`
      this.context.arc(this.x + i * -this.velX * 1 + this.randomX() * i * 0.2, this.y + streakY + this.velY, this.size, 0, Math.PI * 2, true);
    }
    this.context.closePath();
    this.context.fill();

    this.context.restore();
  }
}

module.exports = RocketStreak;
