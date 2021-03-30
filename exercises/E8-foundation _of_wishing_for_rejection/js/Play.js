let anim;
//https://phaser.io/examples/v3/view/game-objects/particle-emitter/custom-particles#
//https://phaser.io/examples/v3/view/game-objects/particle-emitter/fire-max-10-particles#
//https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Particles.ParticleEmitterManager.html
class Play extends Phaser.Scene {
  constructor () {
    super({
      key: `play`
    });
  }

  create() {
    // create avatar
    this.avatar = this.physics.add.sprite(400, 400, `avatar`);
    // this.avatar.setCollideWorldBounds(true);


    this.sadness = this.physics.add.sprite(0, 0, `thumbs-down`);
    // Phaser.Actions.RandomRectangle([this.sadness], this.physics.world.bounds);

    this.happiness = this.physics.add.group({
      key: `thumbs-up`,
      quantity: 120,
      bounceX: 0.5,
      bounceY: 0.5,
      collideWorldBounds: true,
      dragX: 50,
      dragY: 50
    });


    this.config = {
        key: 'walk',
        frames: this.anims.generateFrameNumbers('mummy'),
        frameRate: 18,
        repeat: -1
    };

    //need an animation for the particles...

    anim = this.anims.create(this.config);

     this.particles = this.add.particles(`thumbs-up`);
     this.particlesTwo = this.add.particles(`thumbs-down`);


       // this.emitter = this.particles.createEmitter({
       //         x: 100,
       //         y: 100,
       //         frame: 0,
       //         quantity: 1,
       //         frequency: 200,
       //         angle: { min: 0, max: 30 },
       //         speed: 200,
       //         gravityY: 100,
       //         lifespan: { min: 1000, max: 2000 },
       //         particleClass: AnimatedParticle
       //     });

           this.emitter  = this.particles.createEmitter({
                   alpha: { start: 1, end: 0 },
                   scale: { start: 0.5, end: 2.5 },
                   //tint: { start: 0xff945e, end: 0xff945e },
                   speed: 20,
                   accelerationY: -200,
                   angle: { min: -85, max: -95 },
                   rotate: { min: 180, max: 180 },
                   lifespan: { min: 1000, max: 1100 },
                   // blendMode: 'ADD',
                   frequency: 110,
                   maxParticles: 10,
                   x: 400,
                   y: 300
               });

           // this.emittertwo  = this.particlesTwo.createEmitter({
           //         alpha: { start: 1, end: 0 },
           //         scale: { start: 0.5, end: 2.5 },
           //         //tint: { start: 0xff945e, end: 0xff945e },
           //         speed: 20,
           //         accelerationY: -300,
           //         angle: { min: -85, max: -95 },
           //         rotate: { min: -180, max: 180 },
           //         lifespan: { min: 1000, max: 1100 },
           //         blendMode: 'ADD',
           //         frequency: 110,
           //         maxParticles: 10,
           //         x: 400,
           //         y: 300
           //     });



     // Phaser.Actions.RandomRectangle(this.happiness.getChildren(), this.physics.world.bounds);



    // this.physics.add.overlap(this.avatar, this.sadness, this.getSad, null, this);
    this.physics.add.collider(this.avatar, this.happiness);
    this.physics.add.collider(this.sadness, this.happiness);
    this.physics.add.collider(this.happiness, this.happiness);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  getSad(avatar, sadness) {
    // let x = Math.random() * this.sys.canvas.width;
    // let y = Math.random() * this.sys.canvas.height;
    // this.sadness.setPosition(x, y);
    // Note how we can use RandomRectangle() again here if we put the object we want
    // to reposition randomly in an array!
    Phaser.Actions.RandomRectangle([sadness], this.physics.world.bounds);
  }

  update() {
    this.handleInput();
    //this.rt.draw(this.particles, 0, 0);
  }

  handleInput() {
    // If either left or right is pressed, rotate appropriately
    if (this.cursors.left.isDown) {
      this.avatar.setAngularVelocity(-150);
    }
    else if (this.cursors.right.isDown) {
      this.avatar.setAngularVelocity(150);
    }
    // Otherwise stop rotating
    else {
      this.avatar.setAngularVelocity(0);
    }

    // If the up key is pressed, accelerate in the current rotation direction
    if (this.cursors.up.isDown) {
      this.physics.velocityFromRotation(this.avatar.rotation, 200, this.avatar.body.acceleration);
    }
    // Otherwise, zero the acceleration
    else {
      this.avatar.setAcceleration(0);
    }
  }
}


//CUSTOM CLASS///
class AnimatedParticle extends Phaser.GameObjects.Particles.Particle
{
    constructor (emitter)
    {
        super(emitter);

        this.t = 0;
        this.i = 0;
    }

    update (delta, step, processors)
    {
        let result = super.update(delta, step, processors);

        this.t += delta;

        if (this.t >= anim.msPerFrame)
        {
            this.i++;

            if (this.i > 17)
            {
                this.i = 0;
            }
            //update the frame.
            this.frame = anim.frames[this.i].frame;

            this.t -= anim.msPerFrame;
        }

        return result;
    }
}
