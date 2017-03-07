### Firework simulator

[fireworksJS](https://andrew1007.github.io/fireworksJS/) is a simulation of fireworks. It is a personal project by Andrew Yueh, with the following features:

- [ ] User directed fireworks
- [ ] Randomized colors

![Render][render]
[render]: ./docs/images/render.png
##Project Design

fireworks-js was designed and built in 5 days.

A proposal was drafted to help provide a production timeline.

##Technology

HTML canvas was used as an anchor tag for rendering image stills. All logic beyond rendering rules was implemented in vanilla JavaScript.

##Rendering Firework Fade

By default, `requestAnimationFrame()` performs a render of the next canvas element. The traditional method of clearing previous frames is with `clearRect()`. To create the streaks of previous frames, `fillRect()` was used. `fillRect()` was used to layer on a semi-transparent layer onto the screen with each instance of `requestAnimationFrame()`. This creates a continually fading image from previous frames.

```javaScript
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext( '2d' )

clearScreen = () =>{
  ctx.fillStyle = "rgba(6, 3, 10, .15)";
  ctx.fillRect(0,0, canvas.width, canvas.height)
  requestAnimationFrame(() => clearScreen())
}
```

###Rendering Streaking Fireworks
![Streak][streak]
[streak]: ./docs/images/streaks.png

There is a 15% chance of rendering a larger rocket with a trailing effect. This was accomplished by rendering multiple canvas elements beneath the first with increasing opacity as you render farther away from the topmost circle.

```javascript
getRandomColor(){
  let r = 0 + Math.round(Math.random() * 225);
  let g = 0 + Math.round(Math.random() * 225);
  let b = 0 + Math.round(Math.random() * 225);
  return `rgba(${r}, ${g}, ${b}`
}

render(){
  this.color = this.getRandomColor();
  this.context.fillStyle = `${this.color}, 1)`;

  this.context.beginPath();
  this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
  for (let i=0; i < 15; i++){
    let streakY = i * 5;
    this.context.fillStyle = `${this.color}, ${1 - i * 0.02}`;
    this.context.arc(
      this.x + i * -this.velX + this.randomX() * i * 0.2,
      this.y + streakY + this.velY,
      this.size, 0,
      Math.PI * 2,
      true
    );
  }
  this.context.closePath();
  this.context.fill();

  this.context.restore();
}
```
