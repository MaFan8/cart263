class Head {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.image = image;

    this.scale = 0.5;
  }

display() {
  push();
  imageMode(CENTER);
  translate(this.x, this.y);
  image(this.image, 0, 0);
  pop();
}

}
