class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: `boot`
    });
  }

preload() {
  // Load assets
  this.load.image(`avatar`, `assets/images/avatar.png`);
  this.load.image(`thumbs-down`, `assets/images/thumbs-down.png`);
  this.load.image(`thumbs-up`, `assets/images/thumbs-up.png`);

  // listener for the loading complete event and switches to a scene
  this.load.on(`complete`, () => {
    this.scene.start(`play`);
  });
}

create() {

}

update() {

}
}
