class Passage {
  constructor() {
    this.x = windowWidth / 2;
    this.y = 0;
    this.w = 100;
    this.h = 150;
    this.color = 0;
    this.stroke = {
      r: 92,
      g: 2,
      b: 102,
    };
    this.strokeWeight = 20;
  }

  display() {
    push();
    rectMode(CORNER);
    stroke(this.stroke.r, this.stroke.g, this.stroke.b);
    strokeWeight(this.strokeWeight);
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}
