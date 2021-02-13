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


*/

let state = `running`; // start, running, end

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

let startText;
let bubbleString;
let bubble;
let popZone;

let predictions = [];
let scissorShow = true;

let blade;
let bladeIndex = {
  tip: {
    x: undefined,
    y: undefined
  },
  base: {
    x: undefined,
    y: undefined,
  }
};
let bladeIndexTipX = undefined;
let bladeIndexTipY = undefined;
let bladeIndexBaseX = undefined;
let bladeIndexBaseY = undefined;

let predictionStart = true;

let bladeMiddleFinger = {
  tip: {
    x: undefined,
    y: undefined
  },
  base: {
    x: undefined,
    y: undefined,
  }
};
let bladeMiddleFingerTipX = undefined;
let bladeMiddleFingerTipY = undefined;
let bladeMiddleFingerBaseX = undefined;
let bladeMiddleFingerBaseY = undefined;

// PRELOAD
function preload() {
  // load soundModel
  classifier = ml5.soundClassifier(soundModel, option);
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
} // END SETUP

function loadHandPose() {
  video = createCapture(VIDEO);
  video.hide();

  handpose = ml5.handpose(video, {
    flipHorizontal: true
  }, function() {
    console.log(`model loaded`);
    // startText.displaySpace();
    state = `running`;
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
  startText = new StartText;
  startText.displayTitle();
  startText.display();
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
    displayScissors();
  }
}

function updateScissors(prediction) {
  // blade = new Blade;
  // blade.index();
  // blade.middle();
  bladeIndex.tip.x = prediction.annotations.indexFinger[3][0];
  bladeIndex.tip.y = prediction.annotations.indexFinger[3][1];
  bladeIndex.base.x = prediction.annotations.indexFinger[0][0];
  bladeIndex.base.y = prediction.annotations.indexFinger[0][1];

  bladeMiddleFinger.tip.x = prediction.annotations.middleFinger[3][0];
  bladeMiddleFinger.tip.y = prediction.annotations.middleFinger[3][1];
  bladeMiddleFinger.base.x = prediction.annotations.middleFinger[0][0];
  bladeMiddleFinger.base.y = prediction.annotations.middleFinger[0][1];

  // stablize points
  if (predictionStart === true) {
    bladeIndexTipX = bladeIndex.tip.x;
    bladeIndexTipY = bladeIndex.tip.y;
    bladeIndexBaseX = bladeIndex.base.x;
    bladeIndexBaseY = bladeIndex.base.y;

    bladeMiddleFingerTipX = bladeMiddleFinger.tip.x;
    bladeMiddleFingerTipY = bladeMiddleFinger.tip.y;
    bladeMiddleFingerBaseX = bladeMiddleFinger.base.x;
    bladeMiddleFingerBaseY = bladeMiddleFinger.base.y;

    predictionStart = false;
  } else {
    bladeIndexTipX = lerp(bladeIndexTipX, bladeIndex.tip.x, 0.5);
    bladeIndexTipY = lerp(bladeIndexTipY, bladeIndex.tip.y, 0.5);
    bladeIndexBaseX = lerp(bladeIndexBaseX, bladeIndex.base.x, 0.5);
    bladeIndexBaseY = lerp(bladeIndexBaseY, bladeIndex.base.y, 0.5);

    bladeMiddleFingerTipX = lerp(bladeMiddleFingerTipX, bladeMiddleFinger.tip.x, 0.5);
    bladeMiddleFingerTipY = lerp(bladeMiddleFingerTipY, bladeMiddleFinger.tip.y, 0.5);
    bladeMiddleFingerBaseX = lerp(bladeMiddleFingerBaseX, bladeMiddleFinger.base.x, 0.5);
    bladeMiddleFingerBaseY = lerp(bladeMiddleFingerBaseY, bladeMiddleFinger.base.y, 0.5);
  }
}

function checkScissorCut() {
  // check if scissors are between string length
  if (bladeIndex.tip.y > bubble.y + bubble.size / 2 &&
    bladeMiddleFinger.tip.y > bubble.y + bubble.size / 2) {
    // tips and bases of index finger surrounds bubble.x position
    if ((bladeIndex.tip.x > bubble.x + bubble.size / 2 && bladeIndex.base.x < bubble.x - bubble.size / 2) || (bladeIndex.tip.x < bubble.x - bubble.size / 2 &&
        bladeIndex.base.x > bubble.x + bubble.size / 2)) {
      // check if index + middle fingers are touching
      let d = dist(bladeIndex.tip.x, bladeIndex.tip.y, bladeMiddleFinger.tip.x, bladeMiddleFinger.tip.y);
      if (d < 25) {
        bubble.stringIsCut = true;
      }
    }
  }
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  } else if (bubble.stringIsCut) {
    // console.log(results[0]);
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
    console.log(popZone.x, popZone.y);
  }
}

function checkSoundClassification() {
  if (label === `Blow`) {
    bubble.blow();
  }
  let d = dist(bubble.x, bubble.y, popZone.x, popZone.y);
  if (label === `Snap`) {
    popZone.displayText();

    if (d < 50 && label === `Snap`) {
      bubble.popped = true;
    }
  }
}

function displayScissors() {
  let tipDist = dist(bladeIndex.tip.x, bladeIndex.tip.y, bladeMiddleFinger.tip.x, bladeMiddleFinger.tip.y);
  let baseDist = dist(bladeIndex.base.x, bladeIndex.base.y, bladeMiddleFinger.base.x, bladeMiddleFinger.base.y);

  push();
  noFill();
  stroke(255);
  strokeCap(ROUND);
  strokeWeight(5);
  line(bladeIndexTipX, bladeIndexTipY + tipDist / 2, bladeIndexBaseX, bladeIndexBaseY);
  line(bladeMiddleFinger.tip.x, bladeMiddleFinger.tip.y, bladeIndex.base.x, bladeIndex.base.y);
  pop();

  // hinge
  push();
  fill(255, 0, 0);
  ellipseMode(CENTER);
  ellipse(bladeIndex.base.x, bladeIndex.base.y, baseDist / 2);
  pop();
}

function keyPressed() {
  if (keyCode === 32) {
    state = `running`;
  }
}
