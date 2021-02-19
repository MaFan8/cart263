class Unicorn {
  constructor(image) {
    this.x = random((width / 2 - 100), (width / 2 + 100));
    this.y = height / 2;
    this.image = image;
    this.width = random(5,25);
    this.height = random(8,33);
    this.vx = random(-2, 2);
    this.vy = 0;
    this.speed = 1.2;
    this.sizeIncrease = 0.4;
  }

  move() {
    // update position with velocity and image size increase
    this.x += this.vx;
    this.y += this.vy;
    this.width += this.sizeIncrease;
    this.height += this.sizeIncrease * 2;

    // once image goes beyond 1/5 of window edges, then raise the image size and speed
    if (this.x < width / 3 || this.x > width / 3 * 2) {
      this.width += this.sizeIncrease * 2;
      this.height += this.sizeIncrease * 15;
      this.vx *= this.speed;
      // tint(255, 100);
    }

    // if image stays within middle window zone, then it will go down
    if (this.x > width / 5 * 4 || this.x < width / 5 || this.height > 200) {
      this.vy += 1;
    }
  }

  moveWrap() {
    if (this.x < 0 || this.x > width || this.y > height) {
      this.reset();
    }
  }

  reset() {
    this.x = random((width / 2 - 100), (width / 2 + 100));
    this.y = height / 2;
    this.width = random(5,25);
    this.height = random(8,33);
    this.vx = random(-1, 1);
    this.vy = 0;
    tint(255, 255);
  }

  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    image(this.image, 0, 0, this.width, this.height);
    pop();
  }
}
