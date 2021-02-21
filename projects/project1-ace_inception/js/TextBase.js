class TextBase {
  constructor() {
    this.x = 100;
    this.y = 0;
    this.titleY = 100;
    this.sizeLg = 60;
    this.size = 30;
    this.fill1 = {
      r: 1,
      g: 170,
      b: 166
    };
    this.fill2 = {
      g: 120,
      b: 166
    };
    this.spacing = 30;
    // main parameters
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    textFont(`monospace`);

    this.go = `Press "SPACE" to initiate dream!`

    this.title = `ACE INCEPTION`
    this.startInfo = `Ace doesn't sanction his pet Spike's love interest. Help infiltrate Ace's \nsubconsious and insert acceptance of Spike's and Fuzzy's love.`
    this.startTips = `* Inorder to achieve inception, you MUST...\n  - Pass through Ace's 1st dream state.\n  - Establish inception in his 2nd state.\n  - Escape his subconsious by preforming \n     kicks in both states.\n  - If you die in a dream state, you will lost in limbo.`



    // You must avoid Ace's projections and \n    capture Ace to put him under a deeper \ndream state. \n  -
  }

  displayTitle() {
    push();
    fill(this.fill1.r + sin(frameCount*0.01) * 255, this.fill1.g, this.fill1.b);
    textSize(this.sizeLg);
    text(this.title, 0, this.titleY, width);
    pop();
  }

  displayStartInfo() {
    push();
    fill(this.fill1.r, this.fill2.g, this.fill2.b);
    textSize(this.size);
    textAlign(LEFT, BASELINE);
    text(this.startInfo, width/2.5, this.titleY *2, width - width/2);
    pop();
  }

  displayStartTips() {
    push();
    fill(this.fill1.r, this.fill2.g -50, this.fill2.b -50);
    textFont(`Helvetica`);
    textSize(this.size -10);
    textAlign(LEFT, BASELINE);
    textLeading(this.spacing);
    text(this.startTips, width/2.5, this.titleY *4, width - width/2);
    pop();
  }

  displayGo() {
    push();
    fill(0 + sin(frameCount*0.01) * 128);
    textAlign(CENTER, CENTER);
    textSize(this.size);
    text(this.go, width/2, height -50);
    pop();
  }

}
