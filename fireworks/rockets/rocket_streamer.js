let RocketBaseClass = require('./rocket_base_class')

class RocketStreamer extends RocketBaseClass {
  constructor(x, y, context, canvas, color){
    super(x, y, context, canvas, color)
    this.shrink = .995;
    this.size = 5;
    this.color = "rgba(255,215, 0, 0.7)"
  }

  trigger(){
    let trigger_1 = this.velY > -13 && this.velY < -12.5
    let trigger_2 = this.velY > -8 && this.velY < -7.5
    return trigger_1 || trigger_2
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

module.exports = RocketStreamer;
