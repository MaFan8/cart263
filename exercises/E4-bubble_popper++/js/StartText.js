class StartText {
    constructor() {
      this.x = width/2;
      this.y = height/2;
      this.titleSize = 40;
      this.size = 25;
      this.fill = 128;
      this.fillRed = {
        r: 0,
        g: 0,
        b: 0,
      };

      this.title = `Bubble Popper++`
      this.text = `Cut the string with your index and middle finger.

      Blow the bubble and try to pop it by snapping when bubble overlaps the pop zone!`
      this.spaceText = `** Press space to start popping! **`
      this.ready = false;
      this.end = `WOO-HOO!`
    }

    displayTitle() {
      push();
      fill(this.fill);
      textSize(this.titleSize);
      textStyle(BOLD);
      textAlign(CENTER, TOP);
      text(this.title, this.x, 60);
      pop();
    }

    display() {
      push();
      fill(this.fill);
      textSize(this.size);
      textStyle(BOLD);
      textAlign(CENTER);
      text(this.text, 30, this.y/2 + 50, width -60, height);
      pop();
    }

    displaySpace() {
      push();
      fill(this.fillRed.r, this.fillRed.g, this.fillRed.b);
      textSize(this.size);
      textStyle(BOLD);
      textAlign(CENTER);
      text(this.spaceText, this.x, height - 100);
      pop();
    }

    displayEnd() {
      push();
      stroke(0);
      strokeWeight(2);
      fill(this.fill);
      textSize(this.titleSize);
      textStyle(BOLD);
      textAlign(CENTER, TOP);
      text(this.end, this.x, this.y);
      pop();
    }

}
