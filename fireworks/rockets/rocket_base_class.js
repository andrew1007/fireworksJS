class RocketBaseClass {
  constructor(x, y,context, canvas, color){
    this.x = x
    this.y = y

    this.resistance = 0.983;
    this.gravity = 0.07

    this.alpha = 1;
    this.fade = 0;
    this.color = color

    this.context = context
    this.canvas = canvas
    this.velX = Math.random() * 6 - 3;
    this.velY = -20.5 + Math.random() * 4 + (y / 400);
  }

  update(){
    this.velX *= this.resistance;
    this.velY *= this.resistance;

    this.velY += this.gravity;
    this.x += this.velX;
    this.y += this.velY;
    this.size *= this.shrink
  }

  exploded(){
    if (this.velY >= -Math.random()*3){
      return true
    } else{
      return false
    }
  }
}

module.exports = RocketBaseClass;
