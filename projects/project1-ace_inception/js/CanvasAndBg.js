class CanvasAndBg {
  constructor() {
    //canvas
    this.canvas_0 =   createCanvas(1200, 800);
    this.canvas_1 = {
      w: 1000,
      h: 600,
    };
    this.canvas_2 = {
      w: 700,
      h: 500,
    };
    // Background variables
    this.bgOrange = background(255, 153, 0);
    // this.bgTeal = background(1, 170, 166);
    this.bgTeal = {
      r: 1,
      g: 170,
      b: 166,
    };
    this.bgRed = {
      r: 94,
      g: 24,
      b: 0,
    };
  }

  canvasStart() {
    this.canvas_0;
  }


}
