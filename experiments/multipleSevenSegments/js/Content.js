class Content {
  constructor(input, x) {
    this.x = x;
    this.y = 25;
    this.number = input;
    this.spacing = 40;
    this.width = undefined;
    this.height = 25;
  }

  display() {
    this.width = textWidth(15);
    fill(0);
    rect(this.x, this.y - this.height / 2.5, this.width, this.height);
    fill(255);
    textSize(16);
    textAlign(LEFT, TOP);
    text(this.number, this.x + this.width / 4, this.y - this.height/6);
  }

}
