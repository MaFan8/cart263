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
  }


    index() {
      this.indexTipX = prediction.annotations.indexFinger[3][0];
      this.indexTipY = prediction.annotations.indexFinger[3][1];
      this.indexBaseX = prediction.annotations.indexFinger[0][0];
      this.indexBaseX = prediction.annotations.indexFinger[0][1];
    }

    middleFinger() {
      this.middleTipX = prediction.annotations.middleFinger[3][0];
      this.middleTipY = prediction.annotations.middleFinger[3][1];
      this.middleBaseX = prediction.annotations.middleFinger[0][0];
      this.middleBaseY = prediction.annotations.middleFinger[0][1];
    }
  }
