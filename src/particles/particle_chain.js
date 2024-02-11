let ParticleBaseClass = require('./particle_base_class')

class ParticleChain extends ParticleBaseClass {
    constructor(x = 0, y = 0, ctx, canvas, radius, color){
      super(x, y, ctx, canvas, color)
      let speed = Math.cos(
        Math.random() * Math.PI / 2) * (10 * (Math.random() / 2 + 0.5)
      ) + 3
      this.velX = Math.cos(this.angle) * speed + 0.6;
      this.velY = Math.sin(this.angle) * speed * 0.67;
      this.radius = radius
    }

    exists(){
      return (this.size < 3) ? false : true
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


module.exports = ParticleChain;
