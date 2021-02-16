class Unicorn {
  constructor(image) {
    this.x = random(0, width);
    this.y = random(0, height);
    this.image = image;
    this.width = random(30, 70);
    this.height = random(25, 50);
    this.angle = 0;

  }

  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    image(this.image, 0, 0, this.width, this.height);
    pop();
  }
}
