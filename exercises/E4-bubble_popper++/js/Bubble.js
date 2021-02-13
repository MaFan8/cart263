class Bubble {
  constructor() {
    this.x = random(100, width - 100);
    this.y = random(height / 3, height / 2);
    this.size = random (50,80);
    this.vx = random(-1, 1);
    this.vy = -0.5;
    this.change =  0.02;
    this.speed =  0.5;

    this.popped = false;

    //string
    this.fill = 255;
    this.width = 1;
    this.height = height;

    this.stringIsCut = false;
  }

  checkBounceOffWalls() {
    if (this.x + this.size / 2 > width) {
      this.vx = -this.vx;
    }
    if (this.x - this.size / 2 < 0) {
      this.vx = + this.speed;
    }
    if (this.y + this.size / 2 > height) {
      this.vy = -this.vy;
    }
    if (this.y - this.size / 2 < 0) {
      this.vy = + this.speed;
    }
  }

  blow() {
    this.vx += random(0, 1);
    this.vy += random(0, 1);
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  displayString() {
    push();
    noStroke();
    fill(this.fill);
    rectMode(CORNER);
    rect(this.x + sin(frameCount / 10), this.y, this.width, this.height);
    pop();
  }

  display() {
    push();
    fill(0, 100, 200);
    noStroke();
    ellipse(this.x, this.y, this.size + sin(frameCount / 5),
      this.size + cos(frameCount / 5));
    pop();
  }
}
