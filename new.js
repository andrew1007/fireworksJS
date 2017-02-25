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

	const Rocket = __webpack_require__(1);
	const Particle = __webpack_require__(2);
	
	class Launch {
	  constructor(x, y, ctx, canvas) {
	    this.rockets = [];
	    this.particles = [];
	    this.context = ctx;
	    this.canvas = canvas;
	    this.x = x;
	    this.y = y;
	    this.color = this.getRandomColor(1);
	  }
	
	  addFirework(e) {
	    let xPos = this.x;
	    let yPos = this.y;
	    let rocket = new Rocket(xPos, yPos, this.context, this.canvas, this.color);
	    this.rockets = this.rockets.concat(rocket);
	  }
	
	  welcomeFireworks() {
	    let rocket = new Rocket(this.x, this.y, this.context, this.canvas, this.color);
	    this.rockets.push(rocket);
	    this.update();
	  }
	
	  getRandomColor(a) {
	    let r = 0 + Math.round(Math.random() * 225);
	    let g = 0 + Math.round(Math.random() * 225);
	    let b = 0 + Math.round(Math.random() * 225);
	    return `rgba(${r}, ${g}, ${b}, ${a})`;
	  }
	
	  // clearBoard(){
	  //   this.context.fillStyle = "rgba(0, 0, 0, .10)";
	  //   this.context.fillRect(0,0, canvas.width, canvas.height)
	  // }
	
	  exists() {
	    return this.rockets.length > 0;
	  }
	
	  update() {
	    if (this.particles.length > 1 || this.rockets.length > 0) {
	      requestAnimationFrame(() => this.update());
	    }
	    this.rockets.forEach((firework, i) => {
	      let color = this.getRandomColor(1);
	      if (firework.exploded()) {
	        for (let i = 0; i < 20; i++) {
	          this.particles = this.particles.concat(new Particle(firework.x, firework.y, this.context, this.canvas, 5, this.color));
	        }
	        this.rockets.splice(i, 1);
	      }
	      firework.render();
	      firework.update();
	    });
	    this.particles = this.particles.filter(particle => {
	      return particle.exists();
	    });
	    this.particles.forEach((particle, i) => {
	      if (!particle.exists()) {
	        this.particles.splice(i, 1);
	      }
	      particle.render();
	      particle.update();
	    });
	  }
	
	}
	
	document.body.style.overflow = "hidden";
	let canvas = document.getElementById('canvas');
	let ctx = canvas.getContext('2d');
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	
	window.addEventListener("resize", () => {
	  let canvas = document.getElementById('canvas');
	  let ctx = canvas.getContext('2d');
	  ctx.canvas.width = window.innerWidth;
	  ctx.canvas.height = window.innerHeight;
	});
	
	var fireworksArr = [];
	clearScreen = () => {
	  ctx.fillStyle = "rgba(6, 3, 10, .15)";
	  ctx.fillRect(0, 0, canvas.width, canvas.height);
	  requestAnimationFrame(() => clearScreen());
	};
	
	clearScreen();
	
	const oneThird = Math.floor(ctx.canvas.width / 3);
	const twoThird = Math.floor(ctx.canvas.width / 2);
	const oneWhole = Math.floor(ctx.canvas.width * 2 / 3);
	
	for (let i = 0; i < 13; i++) {
	  new Launch(oneThird, canvas.height, ctx, canvas).welcomeFireworks();
	  new Launch(twoThird, canvas.height, ctx, canvas).welcomeFireworks();
	  new Launch(oneWhole, canvas.height, ctx, canvas).welcomeFireworks();
	}
	
	window.setTimeout(() => {
	  document.getElementById("fireworks-message").style.zIndex = "-1";
	}, 3500);
	
	document.addEventListener("click", e => {
	  let xPos = e.clientX;
	  let yPos = e.clientY;
	  fireworksArr = fireworksArr.filter(firework => {
	    return firework.exists();
	  });
	  for (let i = 0; i < 13; i++) {
	    var x = new Launch(xPos, canvas.height, ctx, canvas);
	    x.addFirework(e);
	    x.update();
	  }
	});

/***/ },
/* 1 */
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
	    this.velY = Math.random() * -5 * (y / 320) - 10.5;
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
/* 2 */
/***/ function(module, exports) {

	class Particle {
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
	    if (this.size < 2) {
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
	
	module.exports = Particle;

/***/ }
/******/ ]);
//# sourceMappingURL=new.js.map