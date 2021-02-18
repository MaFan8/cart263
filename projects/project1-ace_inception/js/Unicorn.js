class Unicorn {
  constructor(image) {
    this.x = random((width/2 -100), (width/2 +100));
    this.y = height/2;
    this.image = image;
    this.width = random(15,30);
    this.height = random(10,25);
    this.vx = random(-1,1);
    this.vy = 0;
    this.speed = 1.2;
    this.sizeIncrease = 0.3;
  }

  move() {
    // update position with velocity and image size increase
    this.x += this.vx;
    this.y += this.vy;
    this.width += this.sizeIncrease;
    this.height += this.sizeIncrease;

    // once image goes beyond 1/5 of window edges, then raise the image size and speed
    if (this.x < width/5|| this.x > width/5 *4 || this.width > 50) {
      this.width += this.sizeIncrease *2;
      this.height += this.sizeIncrease/2;
      this.vx *= this.speed;
    }


    // if (this.x === width/2) {
    //   this.width += this.sizeIncrease/4;
    //   this.height += this.sizeIncrease/2;
    //   this.vy += 0.1;
    //   if (this.height > 80) {
    //     this.reset();
    //   }
    // }
    }

  moveWrap() {
    if (this.x < 0 || this.x > width) {
      this.reset();
    }
  }

  reset() {
      this.x = random((width/2 -100), (width/2 +100));
      this.y = height/2;
      this.width = random(15,30);
      this.height = random(10,25)
      this.vx = random(-1,1);
      this.vy = 0;
  }

  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    image(this.image, 0, 0, this.width, this.height);
    pop();
  }
}
