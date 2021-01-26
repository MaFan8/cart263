class Passage {
  constructor() {
    this.x = windowWidth / 2;
    this.y = 0;
    this.w = 5;
    this.h = 150;
    this.color = 0;
    this.entranceWidth = 100;
  }

  barriers(animal) {
    if (
      this.x < animal.x - animal.width / 2 &&
      this.x > animal.x + animal.width / 2 &&
      this.y < animal.y - animal.width / 2 &&
      this.y > animal.y + animal.width / 2
    ) {
      console.log(`stop`);
    }
  }

  display() {
    push();
    rectMode(CENTER);
    noStroke();
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
    pop();

    push();
    rectMode(CENTER);
    noStroke();
    fill(this.color);
    translate(this.entranceWidth, this.y);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}
