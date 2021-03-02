class TextBase {
  constructor() {
    this.x = 100;
    this.y = 0;
    this.titleY = 80;
    this.sizeLg = 80;
    this.sizeMd = 60;
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
    this.fill4 = {
      r: 81,
      g: 141,
      b: 173,
    };
    this.spacing = 30;
    this.LevelRectSpacing = 50;
    this.attemptsLeft = 3;
    this.denied;
    this.retreived;

    // ALL TEXT
    this.loading = `Loading...`;
    this.go = `Press "SPACE" to initiate dream!`;
    this.pause = `Press "SPACE" to start or pause.`;
    // start state text
    this.title = `ACE INCEPTION`;
    this.startInfo = `Ace doesn't sanction his pet Spike's\nlove interest. Help infiltrate Ace's\nsubconsious and implant acceptance of Spike's and Fuzzy's love.`;
    this.startTips = `* In order to achieve inception, you MUST...\n  1. Pass through Ace's 1st dream state.\n  2. Establish inception as Fuzzy in his 2nd state.\n  3. Escape his subconsious by preforming \n    kicks in both states.\n  ** If you die in a dream state, you will lost \n     in limbo.`;

    // level_1 text
    this.level_1Title = `INITIAL DREAM STATE`;
    this.level_1Tips = `Ace's subconsious detects a \nsecurity breach, you must avoid \nhis projections and capture Ace's spirit animal to induce him under a deeper dream state.`;

    // level_2 text
    this.level_2Title = `FINAL DREAM STATE`;
    this.level_2Tips = `Unlocking the vault will allow you to implant your\nidea. Retrieve your code (AS THE APLACE) and access \nthe vault by entering the code combination.\n\nMove hands up/down counter to eachother to turn the dail. Hand detection works best when elbows are \ndisplayed on screen.`
    this.userAccount = {
      name: ``,
      passcode: ``,
    };
    this.currentNameAnswer = ``;
    this.timer = 5;

    // Vault numbers
    this.sourceText = "0123456789";
    this.curIndex = 0;
    this.set = false;
    this.textString = undefined;
    this.stringTest = undefined;
    this.hint = `** Press "ENTER" to input code BACKWARDS!! ** `
    // END TEXT

    // main parameters
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    textFont(`monospace`);
  }

  // START FUNCTIONS
  displayLoading() {
    push();
    fill(255 + sin(frameCount * 0.05) * 128);
    textAlign(CENTER, CENTER);
    textSize(this.size);
    text(this.loading, width / 2, height / 1.5);
    pop();
  }

  displayGo() {
    push();
    fill(255 + sin(frameCount * 0.1) * 100);
    textAlign(CENTER, CENTER);
    textSize(this.size);
    text(this.go, width / 2, height - 150);
    pop();
  }

  displayPause() {
    push();
    fill(255 + sin(frameCount * 0.05) * 128);
    textAlign(CENTER, CENTER);
    textSize(this.size);
    text(this.pause, width / 2, height / 1.5);
    pop();
  }

  displayTitle() {
    push();
    fill(this.fill1.r + sin(frameCount * 0.01) * 255, this.fill1.g, this.fill1.b);
    textSize(this.sizeLg);
    text(this.title, width / 3, this.titleY, width);
    pop();
  }

  displayStartInfo() {
    push();
    fill(this.fill1.r, this.fill2.g, this.fill2.b);
    textSize(this.size);
    textAlign(LEFT, BASELINE);
    text(this.startInfo, width / 3, this.titleY * 2, width - width / 2.3);
    pop();
  }

  displayStartTips() {
    push();
    fill(this.fill1.r, this.fill2.g - 50, this.fill2.b - 50);
    textSize(this.size - 10);
    textAlign(LEFT, BASELINE);
    textLeading(this.spacing);
    text(this.startTips, width / 2.5, this.titleY * 4.5, width - width / 2.5);
    pop();
  }
  // END START FUNCTIONS

  // LEVEL_1 FUNCTIONS
  displayLevel_1Title() {
    push();
    fill(this.fill3.r + sin(frameCount * 0.01) * 255, this.fill3.g, this.fill3.b);
    textSize(this.sizeLg);
    textAlign(CENTER);
    text(this.level_1Title, width / 2, height / 5);
    pop();
  }

  displayLevel_1Tips() {
    push();
    fill(this.fill3.r, this.fill3.g, this.fill3.b);
    textSize(this.size);
    textAlign(LEFT, CENTER);
    text(this.level_1Tips, width / 3, height / 3, width - width / 2.1);
    pop();
  }
  // END LEVEL_1 FUNTIONS

  // LEVEL_2 FUNCTIONS
  displayLevel_2Title() {
    push();
    fill(this.fill4.r + sin(frameCount * 0.01) * 255, this.fill4.g, this.fill4.b);
    textSize(this.sizeMd);
    textAlign(CENTER);
    text(this.level_2Title, width / 2, height / 5);
    pop();
  }

  displayLevel_2Tips() {
    push();
    fill(this.fill4.r, this.fill4.g, this.fill4.b);
    textSize(this.size - 10);
    textAlign(LEFT, CENTER);
    text(this.level_2Tips, width / 4, height / 3, width - width / 2.1);
    pop();
  }

  vaultMoniter(extLibrary) {
    let account = `<< RETRIEVE YOUR ACCOUNT >>

  Name: ${extLibrary.currentNameAnswer}
  Passcode: ${extLibrary.passcode}`

    level_2Rect.push();
    level_2Rect.fill(50, 50, 50, 80);
    level_2Rect.rectMode(CENTER);
    level_2Rect.rect(level_2Rect.width / 2, level_2Rect.height / 2, level_2Rect.width - 100, level_2Rect.height - 100);
    level_2Rect.pop();
    level_2Rect.push();
    level_2Rect.textSize(this.size);
    level_2Rect.textFont(`courier`);
    level_2Rect.textAlign(LEFT);
    level_2Rect.fill(255, 182, 0);
    level_2Rect.text(account, level_2Rect.width / 10, level_2Rect.height / 4);
    level_2Rect.pop();
  }
  updateTimer(counter) {
    this.timer = counter;

  }

  displayLevel_2Timer() {
    level_2Rect.push();
    level_2Rect.textSize(this.size);
    level_2Rect.textFont(`courier`);
    // level_2Rect.textAlign(LEFT);
    level_2Rect.fill(0);
    level_2Rect.text(this.timer, level_2Rect.width / 10, level_2Rect.height / 4);
    // if (frameCount % 60 == 0 && this.timer > 0) {
    //   this.timer--;
    // }
    level_2Rect.pop();

  }

  displayNumber() {
    level_2Rect.push();
    level_2Rect.fill(0);
    level_2Rect.rectMode(CENTER);
    level_2Rect.rect(level_2Rect.width / 2, level_2Rect.height - 65, level_2Rect.width /2, 50);
    level_2Rect.pop();
    level_2Rect.fill(255);
    level_2Rect.textFont(`monospace`);
    level_2Rect.textSize(50);
    level_2Rect.textAlign(CENTER, RIGHT);
    level_2Rect.text(this.sourceText.substring(this.curIndex, this.curIndex + 1),level_2Rect.width / 2, level_2Rect.height / 2);
    level_2Rect.push();
    level_2Rect.fill(200);
    level_2Rect.textSize(20);
    level_2Rect.text(this.hint ,level_2Rect.width / 2, level_2Rect.height - 10);
    level_2Rect.pop();

    if (this.curIndex > this.sourceText.length - 1) {
      this.curIndex = 0;
    }
    if (this.curIndex < 0) {
      this.curIndex = 9;
    }
    if (this.set) {
      // to display numbers in string
      this.textString = ``;
      for (let i = chosenNumbers.length - 1; i >= 0; i--) {
        this.textString += chosenNumbers[i];
        this.textString += ` `;
      }
      // to Check numbers in string
      this.stringTest = ``;
      for (let i = chosenNumbers.length - 1; i >= 0; i--) {
        this.stringTest += chosenNumbers[i];
      }
      console.log(this.stringTest);
      level_2Rect.textFont(`courier`);
      level_2Rect.textSize(40);
      level_2Rect.text(this.textString, level_2Rect.width / 2, level_2Rect.height - 50);
    }
  }




  // END LEVEL_2 FUNCTIONS

  displayAttempts() {
    level_1Rect.push();
    level_1Rect.fill(0);
    level_1Rect.textFont(`monospace`);
    level_1Rect.textSize(this.size);
    level_1Rect.text(`Attempts Left: ${this.attemptsLeft}`, 100, 50);
    level_1Rect.pop();
  }

}
