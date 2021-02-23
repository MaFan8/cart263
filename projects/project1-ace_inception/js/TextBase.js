class TextBase {
  constructor() {
    this.x = 100;
    this.y = 0;
    this.titleY = 80;
    this.sizeLg = 80;
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
    this.fill3 = {
      r: 6,
      g: 51,
      b: 68,
    };
    this.spacing = 30;
    this.LevelRectSpacing = 50;
    // main parameters
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    textFont(`monospace`);

    this.loading = `Loading...`;
    this.go = `Press "SPACE" to initiate dream!`;
    this.pause = `Press "SPACE" to start or pause.`;
    // start state text
    this.title = `ACE INCEPTION`;
    this.startInfo = `Ace doesn't sanction his pet Spike's love interest. Help infiltrate Ace's \nsubconsious and insert acceptance of Spike's and Fuzzy's love.`;
    this.startTips = `* In order to achieve inception, you MUST...\n  - Pass through Ace's 1st dream state.\n  - Establish inception in his 2nd state.\n  - Escape his subconsious by preforming \n    kicks in both states.\n  - If you die in a dream state, you will lost \n    in limbo.`;

    // level_1 state text
    this.level_1Title = `DREAM STATE #1`;
    this.level_1Tips = `Ace's subconsious detects a \nsecurity breach, you must avoid \nhis projections and capture Ace's spirit animal to induce him under a deeper dream state.`;
  }

  displayLoading() {
    push();
    fill(255 + sin(frameCount*0.05) * 128);
    textAlign(CENTER, CENTER);
    textSize(this.size);
    text(this.loading, width/2, height/1.5);
    pop();
  }

  displayGo() {
    push();
    fill(255 + sin(frameCount*0.1)*100);
    textAlign(CENTER, CENTER);
    textSize(this.size);
    text(this.go, width/2, height -150);
    pop();
  }

  displayPause() {
    push();
    fill(255 + sin(frameCount*0.05) *128);
    textAlign(CENTER, CENTER);
    textSize(this.size);
    text(this.pause, width/2, height/1.5);
    pop();
  }

  displayTitle() {
    push();
    fill(this.fill1.r + sin(frameCount*0.01) * 255, this.fill1.g, this.fill1.b);
    textSize(this.sizeLg);
    text(this.title, width/3, this.titleY, width);
    pop();
  }

  displayStartInfo() {
    push();
    fill(this.fill1.r, this.fill2.g, this.fill2.b);
    textSize(this.size);
    textAlign(LEFT, BASELINE);
    text(this.startInfo, width/3, this.titleY *2.5, width - width/2);
    pop();
  }

  displayStartTips() {
    push();
    fill(this.fill1.r, this.fill2.g -50, this.fill2.b -50);
    textSize(this.size -10);
    textAlign(LEFT, BASELINE);
    textLeading(this.spacing);
    text(this.startTips, width/2.5, this.titleY *5, width - width/2);
    pop();
  }

  displayLevel_1Title() {
    push();
    fill(this.fill3.r, this.fill3.g, this.fill3.b);
    textSize(this.sizeLg);
    textAlign(CENTER);
    text(this.level_1Title, width/2, height/5);
    pop();
  }

  displayLevel_1Tips() {
    push();
    fill(this.fill3.r, this.fill3.g, this.fill3.b);
    textSize(this.size);
    textAlign(LEFT, CENTER);
    text(this.level_1Tips, width/3, height/3, width - width/2.1);
    pop();
  }


}
