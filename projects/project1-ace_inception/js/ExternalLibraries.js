class ExternalLibraries {
  constructor() {
    // // Posenet
    // this.videoImg;
    // this.video;
    // this.user;
    // this.poseNet;
    // this.pose;
    // this.poses = [];
    // this.loaded = false;

    // annyang
    this.name;

    //
    this.instructionSpoken = false;
    this.currentInstruction;
    this.currentNameAnswer = ``;
    this.correct = true;

  }

  // loadPosenet() {
  //     // start video and hide video element
  //     this.video = createCapture(VIDEO);
  //     this.video.hide();
  //     // get poses
  //     this.poseNet = ml5.poseNet(this.video, {
  //       flipHorizontal: true
  //     }, function() {
  //       console.log(`PoseNet loaded`);
  //       this.loaded = true;
  //     });
  //     // turn on poseNet
  //     this.poseNet.on('pose', function(results) {
  //       this.poses = results;
  //       // console.log(poses);
  //     });
  //   } // END POSENET

  setName(name) {
    this.instructionSpoken = true;
    this.currentNameAnswer = name.toUpperCase();

    if (this.currentNameAnswer === `FUZZY'S`) {
      annyang.abort(); // stop Annyang
      speakRetrieved();
      // generate random passcode
      setTimeout(generatePasscode, 3000);
      this.currentNameAnswer = `FUZZY`;

    } else {
      console.log("wrong");
      attemptsLeft -= 1;
    }
    if (attemptsLeft <= 0) {
      speakDenied();
      annyang.abort(); // stop Annyang

    }
  }

  timedPrompt() {
    setTimeout(this.speakNamePrompt, 2000);
  }

  speakNamePrompt() {
    let promptName = `Declare your name.`;
    responsiveVoice.speak(promptName, "US English Female", {
      pitch: 0,
      rate: 1,
      volume: 0.5,
      onstart: function() {
        // showSpeaking(promptName);
        this.currentInstruction = promptName;

        level_2Rect.push();
        level_2Rect.fill(255);
        level_2Rect.textSize(25);
        level_2Rect.textFont(`courier`);
        level_2Rect.textAlign(CENTER, TOP);
        level_2Rect.text(promptName, width / 2, height / 2);
        level_2Rect.pop();
      },
      onend: // load Annyang
        function() {
          if (annyang) {
            let commands = {
              '*name': this.setName,
            };
            annyang.addCommands(commands);
            annyang.start();
          }
        },
    });
  }

  // function showSpeaking(promptName) {
  //   currentInstruction = promptName;
  // }

  speakDenied() {
    let promptDenied = `PASSCODE RETRIEVAL DENIED`;
    responsiveVoice.speak(promptDenied, "US English Female", {
      pitch: 0,
      rate: 1,
      volume: 0.5,
      onstart: function() {
        // showSpeaking(promptDenied);
        this.denied = promptDenied;
      },
    });
  }

  // showSpeaking(promptDenied) {
  //   denied = promptDenied;
  // }

  speakRetrieved() {
    let promptRetrieved = `** IDENTITY VERIFIED... **\n *** PASSCODE RETRIEVED ***`;
    responsiveVoice.speak(promptRetrieved, "US English Female", {
      pitch: 0,
      rate: 1,
      volume: 0.5,
      onstart: function() {
        // showSpeaking(promptRetrieved);
        this.retrieved = promptRetrieved;
      },
    });
  }

  // showSpeaking(promptRetrieved) {
  //   retrieved = promptRetrieved;
  // }

  setName(name) {
  this.instructionSpoken = true;
  this.currentNameAnswer = name.toUpperCase();

  if (this.currentNameAnswer === `FUZZY'S`) {
    annyang.abort(); // stop Annyang
    speakRetrieved();
    // generate random passcode
    setTimeout(generatePasscode, 3000);
    this.currentNameAnswer = `FUZZY`;
    this.correct = true;
  } else {
    console.log("wrong");
    this.attemptsLeft -= 1;
  }
  if (this.attemptsLeft <= 0) {
    speakDenied();
    annyang.abort(); // stop Annyang
  }
}

  generatePasscode() {
    this.userAccount.passcode = int(random(10, 1000000));
  }



}
