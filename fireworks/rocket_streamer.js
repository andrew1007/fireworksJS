class RocketStreamer {
  constructor(x, y, context, canvas, color){
      this.x = x
      this.y = y
      this.shrink = .995;
      this.size = 5;

      this.resistance = 0.983;
      this.gravity = 0.07

      this.alpha = 1;
      this.fade = 0;
      this.color = "rgb(255,215,0)"

      this.context = context
      this.canvas = canvas
      this.velX = Math.random() * 6 - 3;
      this.velY = -20.5 + Math.random() * 3;
    }

    update(){

      this.velX *= this.resistance;
      this.velY *= this.resistance;

      this.velY += this.gravity;
      this.x += this.velX;
      this.y += this.velY;
      this.size *= this.shrink
    }

    trigger(){
      let trigger_1 = this.velY > -13 && this.velY < -12.5
      let trigger_2 = this.velY > -8 && this.velY < -7.5
      return trigger_1 || trigger_2
    }

    exploded(){
      if (this.velY >= -Math.random()*3){
        return true
      } else{
        return false
      }
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
