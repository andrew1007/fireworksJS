let ParticleBaseClass = require('./particle_base_class')

class ParticleCircle extends ParticleBaseClass {
  constructor(x = 0, y = 0, ctx, canvas, color){
    super(x, y, ctx, canvas, color)
    this.gravity = 0.03
    let angle = Math.random() * Math.PI * 2
    let speed =  8 + Math.random(2)
    this.velX = Math.cos(angle) * speed + 1;
    this.velY = Math.sin(angle) * speed * 0.90;
    this.radius = 4
    this.size = 4
  }

  exists(){
    if (this.size < 1.5){
      return false
    } else {
      return true
    }
  }

  render() {
    this.context.fillStyle = this.color;

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
    this.context.closePath();
    this.context.fill();

    this.context.restore();
  }
}

module.exports = ParticleCircle;
