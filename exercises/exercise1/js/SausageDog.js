class SausageDog extends Animal {
  constructor(x, y, image, width, height) {
    super(x, y, image, width, height);
    this.vx = 3;
    this.vy = 3;
    this.safeDist = 20;

    this.active = true;
  }

  checkTouch(sheep) {
    let d = dist(this.x, this.y, sheep.x, sheep.y);
    if (d < this.safeDist) {
      this.active = false;
    }
  }

  barriers(passage) {
    super.barriers(passage);
  }

  moveRandom() {
    super.moveRandom();
  }

  moveWrap() {
    super.moveWrap();
  }

  update() {
    super.update();
  }
}
