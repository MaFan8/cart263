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

    this.bladeIndexTipX = undefined;
    this.bladeIndexTipY = undefined;
    this.bladeIndexBaseX = undefined;
    this.bladeIndexBaseY = undefined;
    this.bladeMiddleTipX = undefined;
    this.bladeMiddleTipY = undefined;
    this.bladeMiddleBaseX = undefined;
    this.bladeMiddleBaseY = undefined;

    this.predictionStart = true;
  }


    index(prediction) {
      this.indexTipX = prediction.annotations.indexFinger[3][0];
      this.indexTipY = prediction.annotations.indexFinger[3][1];
      this.indexBaseX = prediction.annotations.indexFinger[0][0];
      this.indexBaseX = prediction.annotations.indexFinger[0][1];
    }

    middleFinger(prediction) {
      this.middleTipX = prediction.annotations.middleFinger[3][0];
      this.middleTipY = prediction.annotations.middleFinger[3][1];
      this.middleBaseX = prediction.annotations.middleFinger[0][0];
      this.middleBaseY = prediction.annotations.middleFinger[0][1];
    }

    // checkScissorCut(bubble) {
    //   // check if scissors are between string length
    //   if (this.indexTipY > bubble.y + bubble.size / 2 &&
    //     this.middleTipY > bubble.y + bubble.size / 2) {
    //     // tips and bases of index finger surrounds bubble.x position
    //     if ((this.indexTipX > bubble.x + bubble.size / 2 && this.indexBaseX < bubble.x - bubble.size / 2) || (this.indexTipX < bubble.x - bubble.size / 2 &&
    //         this.indexBaseX > bubble.x + bubble.size / 2)) {
    //       // check if index + middle fingers are touching
    //       let d = dist(this.indexTipX, this.indexTipY, this.middleTipX, this.middleTipY);
    //       if (d < 25) {
    //         bubble.stringIsCut = true;
    //       }
    //     }
    //   }
    // }

    lerpFingers() {
      if (this.predictionStart === true) {
      this.bladeIndexTipX = this.indexTipX;
      this.bladeIndexTipY = this.indexTipY;
      this.bladeIndexBaseX = this.indexBaseX;
      this.bladeIndexBaseY = this.indexBaseY;

      this.bladeMiddleTipX = this.middleTipY;
      this.bladeMiddleTipY = this.middleTipY;
      this.bladeMiddleBaseX = this.middleBaseX;
      this.bladeMiddleBaseY = this.middleBaseY;

      this.predictionStart = false;
    }  else {
      this.bladeIndexTipX = lerp(this.bladeIndexTipX, this.indexTipX, 0.5);
      this.bladeIndexTipY = lerp(this.bladeIndexTipY, this.indexTipY, 0.5);
      this.bladeIndexBaseX = lerp(this.bladeIndexBaseX, this.indexBaseX, 0.5);
      this.bladeIndexBaseY = lerp(this.bladeIndexBaseY, this.indexBaseY, 0.5);

      this.bladeMiddleTipX = lerp(this.bladeMiddleTipX, this.middleTipX, 0.5);
      this.bladeMiddleTipY = lerp(this.bladeMiddleTipY, this.middleTipY, 0.5);
      this.bladeMiddleBaseX = lerp(this.bladeMiddleBaseX, this.middleBaseX, 0.5);
      this.bladeMiddleBaseY = lerp(this.bladeMiddleBaseY, this.middleBaseY, 0.5);
    }
  }

  displayScissors() {
    // check distance between tips and bases
    let tipDist = dist(this.bladeIndexTipX, this.bladeIndexTipY, this.bladeMiddleTipX, this.bladeMiddleTipY);
    let baseDist = dist(this.bladeIndexBaseX, this.bladeIndexBaseY, this.bladeMiddleBaseX, this.bladeMiddleBaseY);
    // blades of scissors
    push();
    noFill();
    stroke(255);
    strokeCap(ROUND);
    strokeWeight(5);
    line(this.bladeIndexTipX, this.bladeIndexTipY + tipDist / 2, this.bladeIndexBaseX, this.bladeIndexBaseY);
    line(this.bladeMiddleTipX, this.bladeMiddleTipY, this.bladeIndexBaseX, this.bladeIndexBaseY);
    pop();

    // hinge
    push();
    fill(255, 0, 0);
    ellipseMode(CENTER);
    ellipse(this.bladeIndexBaseX, this.bladeIndexBaseY, baseDist / 2);
    pop();
  }
  }
