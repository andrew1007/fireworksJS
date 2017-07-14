let RocketBaseClass = require('./rocket_base_class')

class RocketChain extends RocketBaseClass {
  constructor(x, y, context, canvas, color){
    super(x, y, context, canvas, color)
    this.shrink = .999;
    this.size = 5;
  }

  render(){
    this.context.fillStyle = this.color;

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.size, 0, Math.PI * 3, true);
    this.context.closePath();
    this.context.fill();

    this.context.restore();
  }
}

module.exports = RocketChain;
