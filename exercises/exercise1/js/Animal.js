class Animal {
  constructor(x, y, image, width, height) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.width = width;
    this.height = height;

    this.vx = 0;
    this.vy = 0;
    this.speed = 0.8;
    this.change = 0.1;
    this.angle = 0;
    this.safeDist = 100;

    this.active = true;
  }

  barriers(passage) {
    if (
      this.x > passage.x &&
      this.x < passage.x + passage.w &&
      this.y > passage.y &&
      this.y < passage.y + passage.h
    ) {
      this.active = false;
    }
  }

  checkProximity(sheep) {
    let d = dist(this.x, this.y, sheep.x, sheep.y);
    if (d < this.safeDist) {
      this.vx = sheep.vx * 1.2;
      this.vy = sheep.vy * 1.2;
    } else {
      this.moveRandom();
    }
  }

  moveRandom() {
    // change movment to random direction
    let r = random(0, 2);
    if (r < this.change) {
      this.vx = random(-this.speed, this.speed);
      this.vy = random(-this.speed, this.speed);
    }
  }

  moveWrap() {
    // update movement to its velocity
    this.x += this.vx;
    this.y += this.vy;

    // constrain to window
    this.x = constrain(
      this.x,
      0 + this.width / 2,
      windowWidth - this.width / 2
    );
    this.y = constrain(
      this.y,
      0 + this.height / 2,
      windowHeight - this.height / 2
    );
  }

  update() {
    this.display();
  }

  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    image(this.image, 0, 0, this.width, this.height);
    pop();
  }
}
