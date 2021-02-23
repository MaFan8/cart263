class User {
  constructor(image) {
    this.image = image;
    this.x = width/2;
    this.y = height - 265;
    this.displayX = 0;
    this.scale = 0.6;

    this.active = true;
  }

  update(prediction) {
    this.x = prediction.annotations.noseTip[0][0];
    this.displayX = width - this.x - 200; // flip horizontal
  }


  display() {
    level_1Rect.push();
    level_1Rect.imageMode(CENTER);
    level_1Rect.translate(this.displayX, this.y);
    level_1Rect.scale(this.scale);
    if (this.displayX > width / 2) {
      level_1Rect.scale(-1, 1);
    } // filp user image if in right side of screen
    level_1Rect.image(this.image, 0, 0);
    level_1Rect.pop();
    imageMode(CORNER);
    image(level_1Rect,100,100);
  }

  displayStatic() {
    if (level_1Rect === undefined) {
      push();
      imageMode(CENTER);
      translate(this.x - 100, this.y);
      scale(this.scale);
      image(this.image, 0, 0);
      pop();
    }
     else {
      level_1Rect.push();
      level_1Rect.imageMode(CENTER);
      level_1Rect.translate(this.x - 100, this.y);
      level_1Rect.scale(this.scale);
      level_1Rect.image(this.image, 0, 0);
      level_1Rect.pop();
      imageMode(CORNER);
      image(level_1Rect,100,100);
    }
  }
}
