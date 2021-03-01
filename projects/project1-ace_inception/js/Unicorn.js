class Unicorn {
  constructor(image, graphics) {
    this.image = image;
    this.maxHeight = 90;
    this.alphaChange = -8;
    this.safeDist = 40;
    this.istouched = false;
    this.reset();
    // for Ace only
    this.offScreen = 50;
    this.isPaused = false;
    this.startTime = 0;
    this.timePassed = 0;
    // for random unicorns
    this.randomX = random(0, width);
    this.randomY = random(0, height);
    this.randomW = random(60, 120);
    this.randomH = random(48, 125);
    this.velX = 0;
    this.velY = 0;
    this.vSpeed = 0.5;
    this.jitterness = 0.01;
    this.switchedDirection = false;
  }

  move() {
    // update position with velocity and image size increase
    this.x += this.vx;
    this.y += this.vy;
    this.width += this.sizeIncrease / 2;
    this.height += this.sizeIncrease + (sin(frameCount / 5));
    this.tint += 2;

    // once image goes beyond 1/3 or 2/3 of window edges, then raise the image size and speed
    if (this.x < level_1Rect.width / 3 || this.x > level_1Rect.width / 3 * 2) {
      this.width += this.sizeIncrease * 20;
      this.height += this.sizeIncrease * 5;
      this.vx *= this.speed;
      this.vy += this.speed;
    }
    // if image stays within middle window zone, then it will go down
    if (this.x > level_1Rect.width / 3 * 2 || this.x < level_1Rect.width / 3 || this.height > this.maxHeight) {
      this.vy += 1;
      if (this.alpha > 0) {
        this.alpha += this.alphaChange;
      }
    }
  }

  moveRandom() {
    let r = random();
    if (r < this.jitterness) {
      this.velX = random(-this.vSpeed, this.vSpeed);
      this.velY = random(-this.vSpeed, this.vSpeed);
    }
    this.randomX = this.randomX + this.velX;
    this.randomY = this.randomY + this.velY;

    if (this.velX < 0) {
      this.switchedDirection = true;
    } else {
      this.switchedDirection = false;
    }
    // constrain to window
    if (this.randomX + this.randomW < 0) {
      this.velX = 1;
    } else if (this.randomX + this.randomW / 2 > width) {
      this.velX = -1;
    }
    this.randomY = constrain(this.randomY, 0 + this.offScreen, level_1Rect.height - this.offScreen);
  }

  // reset unicorn once it reaches window edge
  moveWrap() {
    if (this.x < 0 || this.x > level_1Rect.width || this.y > level_1Rect.height) {
      this.reset();
    }
  }

  // timer for unicronAce and resetting
  moveWrapAce() {
    if (this.x < -this.offScreen || this.x > level_1Rect.width + this.offScreen || this.y > level_1Rect.height + this.offScreen) {
      if (!this.isPaused) {
        this.isPaused = true; // pause
        this.startTime = millis(); // start time
        this.timePassed = 0;
      } else {
        // timer going
        this.timePassed = millis() - this.startTime;
        // if 10s - 20s has passed, then reset
        if (this.timePassed > random(10000, 20000)) {
          this.isPaused = false;
          this.reset();
        }
      }
    }
  }

  reset() {
    this.x = random((level_1Rect.width / 2 - 150), (level_1Rect.width / 2 + 110));
    this.y = level_1Rect.height / 2;
    this.width = random(5, 25);
    this.height = random(8, 33);
    this.tint = 100;
    this.alpha = 255;
    this.r = random(100);
    if (this.r > 40) {
      this.vx = 1.5;
    } else {
      this.vx = -1.5;
    }
    this.vy = 0;
    this.speed = 1.2;
    this.sizeIncrease = 0.8;
    this.istouched = false;
  }

  displayStatic() {
    push();
    imageMode(CENTER);
    translate(250 + sin(frameCount * 0.05), height / 2 + cos(frameCount * 0.05));
    fill(216);
    noStroke();
    ellipse(0, 0, 200);
    image(this.image, 0, 0);
    pop();
  }

  displayRandom() {
    level_1Rect.push();
    level_1Rect.imageMode(CENTER);
    level_1Rect.translate(this.randomX, this.randomY);
    if (this.switchedDirection) {
      level_1Rect.scale(-1, 1);
    };
    level_1Rect.image(this.image, 0, 0, this.randomW, this.randomH);
    level_1Rect.pop();
  }

  display() {
    level_1Rect.push();
    level_1Rect.imageMode(CENTER);
    level_1Rect.translate(this.x, this.y);
    if (this.x < level_1Rect.width / 2) {
      level_1Rect.scale(-1, 1);
    } // flip x axis if unicorn is on right side
    level_1Rect.tint(this.tint, this.alpha);
    level_1Rect.image(this.image, 0, 0, this.width, this.height);
    level_1Rect.pop();
  }
}
