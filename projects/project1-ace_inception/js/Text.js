class Text {
  constructor() {
    this.x = width/2;
    this.y = height/2;
    this.font = `monospace`;
    this.sizeLg = 60;
    this.size = 32;
    this.fill = {
      r: 1,
      g: 170,
      b: 166,
    };

    this.title = `ACE INCEPTION`
  }

  title() {
    push();
    fill(this.fill.r, this.fill.g, this.fill.b);
    textFont(this.font);
    textSize(this.sizeLg);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text(this.title, this.x, this.y);
    pop();
  }

}
