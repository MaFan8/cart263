class User {
  constructor(image, graphics) {
    this.image = image;
    this.x = level_1Rect.width / 2;
    this.y = level_1Rect.height - 60;
    this.displayX = 0;
    this.offest = 225;
    this.scale = 0.6;

    this.active = true;
    // poseNet
    this.wristLX;
    this.wristLY;
    this.wristRX;
    this.wristRY;
    this.poseDetect = true;
  }

  updateNose(pose) {
    this.displayX = poses[0].pose.nose.x;
    this.displayX += this.offest; // offset position of display X to middle of canvas
    // constrain to user to 3/4 of width
    this.displayX = constrain(this.displayX, level_1Rect.width / 4, level_1Rect.width / 4 * 3);
  }


  display() {
    level_1Rect.push();
    level_1Rect.imageMode(CENTER);
    level_1Rect.translate(this.displayX, this.y);
    level_1Rect.scale(this.scale);
    if (this.displayX > level_1Rect.width / 2) {
      level_1Rect.scale(-1, 1);
    } // filp image if in right side of screen
    level_1Rect.image(this.image, 0, 0);
    level_1Rect.pop();
  }

  displayStatic() {
    if (level_1Rect === undefined) {
      push();
      imageMode(CENTER);
      translate(this.x, this.y);
      scale(this.scale);
      image(this.image, 0, 0);
      pop();
    } else {
      level_1Rect.push();
      level_1Rect.imageMode(CENTER);
      level_1Rect.translate(this.x, this.y);
      level_1Rect.scale(this.scale);
      level_1Rect.image(this.image, 0, 0);
      level_1Rect.pop();
      imageMode(CORNER);
      image(level_1Rect, 100, 100);
    }
  }

  update(pose) {
    let wLX = poses[0].pose.leftWrist.x;
    let wLY = poses[0].pose.leftWrist.y;
    let wRX = poses[0].pose.rightWrist.x;
    let wRY = poses[0].pose.rightWrist.y;

    if (this.poseDetect) {
      this.wristLX = wLX;
      this.wristLY = wLY;
      this.wristRX = wRX;
      this.wristRY = wRY;
      this.poseDetect = false;
    } else {
      this.wristLX = lerp(this.wristLX, wLX, 0.5);
      this.wristLY = lerp(this.wristLY, wLY, 0.5);
      this.wristRX = lerp(this.wristRX, wRX, 0.5);
      this.wristRY = lerp(this.wristRY, wRY, 0.5);
    }
  }

}
