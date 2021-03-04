class CanvasAndBg {
  constructor() {
    //canvas
    this.canvas_0 = createCanvas(1200, 800);
    // this.canvas_0 = {
    //   w: 1200,
    //   h: 800,
    //   x: 0,
    //   y: 0,
    // };
    this.canvas_1 = {
      w: 1000,
      h: 600,
      x: 100,
      y: 100,
    };
    this.canvas_2 = {
      w: 700,
      h: 500,
      x: 250,
      y: 150,
    };
    this.canvas_3 = {
      w: 400,
      h: 400,
      x: 400,
      y: 200,
    };
    // Background variables
    this.bgOrange = {
      r: 255,
      g: 153,
      b: 0,
    };
    this.bgOrangeLevel_1 = {
      r: 163,
      g: 98,
      b: 0,
    };
    this.bgTeal = {
      r: 1,
      g: 170,
      b: 166,
    };
    this.bgTealLevel_2 = {
      r: 1,
      g: 155,
      b: 133,
    };
    this.bgRed = {
      r: 94,
      g: 24,
      b: 0,
    };
    this.bgRedLevel_3 = {
      r: 61,
      g: 13,
      b: 0,
    };
  }

  canvasStart() {
    this.canvas_0;
  }

  tintBgOrange() {
    this.bgOrange.r += -1;
    this.bgOrange.g += -1;
    this.bgOrange.r = constrain(
      this.bgOrange.r,
      this.bgOrangeLevel_1.r,
      this.bgOrange.r
    );
    this.bgOrange.g = constrain(
      this.bgOrange.g,
      this.bgOrangeLevel_1.g,
      this.bgOrange.g
    );
  }

  tintBgTeal() {
    this.bgTeal.g += -1;
    this.bgTeal.b += -1;
    this.bgTeal.g = constrain(
      this.bgTeal.g,
      this.bgTealLevel_2.g,
      this.bgTeal.g
    );
    this.bgTeal.b = constrain(
      this.bgTeal.b,
      this.bgTealLevel_2.b,
      this.bgTeal.b
    );
  }

  tintBgRed() {
    this.bgRed.r += -1;
    this.bgRed.g += -1;
    this.bgRed.r = constrain(this.bgRed.r, this.bgRedLevel_3.r, this.bgRed.r);
    this.bgRed.g = constrain(this.bgRed.g, this.bgRedLevel_3.g, this.bgRed.g);
  }
}
