const Launch = require('./launch.js')

export const welcome = () => {
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
    if (counter == 4){
      clearInterval()
    }
    counter += 1
  }, 1500)
}

export const clearWelcomeMessage = () =>{
  window.setTimeout(() =>{
    document.getElementById("fireworks-message").style.zIndex="-1"
  }, 2000)
}
