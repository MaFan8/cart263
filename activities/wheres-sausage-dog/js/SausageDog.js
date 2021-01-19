class SausageDog extends Animal {
  // inherits from animal class
  constructor(x, y, image) {
    super(x, y, image); // calls Animal's constructor

    this.found = false;
    this.rotationSpeed = 0.25;
  }

  update() {
    super.update();
    if (this.found) {
      this.angle += this.rotationSpeed;
    }
  }

  mousePressed() {
    //center positon minus half the width will give us the left edge (then right edge, top, bottom) WILL NOT WORK IF IMAGE IS SCALED
    if (
      mouseX > this.x - this.image.width / 2 &&
      mouseX < this.x + this.image.width / 2 &&
      mouseY > this.y - this.image.height / 2 &&
      mouseY < this.y + this.image.height / 2
    ) {
      this.found = true;
    }
  }
}
