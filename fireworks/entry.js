// import {welcomeRockets, clearWelcomeMessage} from './helpers/welcome_fireworks';
// import {listeners, clearScreen} from './helpers/screen_handle';
// import Launch from './helpers/launch';

const screenHandle = require('./helpers/screen_handle');
const Launch = require('./helpers/launch');

ctx = canvas.getContext( '2d' );
canvas = document.getElementById('canvas');
fireworksArr = [];

const welcomeRockets = () => {
  const center = Math.floor(ctx.canvas.width / 4 )
  let counter = 0
  for (let i=0; i < 3; i++){
    new Launch(center * (i+ 1), canvas.height, ctx, canvas).welcomeFireworks(counter)
  }
  counter += 1
  setInterval( ()=> {
    for (let i=0; i < 3; i++){
      new Launch(center * (i + 1), canvas.height, ctx, canvas).welcomeFireworks(counter)
    }
    if (counter == 4) clearInterval()
    counter += 1
  }, 1500)
}

const clearScreen = () => {
  ctx.fillStyle = "rgba(0,0,0, .05)";
  ctx.fillRect(0,0, canvas.width, canvas.height)
  requestAnimationFrame(() => clearScreen())
}

const triggerRockets = (e, count) => {
  let xPos = e.clientX;
  let yPos= e.clientY;
  fireworksArr = fireworksArr.filter( firework => {
    return firework.exists()
  })
  for (let i = 0; i < count; i++){
    var x = new Launch(xPos, canvas.height, ctx, canvas)
    x.addFirework(e)
    x.update()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  screenHandle.listeners(ctx, canvas);
  clearScreen()
  welcomeRockets();

  ctx.fillStyle = "rgba(55,55,55, 1)";
  ctx.fillRect(0,0, canvas.width, canvas.height)

  document.addEventListener("click", (e) => {
    triggerRockets(e, 2)
  })
})
