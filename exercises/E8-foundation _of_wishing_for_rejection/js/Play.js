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
     // Phaser.Actions.RandomRectangle(this.happiness.getChildren(), this.physics.world.bounds);

    this.physics.add.overlap(this.avatar, this.sadness, this.getSad, null, this);
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
