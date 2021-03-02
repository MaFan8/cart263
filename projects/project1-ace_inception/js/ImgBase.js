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
    this.add = false;
    this.subtract = false;

    // main parameters
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
    level_2Rect.push();
    level_2Rect.translate(this.x, this.y);
    level_2Rect.imageMode(CENTER);
    level_2Rect.tint(255, 60);
    level_2Rect.scale(this.scale);
    level_2Rect.image(this.image, 0, 0);
    level_2Rect.pop();
  }

  displayVault(user) {
    level_2Rect.push();
    level_2Rect.translate(this.x, this.y +this.reCenter);
    this.rotateSpeed += 0.02;
    if (user.wristLY < level_2Rect.height/2 && user.wristRY > level_2Rect.height/2) {
      level_2Rect.rotate(this.rotateSpeed);
      this.add = true;
    }
    else if (user.wristLY > level_2Rect.height/2 && user.wristRY < level_2Rect.height/2) {
      level_2Rect.rotate(-this.rotateSpeed);
      this.subtract = true;
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
    level_2Rect.push();
    level_2Rect.tint(255, 60);
    level_2Rect.imageMode(CORNER);
    level_2Rect.translate(video.width, 0);
    level_2Rect.scale(-1, 1);
    level_2Rect.image(video, -60, 0, level_2Rect.width + 20, level_2Rect.height);
    level_2Rect.pop();
  }

  displayFists(user) {
    level_2Rect.push();
    level_2Rect.translate(user.wristLX, user.wristLY - 100);
    level_2Rect.scale(this.scale);
    level_2Rect.image(this.image, 0,0);
    level_2Rect.pop();
    level_2Rect.push();
    level_2Rect.translate(user.wristRX, user.wristRY - 100);
    level_2Rect.scale(this.scale);
    level_2Rect.image(this.image, 0, 0);
    level_2Rect.pop();
  }

}
