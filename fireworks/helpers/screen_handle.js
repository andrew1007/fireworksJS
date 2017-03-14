const listeners = (ctx, canvas) => {
  document.body.style.overflow = "hidden"
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.fillStyle = "rgba(55,55,55, 1)";
    ctx.fillRect(0,0, canvas.width, canvas.height)
  })
}

module.exports = {listeners}
