"use strict";

/**
Bubble Popper++
Maple Sung

Use hand to cut the ballon free, blow it around until it reaches the pop zone where user claps to pop the bubble.

References:
Based on Pippin Barr's Bubble Popper
https://github.com/pippinbarr/cart263-2021/tree/main/examples/ai/bubble-popper/
*/

let state = `running`; // loading, running

let video = undefined;
let modelName = `Handpose`;
let handpose = undefined;

let classifier;
let soundModel =
`https://teachablemachine.withgoogle.com/models/bMkXW1pVN/`;
let label = 'listening...';

let string = undefined;
let stringCut = false;
let bubble = undefined;

let predictions = [];

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
  classifier = ml5.soundClassifier(soundModel + model.json);
} // END PRELOAD

// SETUP
function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();

  // load handpose model
  handpose = ml5.handpose(video, {
    flipHorizontal: true
  }, function() {
    state = `running`;
    console.log(`model loaded`);
  });

  // listen for predictions
  handpose.on('predict', function(results) {
    // console.log(results);
    predictions = results;
  })

  // start listening for soundModel
  classifier.classify(gotResults);

  //string
  string = {
    y: random(height/3, height/2),
    fill: 255,
    width: 1,
    height: height,
  };
  //bubble
  bubble = {
    x: random(width),
    // y: undefined,
    y: random(height/3, height/2),
    size: 80,
    vx: random(-1,1),
    vy: -0.5,
    change: 0.02,
    speed: 1,
  };
} // END SETUP


// DRAW
function draw() {

  if (state === `loading`) {
    loading();
  } else if (state === `running`) {
    running();

    push();
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(label, width / 2, height / 2);
    pop();

  }
} // END DRAW


function loading() {
  push();
  textSize(32);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`Loading ${modelName}...`, width / 2, height / 2);
  pop();
}

function running() {
  background(0);

  // Check if there are current predictions (hand)
  if (predictions.length > 0) {
    updateScissors(predictions[0]); // index and middle finger



    if (bladeIndex.tip.y > bubble.y &&
        bladeIndex.tip.y < (bubble.y + string.height) &&
        bladeIndex.base.y > bubble.y &&
        bladeIndex.base.y < (bubble.y + string.height)) {

      let d = dist(bladeIndex.base.x, bladeIndex.base.y, bubble.x, bubble.y)
      if (Math.floor(bladeIndex.tip.x) === Math.floor(bubble.x)) {
        stringCut = true;
      }
    }
    displayScissors();
  }


  // display balloon on string
  checkBounceOfWalls();
  if (!stringCut) {
  displayString();
} else {
    moveBubble();

    // // start listening for soundModel
    // classifier.classify(gotResults);
}

  displayBubble();
}

function updateScissors(prediction) {
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
  }
  else {
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

function gotResults(error, results) {
  if (error) {
    connsole.error(error);
    return;
  }
  label = results[0].label;
}

function moveBubble() {
  bubble.x += bubble.vx;
  bubble.y += bubble.vy;
}

function checkBounceOfWalls() {
  if (bubble.x + bubble.size/2 > width) {
    bubble.vx = -bubble.vx;
  }
  if (bubble.x - bubble.size/2 < 0) {
    bubble.vx = +0.5;
  }
  if (bubble.y + bubble.size/2 > height) {
    bubble.vy = -bubble.vy;
  }
  if (bubble.y - bubble.size/2 < 0) {
    bubble.vy = +0.5;
  }
}

function displayString() {
  push();
  noStroke();
  fill(string.fill);
  rectMode(CORNER);
  rect(bubble.x+sin(frameCount/10), bubble.y, string.width, string.height);
  pop();
}

function displayBubble() {
  push();
  fill(0, 100, 200);
  noStroke();
  ellipse(bubble.x, bubble.y,  bubble.size +sin(frameCount/5),
  bubble.size +cos(frameCount/5));
  pop();
}

function displayScissors() {
  push();
  noFill();
  stroke(255);
  strokeCap(ROUND);
  strokeWeight(15);
  line(bladeIndexTipX, bladeIndexTipY, bladeIndexBaseX, bladeIndexBaseY);
  line(bladeMiddleFinger.tip.x, bladeMiddleFinger.tip.y, bladeMiddleFinger.base.x, bladeMiddleFinger.base.y);
  pop();

  push();
  fill(255,0,0);
  ellipseMode(CORNERS);
  ellipse(bladeIndex.base.x, bladeIndex.base.y, bladeMiddleFinger.base.x, bladeMiddleFinger.base.y);
  pop();

}
