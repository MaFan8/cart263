class ImgBase {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.scale = 0.5;
    this.angle = 0;
  }

  move() {
    angleMode(DEGREES);
    this.angle += 0.5;
    if (this.angle >= 15) {
      this.angle = -15;
    }
  }

  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    scale(this.scale);
    image(this.image, 0, -50);
    pop();
  }

}
