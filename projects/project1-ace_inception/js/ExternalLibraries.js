class ExternalLibraries {
  constructor() {
    this.name;
    this.instructionSpoken = false;
    this.voiceInstruction;
    this.voiceDenied;
    this.voiceRetrieved;
    this.currentNameAnswer = ``;
    this.attemptsLeft = 3;
    this.correct = true;
    this.passcodeSet = false;
    this.failed = false;
    this.passcode = ``;
    this.setSpoken = false;
  }

  // prompt set to start after 2s
  timedPrompt() {
    let self = this;
    setTimeout(function () {
      self.speakNamePrompt(self);
    }, 2000);
  }

  // Ask for NAME prompt and load Annyang onend
  speakNamePrompt(self) {
    let promptName = `Declare your name.`;
    responsiveVoice.speak(promptName, "US English Female", {
      pitch: 0,
      rate: 1,
      volume: 0.5,
      onstart: function () {
        self.voiceInstruction = promptName;
      },
      // load Annyang
      onend: function () {
        if (annyang) {
          let commands = {
            "*name": function (name) {
              self.setName(name);
            },
          };
          annyang.addCommands(commands);
          annyang.start();
        }
      },
    });
  }


  showVoiceInstruction() {
    level_2Rect.push();
    level_2Rect.fill(255);
    level_2Rect.textSize(25);
    level_2Rect.textFont(`courier`);
    level_2Rect.textAlign(CENTER, TOP);
    level_2Rect.text(
      this.voiceInstruction,
      level_2Rect.width / 2,
      level_2Rect.height - 200
    );
    level_2Rect.pop();
  }

  // set soken name to Annyang
  setName(name) {
    this.instructionSpoken = true;
    this.currentNameAnswer = name.toUpperCase(); // chang eto upperCase
    // if name spoken if right, then set speak confirmation and generate passcode
    if (this.currentNameAnswer === `FUZZY'S`) {
      annyang.abort(); // stop Annyang
      this.speakRetrieved(self);
      this.currentNameAnswer = `FUZZY`; // change display
      this.correct = true;
    }
    // else every wrong answer counts down from 3 attempts
    else {
      this.attemptsLeft -= 1;
      wrongAnswer.play(0,1.1, 0.8); // play wrongAnswer sound
      this.correct = false;
    }
    // speak Denied if there are no more attempts left
    if (this.attemptsLeft <= 0) {
      this.speakDenied(self);
      annyang.abort(); // stop Annyang
      limboSound.play(0,1.1, 0.8); // play limboSound
    }
  }

  // generate password
  generatePasscode() {
    if (this.correct) {
      this.passcode = int(random(10, 1000000));
      // this.passcode = `0`; // TESTING
      this.correct = false;
    }
    // console.log(this.passcode);
  }

  // display attempts makde
  displayAttempts() {
    level_2Rect.push();
    level_2Rect.fill(255);
    level_2Rect.textSize(15);
    level_2Rect.textAlign(CENTER, TOP);
    level_2Rect.text(
      `Attempts Left: ${this.attemptsLeft}`,
      level_2Rect.width / 2,
      level_2Rect.height - 220
    );
    level_2Rect.pop();
  }

  //  DENIED FUNCTIONS
  speakDenied(self) {
    let promptDenied = `PASSCODE RETRIEVAL DENIED`;
    responsiveVoice.speak(promptDenied, "US English Female", {
      pitch: 0,
      rate: 1,
      volume: 0.5,
      onstart: function () {
        self.voiceDenied = promptDenied;
      },
    });
  }

  showVoiceDenied() {
    level_2Rect.push();
    level_2Rect.fill(255);
    level_2Rect.textSize(25);
    level_2Rect.textFont(`courier`);
    level_2Rect.textAlign(CENTER, TOP);
    level_2Rect.text(
      self.voiceDenied,
      level_2Rect.width / 2,
      level_2Rect.height - 200
    );
    level_2Rect.pop();
  }
  // END DENIED FUNCTIONS

  // RETREIVED FUNCTIONS
  speakRetrieved(self) {
    let promptRetrieved = `** IDENTITY VERIFIED... **\n *** PASSCODE RETRIEVED ***`;
    responsiveVoice.speak(promptRetrieved, "US English Female", {
      pitch: 0,
      rate: 1,
      volume: 0.5,
      onstart: function () {
        self.voiceRetrieved = promptRetrieved;
      },
    });
  }

  showVoiceRetrieved() {
    level_2Rect.push();
    level_2Rect.fill(255);
    level_2Rect.textSize(25);
    level_2Rect.textFont(`courier`);
    level_2Rect.textAlign(CENTER, TOP);
    level_2Rect.text(
      self.voiceRetrieved,
      level_2Rect.width / 2,
      level_2Rect.height - 200
    );
    level_2Rect.pop();
  }
  // END RETREIVED FUNCTIONS

  // WELCOME FUNCTIONS
  speakWelcome() {
    let promptRetrieved = `WELCOME... FUZZY`;
    responsiveVoice.speak(promptRetrieved, "US English Female", {
      pitch: 0,
      rate: 1,
      volume: 0.5,
    });
  }
}
