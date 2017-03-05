const listeners = (ctx, canvas) => {
  document.body.style.overflow = "hidden"
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  })
}

module.exports = {listeners}
