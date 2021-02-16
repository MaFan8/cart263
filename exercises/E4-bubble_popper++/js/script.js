"use strict";

/**
Bubble Popper++
Maple Sung

Use hand to cut the ballon free, blow it around until it reaches the pop zone where user snaps to pop the bubble.

References:
Based on Pippin Barr's Bubble Popper
https://github.com/pippinbarr/cart263-2021/tree/main/examples/ai/bubble-popper/

Uses:
ml5.js Handpose
https://learn.ml5js.org/#/reference/handpose
Teachable Machine - Sound Classification
https://teachablemachine.withgoogle.com/
Pop soundModel
https://freesound.org/people/deraj/sounds/202230/

*/

let state = `start`; // start, running, end

let video = undefined;
let modelName = `Handpose`;
let handpose = undefined;

let classifier;
let soundModel =
  `https://teachablemachine.withgoogle.com/models/2msNc-lvl/model.json`;
let option = {
  probabilityThreashold: 0.7
};
let label = undefined;
let popSound;

let startText;
let bubble;
let popZone;

let predictions = [];
let scissorShow = true;

let blade;
// let bladeIndex = {
//   tip: {
//     x: undefined,
//     y: undefined
//   },
//   base: {
//     x: undefined,
//     y: undefined,
//   }
// };
// let bladeIndexTipX = undefined;
// let bladeIndexTipY = undefined;
// let bladeIndexBaseX = undefined;
// let bladeIndexBaseY = undefined;
//
// let predictionStart = true;
//
// let bladeMiddleFinger = {
//   tip: {
//     x: undefined,
//     y: undefined
//   },
//   base: {
//     x: undefined,
//     y: undefined,
//   }
// };
// let bladeMiddleFingerTipX = undefined;
// let bladeMiddleFingerTipY = undefined;
// let bladeMiddleFingerBaseX = undefined;
// let bladeMiddleFingerBaseY = undefined;

// PRELOAD
function preload() {
  // load soundModel
  classifier = ml5.soundClassifier(soundModel, option);

  // load pop sound
  popSound = loadSound(`assets/sounds/popSound.wav`);
} // END PRELOAD


// SETUP
function setup() {
  createCanvas(640, 480);

  //Load handPose
  loadHandPose();
  // start listening for soundModel
  classifier.classify(gotResult);

  // load bubble + PopZone
  bubble = new Bubble;
  popZone = new PopZone;
  startText = new StartText;
} // END SETUP

function loadHandPose() {
  video = createCapture(VIDEO);
  video.hide();

  handpose = ml5.handpose(video, {
    flipHorizontal: true
  }, function() {
    console.log(`model loaded`);
    startText.fillRed.r = 255;
  });

  // listen for predictions
  handpose.on('predict', function(results) {
    predictions = results;
  });
}

// DRAW
function draw() {

  if (state === `start`) {
    start();
  }
  else if (state === `running`) {
    running();
  }
  else if (state === `end`) {
    end();
  }

} // END DRAW

function start() {
  background(0);

  startText.displayTitle();
  startText.display();
  startText.displaySpace();
}

function running() {
  background(0);
  checkHandPredictions(); // detect hand
  checkStringIsCut(); // check string status
  if (!bubble.popped) {
    bubble.checkBounceOffWalls();
    bubble.display();
  }
  checkSoundClassification(); // listen for specific sound
}

function end() {
  background(243, 194, 5)
  startText = new StartText;
  startText.displayEnd();
}

function checkHandPredictions() {
  if (predictions.length > 0 && scissorShow) {
    updateScissors(predictions[0]); // index and middle finger
    checkScissorCut(); // check for scissor cutting movement
    blade.displayScissors();
    console.log(blade.displayScissors);
  }
}

function updateScissors(prediction) {
  blade = new Blade;
  blade.index(prediction);
  blade.middleFinger(prediction);
  blade.lerpFingers();
}

function checkScissorCut() {
  // check if scissors are between string length
  if (blade.bladeIndexTipY > bubble.y + bubble.size / 2 &&
    blade.bladeMiddleTipY > bubble.y + bubble.size / 2) {
    // tips and bases of index finger surrounds bubble.x position
    if ((blade.bladeIndexTipX > bubble.x + bubble.size / 2 && blade.bladeIndexBaseX < bubble.x - bubble.size / 2) || (blade.bladeIndexTipX < bubble.x - bubble.size / 2 &&
        blade.bladeIndexBaseX > bubble.x + bubble.size / 2)) {
      // check if index + middle fingers are touching
      let d = dist(blade.bladeIndexTipX, blade.bladeIndexTipY, blade.bladeMiddleTipX, blade.bladeMiddleTipY);
      if (d < 25) {
        bubble.stringIsCut = true;
      }
    }
  }
}

// get results of sound classification
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  } else if (bubble.stringIsCut) {
    console.log(results[0]);
    label = results[0].label;
  }
}

function checkStringIsCut() {
  if (!bubble.stringIsCut) {
    bubble.displayString();
  } else {
    video.stop();
    scissorShow = false;
    bubble.move();
    popZone.display();
  }
}

// check when sounds are detected
function checkSoundClassification() {
  if (label === `Blow`) {
    bubble.blow();
  }
  // check distance between bubble and popZone
  let d = dist(bubble.x, bubble.y, popZone.x, popZone.y);
  if (label === `Snap`) {
    popZone.displayText();
    // if bubble is inside popZone and user snaps, then bubble is popped
    if (d < 90 && label === `Snap`) {
      bubble.popped = true;
      popSound.isPlaying();
      // state = `end`;
    }
  }
}

// function displayScissors() {
  // // check distance between tips and bases
  // let tipDist = dist(blade.indexTipX, blade.indexTipY, blade.middleTipX, blade.middleTipY);
  // let baseDist = dist(blade.indexBaseX, blade.indexBaseY, blade.middleBaseX, blade.middleBaseY);

  // // blades of scissors
  // push();
  // noFill();
  // stroke(255);
  // strokeCap(ROUND);
  // strokeWeight(5);
  // line(blade.bladeIndexTipX, blade.bladeIndexTipY + tipDist / 2, blade.bladeIndexBaseX, blade.bladeIndexBaseY);
  // line(blade.bladeMiddleTipX, blade.bladeMiddleTipY, blade.bladeIndexBaseX, blade.bladeIndexBaseY);
  // pop();
  //
  // // hinge
  // push();
  // fill(255, 0, 0);
  // ellipseMode(CENTER);
  // ellipse(blade.bladeIndexBaseX, blade.bladeIndexBaseY, baseDist / 2);
  // pop();
// }

// pressing "Space" changes state to running
function keyPressed() {
  if (keyCode === 32) {
    state = `running`;
  }
}
