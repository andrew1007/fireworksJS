### Firework simulator

[fireworks-js](https://andrew1007.github.io/) is a simulation of fireworks. It is a personal project by Andrew Yueh, with the following features:

- [ ] User directed fireworks
- [ ] Randomized colors

![Welcome][welcome]

[welcome]: ./docs/images/welcome.png

![Render][render]
[render]: ./docs/images/render.png
##Project Design

fireworks-js was designed and built in 5 days.

A proposal was drafted to help provide a production timeline.

##Technology

HTML canvas was used as an anchor tag for rendering image stills. All logic beyond rendering rules was implemented in vanilla JavaScript.

##Rendering Firework Streaks

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

### Bonus features

Some features, if time permits are:

- [ ] Creating different styles of fireworks.
