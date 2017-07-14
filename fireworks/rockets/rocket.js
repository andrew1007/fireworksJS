let RocketBaseClass = require('./rocket_base_class')

class Rocket extends RocketBaseClass {
  constructor(x, y, context, canvas, color){
    super(x, y, context, canvas, color)
    this.size = 3;
    this.shrink = .999;
    this.shapeEquation = Math.PI * 2
  }

  render(){
    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.size, 0, this.shapeEquation, true);
    this.context.closePath();
    this.context.fill();

    this.context.restore();
  }
}

module.exports = Rocket;
