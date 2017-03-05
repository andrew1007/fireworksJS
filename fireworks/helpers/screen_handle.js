let canvas = document.getElementById('canvas')
let ctx = canvas.getContext( '2d' )

export const listeners = (ctx, canvas) => {
  document.body.style.overflow = "hidden"
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    let canvas = document.getElementById('canvas')
    let ctx = canvas.getContext( '2d' )
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  })
}

export const clearScreen = (ctx) => {
  ctx.fillStyle = "rgba(6, 3, 10, .07)";
  ctx.fillRect(0,0, canvas.width, canvas.height)
  requestAnimationFrame(() => clearScreen())
}
