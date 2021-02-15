class Head {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.scale = 0.5;
    this.bobbingX = sin(frameCount / 50) * 100;
    this.bobbingY = cos(frameCount / 50) * 10;
  }

  display() {
    push();
    imageMode(CENTER);
    scale(this.scale);
    translate(this.x, this.y);
    image(this.image, 0, 0);
    pop();
  }

}
