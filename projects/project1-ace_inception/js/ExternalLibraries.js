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
    this.voiceInstruction;
    this.voiceDenied;
    this.voiceRetrieved;
    this.currentNameAnswer = ``;
    this.correct = true;
    this.passcode = ``;
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



  timedPrompt() {
    console.log(this);
    let  self =this;
    setTimeout(function(){console.log("here");console.log(self);self.speakNamePrompt(self);}, 2000);
  }
  speakNamePrompt(self) {
    console.log(self);
    let promptName = `Declare your name.`;
    responsiveVoice.speak(promptName, "US English Female", {
      pitch: 0,
      rate: 1,
      volume: 0.5,
      onstart: function() {
        self.voiceInstruction = promptName;
      },
      onend: // load Annyang
        function() {
          if (annyang) {
            let commands = {
              '*name': function(name){
                self.setName(name)},
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
    level_2Rect.text(this.voiceInstruction, level_2Rect.width / 2, level_2Rect.height - 200);
    level_2Rect.pop();
  }

  setName(name) {
  this.instructionSpoken = true;
  this.currentNameAnswer = name.toUpperCase();

  if (this.currentNameAnswer === `FUZZY'S`) {
    annyang.abort(); // stop Annyang
    this.speakRetrieved(self);
    // generate random passcode
    setTimeout(generatePasscode, 3000);
    this.currentNameAnswer = `FUZZY`;
    this.correct = true;
  } else {
    console.log("wrong");
    this.attemptsLeft -= 1;
    this.correct = false
  }
  if (this.attemptsLeft <= 0) {
    this.speakDenied(self);
    annyang.abort(); // stop Annyang
  }
}


  speakDenied(self) {
    let promptDenied = `PASSCODE RETRIEVAL DENIED`;
    responsiveVoice.speak(promptDenied, "US English Female", {
      pitch: 0,
      rate: 1,
      volume: 0.5,
      onstart: function() {
        // self.showDenied(promptDenied);
        // this.denied = promptDenied;
          self.voiceDenied = promptDenied;
      },
    });
  }

  showVoiceDenied() {
    // this.denied = promptDenied;
    level_2Rect.push();
    level_2Rect.fill(255);
    level_2Rect.textSize(25);
    level_2Rect.textFont(`courier`);
    level_2Rect.textAlign(CENTER, TOP);
    level_2Rect.text(this.voiceDenied, level_2Rect.width / 2, level_2Rect.height - 200);
    level_2Rect.pop();
  }

  speakRetrieved(self) {
    let promptRetrieved = `** IDENTITY VERIFIED... **\n *** PASSCODE RETRIEVED ***`;
    responsiveVoice.speak(promptRetrieved, "US English Female", {
      pitch: 0,
      rate: 1,
      volume: 0.5,
      onstart: function() {
          self.voiceRetrieved = promptRetrieved;
        // self.showRetrieved(promptRetrieved);
        // this.retrieved = promptRetrieved;
      },
    });
  }

  showVoiceRetrieved() {
    // this.retrieved = promptRetrieved;
    level_2Rect.push();
    level_2Rect.fill(255);
    level_2Rect.textSize(25);
    level_2Rect.textFont(`courier`);
    level_2Rect.textAlign(CENTER, TOP);
    level_2Rect.text(this.voiceRetrieved, level_2Rect.width / 2, level_2Rect.height - 200);
    level_2Rect.pop();
  }


  generatePasscode() {
    this.passcode = int(random(10, 1000000));
  }



}
