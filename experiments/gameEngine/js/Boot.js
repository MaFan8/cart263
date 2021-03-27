class Boot extends Phaser.Scene {

  constructor() {
    super({
      // NOTE: We need to use an appropriate and different key!
      key: `boot`
    });
  }

  preload() {
    // Load image
    this.load.image(`wall`, `assets/images/wall.png`);
    //Load spritesheet
    this.load.spritesheet(`avatar`, `assets/images/avatar.png`, {
      // Our animation uses 32x32 pixel frames
      frameWidth: 32,
      frameHeight: 32,
      // Our animation has 4 frames, so the final frame number is 3, counting from 0
      endFrame: 6
       });


    // cannot use anonymous function since 'this' will be lost
    this.load.on(`complete`, () => {
     // Switch to the Play scene
     this.scene.start(`play`);
   });


  }


  create() {
    // NOTE: Adding a loading message to the scene on creation
    let loadingTextStyle = {
      fontFamily: "sans-serif",
      fontSize: "40px",
      fill: "#ffffff",
      align: "center"
    };
    let loadingString = `Loading...`;
    this.loadingText = this.add.text(100, 100, loadingString, loadingTextStyle);


  }

  update() {
  }
}
