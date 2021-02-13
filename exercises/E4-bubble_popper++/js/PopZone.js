class PopZone extends Bubble{
  constructor() {
    super();
    this.size = 140;
    this.text = ``;
  }

  reset() {
    let d = dist(super.x, super.y, this.x, this.y);
    if (d < bubble.size / 2 + popZone.size / 2) {
      this.x = random(100, width - 100);
      this.y = random(100, height - 100);
    }
  }

  display() {
    push();
    noFill();
    stroke(128)
    ellipse(super.x, super.y, this.size);
    pop();
  }

  displayText() {
    push();
    fill(255);
    textAlign(CENTER);
    textSize(150);
    text(`*`, super.x, super.y + 80);
    pop();
  }



}
