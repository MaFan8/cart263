class Animal {
  constructor(x, y, image, width, height) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.width = width;
    this.height = height;

    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.acceleration = 0.05;
    this.speed = 0.5;
    this.maxSpeed = 1.5;
    this.change = 0.002;
    this.angle = 0;
    this.safeDist = 10;
  }

  checkProximity(sheep) {
    let d = dist(this.x, this.y, sheep.x, sheep.y);
    if (this.x > sheep.x + this.safeDist) {
      this.ax = this.acceleration;
    }
    if (this.x < sheep.x - this.safeDist) {
      this.ax = -this.acceleration;
    }
    if (this.y > sheep.y - this.safeDist) {
      this.ay = this.acceleration;
    }
    if (this.y < sheep.y - this.safeDist) {
      this.ay = -this.acceleration;
    }

    // update velocity to acceleration and constrain to maxSpeed
    this.vx += this.ax;
    this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);

    this.vy += this.ay;
    this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);
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
