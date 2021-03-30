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
  this.load.spritesheet('mummy', 'assets/images/mummy37x45.png', { frameWidth: 37, frameHeight: 45 });

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
