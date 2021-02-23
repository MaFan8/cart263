class Unicorn {
  constructor(image) {
    this.image = image;
    this.maxHeight = 90;
    this.alphaChange = -8;
    this.reset();
    // for Ace only
    this.offScreen = 50;
    this.isPaused = false;
    this.startTime = 0;
    this.timePassed = 0;
  }

  move() {
    // update position with velocity and image size increase
    this.x += this.vx;
    this.y += this.vy;
    this.width += this.sizeIncrease;
    this.height += this.sizeIncrease * 1.5;
    this.tint += 2;

    // once image goes beyond 1/3 or 2/3 of window edges, then raise the image size and speed
    if (this.x < width / 3 || this.x > width / 3 * 2) {
      this.width += this.sizeIncrease * 20;
      this.height += this.sizeIncrease * 5;
      this.vx *= this.speed;
      this.vy += this.speed;
    }
    // if image stays within middle window zone, then it will go down
    if (this.x > width / 3 * 2 || this.x < width / 3 || this.height > this.maxHeight) {
      this.vy += 1;
      if (this.alpha > 0) {
        this.alpha += this.alphaChange;
      }
    }
  }


  // reset unicorn once it reaches window edge
  moveWrap() {
    if (this.x < 0 || this.x > width || this.y > height) {
      this.reset();
    }
  }

  // timer for unicronAce and resetting
  moveWrapAce() {
    if (this.x < -this.offScreen || this.x > width +this.offScreen || this.y > height +this.offScreen) {
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
    this.x = random((width / 2 - 100), (width / 2 + 100));
    this.y = height /2;
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
    this.sizeIncrease = 0.4;
  }

  displayStatic() {
    push();
    imageMode(CENTER);
    translate(250 + sin(frameCount * 0.05), height/2 + cos(frameCount * 0.05));
    fill(216);
    noStroke();
    ellipse(0,0,200);
    image(this.image, 0, 0);
    pop();
  }

  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    if (this.x < width/2) {
      scale(-1,1);
    } // flip x axis if unicorn is on right side
    tint(this.tint, this.alpha);
    image(this.image, 0, 0, this.width, this.height);
    pop();
  }
}
