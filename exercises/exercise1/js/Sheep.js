class Sheep extends Animal {
  constructor(x, y, image, width, height) {
    super(x, y, image, width, height);
    this.x = windowWidth / 2;
    this.y = windowHeight / 2;
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
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    if (keyIsDown(RIGHT_ARROW)) {
      scale(-1, 1);
    }
    image(this.image, 0, 0, this.width, this.height);
    pop();
  }
}
