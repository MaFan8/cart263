class ImgBase {
  constructor(x, y, image, scale) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.scale = scale;
    this.angle = 0;
    this.angleSpeed = 0.05;
    // heart
    this.stroke = (255);
    this.thickness = (10);

    imageMode(CENTER);
  }

  move() {
    angleMode(DEGREES);
    this.angle += this.angleSpeed;
    if (this.angle >= 10) {
      this.angle = -8;
    } else {
      this.angleSpeed
    }
  }

  displayHeart() {
    push();
    translate(this.x, this.y);
    scale(this.scale + sin(frameCount)*0.2);
    image(this.image, 0, 0);
    pop();
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    scale(this.scale);
    image(this.image, 0, 0);
    pop();
  }

}
