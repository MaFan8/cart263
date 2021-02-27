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
    // vault
    this.rotateSpeed = 0;
    this.reCenter = 25;

    this.movePosition = 100;

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

  displayVaultStatic() {
    push();
    translate(this.x + 55, this.y - this.reCenter);
    imageMode(CORNER);
    tint(255, 80);
    scale(this.scale);
    image(this.image, 0, 0);
    pop();
  }

  displayVault(user) {
    level_2Rect.push();
    level_2Rect.translate(this.x, this.y +this.reCenter);
    this.rotateSpeed += 0.02;
    if (user.wristLY < height/2 && user.wristRY > height/2) {
      level_2Rect.rotate(this.rotateSpeed);
    } else if (user.wristLY > height/2 && user.wristRY < height/2) {
      level_2Rect.rotate(-this.rotateSpeed);
    }
    level_2Rect.imageMode(CENTER);
    level_2Rect.tint(255, 80);
    level_2Rect.scale(this.scale);
    level_2Rect.image(this.image, 0, -this.reCenter);
    level_2Rect.pop();
  }

  displayFistDiagram() {
    push();
    translate(this.x, this.y -80);
    imageMode(CORNER);
    scale(this.scale + sin(frameCount/20)*0.1);
    image(this.image, 0, 0);
    pop();
  }

  displayVideo() {
    push();
    tint(255, 80);
    translate(video.width, 0);
    scale(-1, 1);
    image(video, -310, 150, level_2Rect.width, level_2Rect.height);
    pop();
  }

  displayFists(user) {
    level_2Rect.push();
    level_2Rect.translate(user.wristLX, user.wristLY);
    level_2Rect.scale(-1, 1);
    level_2Rect.image(this.image, 0,0);
    level_2Rect.pop();
    level_2Rect.push();
    level_2Rect.scale(-1, 1);
    level_2Rect.image(this.image, user.wristRX, user.wristRY - user.movePosition);
    level_2Rect.pop();
  }

}
