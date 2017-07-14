let ParticleBaseClass = require('./particle_base_class')

class ParticleDefault extends ParticleBaseClass {
  constructor(x = 0, y = 0, ctx, canvas, radius, color){
    super(x, y, ctx, canvas, color)
    this.gravity = 0.1
    let angle = Math.random() * Math.PI * 2
    let speed = Math.cos(Math.random() * Math.PI / 2) * (10 * (Math.random() / 2 + 0.5))
    this.velX = Math.cos(angle) * speed + 0.6;
    this.velY = Math.sin(angle) * speed * 0.80;
    this.radius = radius
    this.size = 4
  }

  exists(){
    if (this.size < 1.3){
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

module.exports = ParticleDefault;
