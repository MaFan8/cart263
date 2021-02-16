class Blade {
  constructor() {
    this.indexTipX = undefined;
    this.indexTipY = undefined;
    this.indexBaseX = undefined;
    this.indexBaseY = undefined;
    this.middleTipX = undefined;
    this.middleTipY = undefined;
    this.middleBaseX = undefined;
    this.middleBaseY = undefined;

    this.scissorIndexTipX = undefined;
    this.scissorIndexTipY = undefined;
    this.scissorIndexBaseX = undefined;
    this.scissorIndexBaseY = undefined;
    this.scissorMiddleTipX = undefined;
    this.scissorMiddleTipY = undefined;
    this.scissorMiddleBaseX = undefined;
    this.scissorMiddleBaseY = undefined;

    this.predictionStart = true;
  }


    index(prediction) {
      this.indexTipX = prediction.annotations.indexFinger[3][0];
      this.indexTipY = prediction.annotations.indexFinger[3][1];
      this.indexBaseX = prediction.annotations.indexFinger[0][0];
      this.indexBaseY = prediction.annotations.indexFinger[0][1];
    }

    middleFinger(prediction) {
      this.middleTipX = prediction.annotations.middleFinger[3][0];
      this.middleTipY = prediction.annotations.middleFinger[3][1];
      this.middleBaseX = prediction.annotations.middleFinger[0][0];
      this.middleBaseY = prediction.annotations.middleFinger[0][1];
    }


    lerpFingers() {
      if (this.predictionStart === true) {
      this.scissorIndexTipX = this.indexTipX;
      this.scissorIndexTipY = this.indexTipY;
      this.scissorIndexBaseX = this.indexBaseX;
      this.scissorIndexBaseY = this.indexBaseY;

      this.scissorMiddleTipX = this.middleTipX;
      this.scissorMiddleTipY = this.middleTipY;
      this.scissorMiddleBaseX = this.middleBaseX;
      this.scissorMiddleBaseY = this.middleBaseY;

      this.predictionStart = false;
    }  else {
      this.scissorIndexTipX = lerp(this.scissorIndexTipX, this.indexTipX, 0.5);
      this.scissorIndexTipY = lerp(this.scissorIndexTipY, this.indexTipY, 0.5);
      this.scissorIndexBaseX = lerp(this.scissorIndexBaseX, this.indexBaseX, 0.5);
      this.scissorIndexBaseY = lerp(this.scissorIndexBaseY, this.indexBaseY, 0.5);

      this.scissorMiddleTipX = lerp(this.scissorMiddleTipX, this.middleTipX, 0.5);
      this.scissorMiddleTipY = lerp(this.scissorMiddleTipY, this.middleTipY, 0.5);
      this.scissorMiddleBaseX = lerp(this.scissorMiddleBaseX, this.middleBaseX, 0.5);
      this.scissorMiddleBaseY = lerp(this.scissorMiddleBaseY, this.middleBaseY, 0.5);
    }
  }

  displayScissors() {
    // check distance between tips and bases
    let tipDist = dist(this.scissorIndexTipX, this.scissorIndexTipY, this.scissorMiddleTipX, this.scissorMiddleTipY);
    let baseDist = dist(this.scissorIndexBaseX, this.scissorIndexBaseY, this.scissorMiddleBaseX, this.scissorMiddleBaseY);
    // blades of scissors
    push();
    noFill();
    stroke(255);
    strokeCap(ROUND);
    strokeWeight(5);
    line(this.scissorIndexTipX, this.scissorIndexTipY + tipDist/2, this.scissorIndexBaseX, this.scissorIndexBaseY);
    line(this.scissorMiddleTipX, this.scissorMiddleTipY, this.scissorIndexBaseX, this.scissorIndexBaseY);
    pop();

    // hinge
    push();
    fill(255, 0, 0);
    ellipseMode(CENTER);
    ellipse(this.scissorIndexBaseX, this.scissorIndexBaseY, baseDist / 2);
    pop();
  }
  }
