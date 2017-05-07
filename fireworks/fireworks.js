/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// import {welcomeRockets, clearWelcomeMessage} from './helpers/welcome_fireworks';
	// import {listeners, clearScreen} from './helpers/screen_handle';
	// import Launch from './helpers/launch';
	
	const screenHandle = __webpack_require__(1);
	const Launch = __webpack_require__(2);
	
	ctx = canvas.getContext('2d');
	canvas = document.getElementById('canvas');
	fireworksArr = [];
	
	const welcomeRockets = () => {
	  const center = Math.floor(ctx.canvas.width / 4);
	  let counter = 0;
	  for (let i = 0; i < 3; i++) {
	    new Launch(center * (i + 1), canvas.height, ctx, canvas).welcomeFireworks(counter);
	  }
	  counter += 1;
	  setInterval(() => {
	    for (let i = 0; i < 3; i++) {
	      new Launch(center * (i + 1), canvas.height, ctx, canvas).welcomeFireworks(counter);
	    }
	    if (counter == 4) {
	      clearInterval();
	    }
	    counter += 1;
	  }, 1500);
	};
	
	const clearScreen = () => {
	  ctx.fillStyle = "rgba(0,0,0, .05)";
	  ctx.fillRect(0, 0, canvas.width, canvas.height);
	  requestAnimationFrame(() => clearScreen());
	};
	
	const triggerRockets = (e, count) => {
	  let xPos = e.clientX;
	  let yPos = e.clientY;
	  fireworksArr = fireworksArr.filter(firework => {
	    return firework.exists();
	  });
	  for (let i = 0; i < count; i++) {
	    var x = new Launch(xPos, canvas.height, ctx, canvas);
	    x.addFirework(e);
	    x.update();
	  }
	};
	
	document.addEventListener('DOMContentLoaded', () => {
	  screenHandle.listeners(ctx, canvas);
	  clearScreen();
	  welcomeRockets();
	
	  ctx.fillStyle = "rgba(55,55,55, 1)";
	  ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	  document.addEventListener("click", e => {
	    triggerRockets(e, 2);
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	const listeners = (ctx, canvas) => {
	  document.body.style.overflow = "hidden";
	  ctx.canvas.width = window.innerWidth;
	  ctx.canvas.height = window.innerHeight;
	
	  window.addEventListener("resize", () => {
	    ctx.canvas.width = window.innerWidth;
	    ctx.canvas.height = window.innerHeight;
	    ctx.fillStyle = "rgba(55,55,55, 1)";
	    ctx.fillRect(0, 0, canvas.width, canvas.height);
	  });
	};
	
	module.exports = { listeners };

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Rocket = __webpack_require__(3);
	const RocketStreak = __webpack_require__(4);
	const RocketChain = __webpack_require__(5);
	const RocketStreamer = __webpack_require__(6);
	
	const ParticleDefault = __webpack_require__(7);
	const ParticleCircle = __webpack_require__(8);
	const ParticleChain = __webpack_require__(9);
	
	class Launch {
	  constructor(x, y, ctx, canvas) {
	    this.rockets = [];
	    this.particles = [];
	    this.context = ctx;
	    this.canvas = canvas;
	    this.x = x;
	    this.y = y;
	    this.color = this.getRandomColor(1);
	    this.particleCount = 0;
	    this.chanceRocketStreak = 0.7;
	    this.chanceRocketChain = 0.50;
	    this.chanceRocketDefault = 0;
	    this.chanceRocketStreamer = 0.85;
	    this.particleCircleCount = 45;
	    this.particleChainCount = 3;
	    this.particleDefaultCount = 30;
	  }
	
	  sparkler(xPos, yPos) {}
	
	  rocketStreamer(xPos, yPos) {
	    let rocket = new RocketStreamer(xPos, yPos, this.context, this.canvas, this.color);
	    this.rockets = this.rockets.concat(rocket);
	  }
	
	  rocketStreak(xPos, yPos) {
	    let rocket = new RocketStreak(xPos, yPos, this.context, this.canvas, this.color);
	    this.rockets = this.rockets.concat(rocket);
	  }
	
	  rocketChain(xPos, yPos) {
	    let rocket = new RocketChain(xPos, yPos, this.context, this.canvas, this.color);
	    this.rockets = this.rockets.concat(rocket);
	  }
	
	  rocketDefault(xPos, yPos) {
	    let rocket = new Rocket(xPos, yPos, this.context, this.canvas, this.color);
	    this.rockets = this.rockets.concat(rocket);
	  }
	
	  triggerRocketStreak(rng) {
	    return rng > this.chanceRocketStreak;
	  }
	
	  triggerRocketChain(rng) {
	    return rng > this.chanceRocketChain;
	  }
	
	  triggerRocketStreamer(rng) {
	    return rng > this.chanceRocketStreamer;
	  }
	
	  addFirework(e) {
	    let xPos = this.x;
	    let yPos = this.y;
	    let rng = Math.random();
	    switch (true) {
	      case this.triggerRocketStreamer(rng):
	        this.rocketStreamer(xPos, yPos);
	        break;
	      case this.triggerRocketStreak(rng):
	        this.rocketStreak(xPos, yPos);
	        break;
	      case this.triggerRocketChain(rng):
	        this.rocketChain(xPos, yPos);
	        break;
	      default:
	        this.rocketDefault(xPos, yPos);
	    }
	  }
	
	  welcomeFireworks(counter) {
	    let rng = Math.random();
	    switch (counter) {
	      case 0:
	        this.rocketDefault(this.x, this.y);
	        break;
	      case 1:
	        this.rocketChain(this.x, this.y);
	        break;
	      case 2:
	        this.rocketStreak(this.x, this.y);
	        break;
	      case 3:
	        this.rocketStreamer(this.x, this.y);
	    }
	    this.update();
	  }
	
	  getRandomColor() {
	    let r = 80 + Math.round(Math.random() * 150);
	    let g = 80 + Math.round(Math.random() * 150);
	    let b = 80 + Math.round(Math.random() * 150);
	    let a = 1;
	    return `rgba(${r}, ${g}, ${b}, ${a}`;
	  }
	
	  exists() {
	    return this.rockets.length > 0;
	  }
	
	  particleCircle(firework, newColor = false) {
	    let rng = Math.random();
	    // let counter = 0
	    // let lessThanCouner = (num) => {
	    //   return counter < num
	    // }
	    // setInterval( () => {
	    //   switch(true){
	    //     case (lessThanCouner(10)):
	    for (let i = 0; i < this.particleCircleCount; i++) {
	      if (newColor) {
	        this.color = this.getRandomColor();
	      }
	      this.particleCount += 45;
	      this.particles = this.particles.concat(new ParticleCircle(firework.x, firework.y, this.context, this.canvas, this.color));
	    }
	    //     break
	    //     default:
	    //       clearInterval()
	    //       return
	    //   }
	    //   counter += 1
	    // }, 100)
	  }
	
	  particleChain(firework) {
	    let rng = Math.random();
	    for (let i = 0; i < this.particleChainCount; i++) {
	      if (rng > 0.60) {
	        this.color = this.getRandomColor();
	      }
	      this.particles = this.particles.concat(new ParticleChain(firework.x, firework.y, this.context, this.canvas, 5, this.color));
	    }
	  }
	
	  particleDefault(firework, particleCount, newColor = false) {
	    for (let i = 0; i < particleCount; i++) {
	      if (newColor) {
	        this.color = this.getRandomColor();
	      }
	      this.particles = this.particles.concat(new ParticleDefault(firework.x, firework.y, this.context, this.canvas, 5, this.color));
	    }
	  }
	
	  triggerParticles() {
	    this.rockets.forEach((firework, i) => {
	      if (firework.constructor.name === "RocketStreamer") {
	        if (firework.trigger()) {
	          this.particleDefault(firework, 20, true);
	        }
	      }
	      let rng = Math.random();
	      if (firework.exploded()) {
	        switch (firework.constructor.name) {
	          case "RocketStreak":
	            this.particleCircle(firework);
	            break;
	          case "RocketChain":
	            this.particleChain(firework);
	            break;
	          case "RocketStreamer":
	            this.particleCircle(firework, true);
	            break;
	          case "Rocket":
	            this.particleDefault(firework, 30);
	            break;
	        }
	        this.rockets.splice(i, 1);
	      }
	      firework.render();
	      firework.update();
	    });
	  }
	
	  clearParticles() {
	    this.particles.forEach((particle, i) => {
	      if (!particle.exists()) {
	        let rng = Math.random();
	        if (particle.constructor.name === "ParticleChain") {
	          if (rng > 0.80) {
	            this.color = this.getRandomColor();
	          }
	          this.particleDefault(particle, 20);
	        }
	        this.particles.splice(i, 1);
	        this.particleCount -= 1;
	      }
	      particle.render();
	      particle.update();
	    });
	  }
	
	  update() {
	    if (this.particles.length > 1 || this.rockets.length > 0) {
	      requestAnimationFrame(() => this.update());
	    }
	    this.triggerParticles();
	    this.clearParticles();
	  }
	
	}
	module.exports = Launch;

/***/ },
/* 3 */
/***/ function(module, exports) {

	class Rocket {
	  constructor(x, y, context, canvas, color) {
	    this.x = x;
	    this.y = y;
	    this.shrink = .999;
	    this.size = 3;
	
	    this.resistance = 0.983;
	    this.gravity = 0.07;
	
	    this.alpha = 1;
	    this.fade = 0;
	    this.color = color;
	
	    this.context = context;
	    this.canvas = canvas;
	    this.velX = Math.random() * 6 - 3;
	    this.velY = -20.5 + Math.random() * 4 + y / 400;
	  }
	
	  update() {
	
	    this.velX *= this.resistance;
	    this.velY *= this.resistance;
	
	    this.velY += this.gravity;
	    this.x += this.velX;
	    this.y += this.velY;
	  }
	
	  exploded() {
	    if (this.velY >= -Math.random() * 3) {
	      return true;
	    } else {
	      return false;
	    }
	  }
	
	  render() {
	    // console.log(this.color);
	    this.context.fillStyle = this.color;
	
	    this.context.beginPath();
	    this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
	    this.context.closePath();
	    this.context.fill();
	
	    this.context.restore();
	  }
	}
	
	module.exports = Rocket;

/***/ },
/* 4 */
/***/ function(module, exports) {

	class RocketStreak {
	  constructor(x, y, context, canvas, color) {
	    this.x = x;
	    this.y = y;
	    this.shrink = .999;
	    this.size = 2.5;
	
	    this.resistance = 0.983;
	    this.gravity = 0.07;
	
	    this.alpha = 1;
	    this.fade = 0;
	    this.color = color;
	
	    this.context = context;
	    this.canvas = canvas;
	    this.velX = Math.random() * 1 - 1;
	    this.velY = -20.5 + Math.random() * 4 + y / 400;
	  }
	
	  update() {
	    this.velX *= this.resistance;
	    this.velY *= this.resistance;
	
	    this.velY += this.gravity;
	    this.x += this.velX;
	    this.y += this.velY;
	  }
	
	  exploded() {
	    if (this.velY >= -Math.random() * 3) {
	      return true;
	    } else {
	      return false;
	    }
	  }
	
	  randomX() {
	    if (Math.random() > 0.5) return Math.random() * 3;else {
	      return Math.random() * -3;
	    }
	  }
	
	  randomY() {
	    return Math.random() * 5 + 30;
	  }
	
	  render() {
	    // console.log(this.color);
	    this.context.fillStyle = this.color;
	
	    this.context.beginPath();
	    this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
	    for (let i = 0; i < 20; i++) {
	      let streakY = i * 5;
	      this.context.fillStyle = this.color + `,${1 - i * 0.02}`;
	      this.context.arc(this.x + i * -this.velX * 1 + this.randomX() * i * 0.2, this.y + streakY + this.velY, this.size, 0, Math.PI * 2, true);
	    }
	    this.context.closePath();
	    this.context.fill();
	
	    this.context.restore();
	  }
	}
	
	module.exports = RocketStreak;

/***/ },
/* 5 */
/***/ function(module, exports) {

	class RocketChain {
	  constructor(x, y, context, canvas, color) {
	    this.x = x;
	    this.y = y;
	    this.shrink = .999;
	    this.size = 5;
	
	    this.resistance = 0.983;
	    this.gravity = 0.07;
	
	    this.alpha = 1;
	    this.fade = 0;
	    this.color = color;
	
	    this.context = context;
	    this.canvas = canvas;
	    this.velX = Math.random() * 6 - 3;
	    this.velY = -20.5 + Math.random() * 4 + y / 400;
	  }
	
	  update() {
	
	    this.velX *= this.resistance;
	    this.velY *= this.resistance;
	
	    this.velY += this.gravity;
	    this.x += this.velX;
	    this.y += this.velY;
	  }
	
	  exploded() {
	    if (this.velY >= -Math.random() * 3) {
	      return true;
	    } else {
	      return false;
	    }
	  }
	
	  render() {
	    // console.log(this.color);
	    this.context.fillStyle = this.color;
	
	    this.context.beginPath();
	    this.context.arc(this.x, this.y, this.size, 0, Math.PI * 3, true);
	    this.context.closePath();
	    this.context.fill();
	
	    this.context.restore();
	  }
	}
	
	module.exports = RocketChain;

/***/ },
/* 6 */
/***/ function(module, exports) {

	class RocketStreamer {
	  constructor(x, y, context, canvas, color) {
	    this.x = x;
	    this.y = y;
	    this.shrink = .995;
	    this.size = 5;
	
	    this.resistance = 0.983;
	    this.gravity = 0.07;
	
	    this.alpha = 1;
	    this.fade = 0;
	    this.color = "rgba(255,215, 0, 0.7)";
	
	    this.context = context;
	    this.canvas = canvas;
	    this.velX = Math.random() * 6 - 3;
	    this.velY = -20.5 + Math.random() * 4 + y / 400;
	  }
	
	  update() {
	
	    this.velX *= this.resistance;
	    this.velY *= this.resistance;
	
	    this.velY += this.gravity;
	    this.x += this.velX;
	    this.y += this.velY;
	    this.size *= this.shrink;
	  }
	
	  trigger() {
	    let trigger_1 = this.velY > -13 && this.velY < -12.5;
	    let trigger_2 = this.velY > -8 && this.velY < -7.5;
	    return trigger_1 || trigger_2;
	  }
	
	  exploded() {
	    if (this.velY >= -Math.random() * 3) {
	      return true;
	    } else {
	      return false;
	    }
	  }
	
	  render() {
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

/***/ },
/* 7 */
/***/ function(module, exports) {

	class ParticleDefault {
	  constructor(x = 0, y = 0, ctx, canvas, radius, color) {
	    this.x = x;
	    this.y = y;
	    this.gravity = 0.1;
	    this.resistance = 0.98;
	    this.context = ctx;
	    this.canvas = canvas;
	    this.posX = this.canvas.width / 2;
	    this.posY = this.canvas.height;
	    let angle = Math.random() * Math.PI * 2;
	    let speed = Math.cos(Math.random() * Math.PI / 2) * (10 * (Math.random() / 2 + 0.5));
	    this.velX = Math.cos(angle) * speed + 0.6;
	    this.velY = Math.sin(angle) * speed * 0.80;
	    this.radius = radius;
	    this.size = 4;
	    this.shrink = .98 + Math.random() / 1000;
	    this.color = color;
	  }
	
	  velX() {
	    return Math.cos(this.angle) * this.speed;
	  }
	
	  velY() {
	    return Math.cos(this.angle) * this.speed + this.gravity;
	  }
	
	  update() {
	    this.velX *= this.resistance;
	    this.velY *= this.resistance;
	    this.velY += this.gravity;
	
	    this.x += this.velX;
	    this.y += this.velY;
	    this.size *= this.shrink;
	  }
	
	  exists() {
	    if (this.size < 1.3) {
	      return false;
	    } else {
	      return true;
	    }
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
	
	module.exports = ParticleDefault;

/***/ },
/* 8 */
/***/ function(module, exports) {

	class ParticleCircle {
	  constructor(x = 0, y = 0, ctx, canvas, color) {
	    this.x = x;
	    this.y = y;
	    this.gravity = 0.03;
	    this.resistance = 0.98;
	    this.context = ctx;
	    this.canvas = canvas;
	    this.posX = this.canvas.width / 2;
	    this.posY = this.canvas.height;
	    let angle = Math.random() * Math.PI * 2;
	    // let angle = Math.PI * 2;
	    // let speed = Math.cos(Math.random() * Math.PI / 2) * (10 * (Math.random() / 2 + 0.5))
	    let speed = 8 + Math.random(2);
	    this.velX = Math.cos(angle) * speed + 1;
	    this.velY = Math.sin(angle) * speed * 0.90;
	    this.radius = 4;
	    this.size = 4;
	    this.shrink = .980 + Math.random() / 1000;
	    // this.shrink = 0
	    this.color = color;
	  }
	
	  velX() {
	    return Math.cos(this.angle) * this.speed;
	  }
	
	  velY() {
	    return Math.cos(this.angle) * this.speed;
	  }
	
	  update() {
	    this.velX *= this.resistance;
	    this.velY *= this.resistance;
	    this.velY += this.gravity;
	
	    this.x += this.velX;
	    this.y += this.velY;
	    this.size *= this.shrink;
	  }
	
	  exists() {
	    if (this.size < 1.5) {
	      return false;
	    } else {
	      return true;
	    }
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
	
	module.exports = ParticleCircle;

/***/ },
/* 9 */
/***/ function(module, exports) {

	class ParticleChain {
	  constructor(x = 0, y = 0, ctx, canvas, radius, color) {
	    this.x = x;
	    this.y = y;
	    this.resistance = 0.98;
	    this.gravity = 0.1;
	    this.context = ctx;
	    this.canvas = canvas;
	    this.posX = this.canvas.width / 2;
	    this.posY = this.canvas.height;
	    let angle = Math.random() / -1 * Math.PI * 2;
	    let speed = Math.cos(Math.random() * Math.PI / 2) * (10 * (Math.random() / 2 + 0.5)) + 3;
	    this.velX = Math.cos(angle) * speed + 0.6;
	    this.velY = Math.sin(angle) * speed * 0.67;
	    this.radius = radius;
	    this.size = 4;
	    this.shrink = .98 + Math.random() / 1000;
	    this.color = color;
	  }
	
	  velX() {
	    return Math.cos(this.angle) * this.speed;
	  }
	
	  velY() {
	    return Math.cos(this.angle) * this.speed + this.gravity;
	  }
	
	  update() {
	    this.velX *= this.resistance;
	    this.velY *= this.resistance;
	    this.velY += this.gravity;
	
	    this.x += this.velX;
	    this.y += this.velY;
	    this.size *= this.shrink;
	  }
	
	  exists() {
	    if (this.size < 3) {
	      return false;
	    } else {
	      return true;
	    }
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

/***/ }
/******/ ]);
//# sourceMappingURL=fireworks.js.map