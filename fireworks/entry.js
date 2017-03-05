import {welcomeRockets, clearWelcomeMessage} from './welcome_fireworks';
import {listeners, clearScreen} from './screen';

document.addEventListener('DOMContentLoaded', () => {

  var fireworksArr = []
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

  document.addEventListener("click", (e) => {
    triggerRockets(e, 3)
  })
}, false)
