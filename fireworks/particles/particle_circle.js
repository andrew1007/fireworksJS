let ParticleBaseClass = require('./particle_base_class')

class ParticleCircle extends ParticleBaseClass {
  constructor(x = 0, y = 0, ctx, canvas, radius, color){
    super(x, y, ctx, canvas, color)
    this.gravity = 0.03
    let speed =  8 + Math.random(2)
    this.velX = Math.cos(this.angle) * speed + 1;
    this.velY = Math.sin(this.angle) * speed * 0.90;
    this.radius = 4
  }

  exists(){
    return (this.size < 1.5) ? false : true
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
