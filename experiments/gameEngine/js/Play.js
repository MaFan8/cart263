class Play extends Phaser.Scene {

  // NOTE: As we know, the constructor is called when an object is created with this class
  // but in Phaser 3 we don't actually do much with it! We just make sure that we give
  // the scene a "key" via its parent which we'll need to use to refer to it in our program.
  constructor() {
    super({
      key: `play`
    });
  }

  // NOTE: The create() method is called once when the scene is first created,
  // so we use it to set up all the elements in the current scene
  create() {

  //   let style = {
  //     fontFamily: `sans-serif`,
  //     fontSize: `40px`,
  //     fill: `#ffffff`,
  // };
  // // Create a string that describes an amazing game experience!
  //   let gameDescription = `Think of a number... no that's not it.`;
  //   this.gameText = this.add.text(100, 100, gameDescription, style);

  // this.wall = this.physics.add.image(100 ,100, `wall`);
  // this.wall.setTint(0xdd3333);
  // // tell phsics engine wall can't move
  // this.wall.setImmovable(true);

  // create group of sprites
  this.walls = this.physics.add.group({
    key: `wall`,
    immovable: true,
    quantity: 24
  });
  this.walls.children.each(function(wall) {
    let x = Math.random() * this.sys.canvas.width;
    let y = Math.random() * this.sys.canvas.height;
    wall.setPosition(x, y);
    wall.setTint(0xdd3333);
  }, this);
  this.collectables = this.physics.add.group({
    key: `collectable`,
    immovable: true,
    quantity: 100
  });
  this.collectables.children.each(function(collectable) {
    let x = Math.random() * this.sys.canvas.width;
    let y = Math.random() * this.sys.canvas.height;
    collectable.setPosition(x, y);
    collectable.setTint(0x33dd33);
  }, this);



  this.collectable = this.physics.add.image(300 ,300, `wall`);
  this.collectable.setTint(0x33dd33);

  this.avatar = this.physics.add.sprite(200, 200, `avatar`);

  // enable collison btw avatar and wall
  this.physics.add.collider(this.avatar, this.walls);
  this.physics.add.overlap(this.avatar, this.collectable, this.collectItem, null, this);

  this.createAnimations();

  // this.avatar.setVelocityX(100);
  this.avatar.setCollideWorldBounds(true);

  this.avatar.play(`avatar-idle`); // play it

  //ACCESS to keyboard
  this.cursors = this.input.keyboard.createCursorKeys();
  }

  collectItem(avatar, collectable) {
    collectable.destroy();
  }

  // NOTE: The update() method is a lot like the p5.js draw() function, it's called once
  // every animation frame
  update() {
    this.handleInput();
  }

  handleInput() {
    // this.avatar.setVelocity(0);
    // NOTE: We can now check which keys are pressed and set the velocity of our
    if (this.cursors.left.isDown) {
      this.avatar.setVelocityX(-100);
    }
    else if (this.cursors.right.isDown) {
      this.avatar.setVelocityX(100);
    }
    else {
      // If neither left or right are pressed, stop moving on x
      this.avatar.setVelocityX(0);
    }

    if (this.cursors.up.isDown) {
      this.avatar.setVelocityY(-100);
    }
    else if (this.cursors.down.isDown) {
      this.avatar.setVelocityY(100);
    }
    else {
      // If neither up or down are pressed, stop moving on y
      this.avatar.setVelocityY(0);
    }

     if (this.avatar.body.velocity.x !== 0 || this.avatar.body.velocity.y !== 0) {
       this.avatar.play(`avatar-moving`, true);
    }
    else {
     this.avatar.play(`avatar-idle`, true);
   }
  }


  createAnimations() {
    this.anims.create({
      key: `avatar-moving`,
      frames: this.anims.generateFrameNumbers(`avatar`, {
        start: 0,
        end: 6
      }), // calculate frames
      frameRate: 30,
      repeat: -1 // looping infinitly
    });

    this.anims.create({
      key: `avatar-idle`,
      frames: this.anims.generateFrameNumbers(`avatar`, {
        start: 0,
        end: 0
      }), // calculate frames
      frameRate: 30,
      repeat: 0
    });
  }

}
