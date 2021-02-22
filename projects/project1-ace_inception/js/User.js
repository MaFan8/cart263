class User {
  constructor(image) {
    this.image = image;
    this.x = 0;
    this.y = height - 190;
    this.displayX = 0;
    this.scale = 0.6;

    this.active = true;
  }

  update(prediction) {
    this.x = prediction.annotations.noseTip[0][0];
    this.displayX = width - this.x - 200; // flip horizontal
  }


  display() {
    push();
    imageMode(CENTER);
    translate(this.displayX, this.y);
    scale(this.scale);
    if (this.displayX > width / 2) {
      scale(-1, 1);
    } // filp user image if in right side of screen
    image(this.image, 0, 0);
    pop();
  }

  displayStatic() {
    push();
    imageMode(CENTER);
    translate(this.x + width/2, this.y);
    scale(this.scale);
    image(this.image, 0, 0);
    pop();
  }
}
