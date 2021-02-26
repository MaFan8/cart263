class ImgBase {
  constructor(x, y, image, scale, graphics) {
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

  moveVault() {
    
  }

  displayVault() {
    level_2Rect.push();
    level_2Rect.imageMode(CENTER);
    level_2Rect.translate(this.x, this.y);
    level_2Rect.tint(255, 80);
    level_2Rect.scale(this.scale);
    level_2Rect.image(this.image, 0, 0);
    level_2Rect.pop();
  }

  displayVideo() {
    push();
    tint(255, 80);
    translate(video.width, 0);
    scale(-1, 1);
    image(video, -310, 150, level_2Rect.width, level_2Rect.height)
    pop();
  }


}
