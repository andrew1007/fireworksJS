### Firework simulator

A simulation of fireworks is planned with the following features that will be available to users:

- [ ] Select colors or have the option of randomized colors
- [ ] Click on any position of the canvas to fire off a firework

In addition, this project will include:

- [ ] A color picker dropdown and ticker for randomize colors
- [ ] a production Readme

### Wireframes

This app will consist of a single screen with a color picker and a small snippet on the bottom explaining how to use the firework simulator.

![Wireframe][wireframe]

[wireframe]: ./Images/Wireframe.png
### Architecture and Technologies

This project will be implemented with the following technologies
- Vanilla Javascript for animation, firework generation/firing logic, particle rendering, and basic physics calculations.
- p5.js to handle animation
There will be two scripts involved in this project:

`firework.js`: this script will handle positioning of fireworks from the base of the canvas, along with animation velocity/deceleration.

`particle.js`: this will include the physics, animation, and styling of particles after firework objects reach their destination.

### Implementation Timeline

**Day 1** Setup all necessary node modules. Create `webpack.config.js` as well as `package.json`. Goals of the day:
 - Get a green bundle with `webpack`
 - Learn enough vanilla Javascript to correctly render a customized moving object (no physics)

**Day 2** Learn more about animation and how to create particles that move non-linearly. Goals of the day:
  - Complete the math that allows particle effects to curve downwards in a realistic manner
  - Implement color picker and color randomizer

**Day 3** Implement styling techniques. Goals of the day:
  - Construct gradients and truly styled fireworks for the projectile and the particles

**Day 4** Install user controls. Goals of the day:
  - Make fireworks an interactive experience with user input controlling the destination of fireworks with mouse clicks
  - Create a queue for fireworks to handle multiple clicks

### Bonus features

Some features, if time permits are:

- [ ] Create different styles of fireworks
- [ ] Allow users to choose various firing patterns
