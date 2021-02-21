class Unicorn {
  constructor(image) {
    this.image = image;
    this.maxHeight = 100;
    this.alphaChange = -8;
    this.safeDist = 80;
    this.reset();
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
      this.width += this.sizeIncrease * 30;
      this.height += this.sizeIncrease * 10;
      this.vx *= this.speed;
    }
    // if image stays within middle window zone, then it will go down
    if (this.x > width / 3 * 2 || this.x < width / 3 || this.height > this.maxHeight) {
      this.vy += 1;
      if (this.alpha > 0) {
        this.alpha += this.alphaChange;
      }
    }
  }

  // check if unicorn touches user
  checkTouch(user) {
    let d = dist(this.x, this.y, user.x, user.y);
    if (d < this.safeDist) {
      state = `limbo`;
    }
  }


  // reset unicorn once it reaches window edge
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
    this.tint = 100;
    this.alpha = 255;
    this.r = random(100);
    if(this.r > 40){
      this.vx =1.5;
    }
    else{
      this.vx = -1.5;
    }
    this.vy = 0;
    this.speed = 1.2;
    this.sizeIncrease = 0.4;
  }

  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    tint(this.tint, this.alpha);
    image(this.image, 0, 0, this.width, this.height);
    pop();
  }
}
