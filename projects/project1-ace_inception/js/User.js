class User {
  constructor(image) {
    this.image = image;
    this.x = 0;
    this.y = height - 80;
    this.displayX = 0;

    this.active = true;
  }

  update(prediction) {
    this.x = prediction.annotations.noseTip[0][0];
    this.displayX = width - this.x; // flip horizontal
  }


  display() {
    push();
    imageMode(CENTER);
    translate(this.displayX, this.y);
    scale(0.7);
    if (this.displayX < width / 2) {
      scale(-1, 1);
    }
    image(this.image, 0, 0);
    pop();
  }

  displayStatic() {
    push();
    imageMode(CENTER);
    translate(width/2, this.y);
    scale(0.7);
    image(this.image, 0, 0);
    pop();
  }
}
