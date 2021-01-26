class Sheep extends Animal {
  constructor(x, y, image, width, height) {
    super(x, y, image, width, height);
    this.speed = 6;
  }

  handleInput() {
    if (keyIsDown(LEFT_ARROW)) {
      this.vx = -this.speed;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.vx = this.speed;
    } else {
      this.vx = 0;
    }

    if (keyIsDown(UP_ARROW)) {
      this.vy = -this.speed;
    } else if (keyIsDown(DOWN_ARROW)) {
      this.vy = this.speed;
    } else {
      this.vy = 0;
    }
  }

  moveWrap() {
    super.moveWrap();
  }

  update() {
    super.update();
  }
}
