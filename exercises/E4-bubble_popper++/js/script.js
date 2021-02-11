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
let string = undefined;
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
    // size: 20,
  }
};
let bladeIndexTipX = undefined;
let bladeIndexTipY = undefined;
let bladeIndexBaseX = undefined;
let bladeIndexBaseY = undefined;

let bladeMiddleFinger = {
  tip: {
    x: undefined,
    y: undefined
  },
  base: {
    x: undefined,
    y: undefined,
    // size: 20,
  }
};
let bladeMiddleFingerTipX = undefined;
let bladeMiddleFingerTipY = undefined;
let bladeMiddleFingerBaseX = undefined;
let bladeMiddleFingerBaseY = undefined;


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
    size: 80,
    vx: 0,
    vy: -2,
    change: 0.02,
    speed: 1,
  };
}



function draw() {

  if (state === `loading`) {
    loading();
  } else if (state === `running`) {
    running();
  }
}


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
    updateScissors(predictions[0]); // take index and middle finger

  //   // Check if the tip of the "pin" is touching the bubble
  //   let d = dist(pin.tip.x, pin.tip.y, bubble.x, bubble.y);
  //   if (d < bubble.size / 2) {
  //     // Pop!
  //     resetBubble();
  //   }
  //   // Display the current position of the pin
  //   displayPin();
  // }



  // Handle the bubble's movement and display (independent of hand detection
  // so it doesn't need to be inside the predictions check)

  // checkOutOfBounds();
  // displayString();
  // displayBubble();

  // displayScissors();
}
}

function updateScissors(prediction) {
  bladeIndex.tip.x = prediction.annotations.indexFinger[3][0];
  bladeIndex.tip.y = prediction.annotations.indexFinger[3][1];
  bladeIndex.base.x = prediction.annotations.indexFinger[0][0];
  bladeIndex.base.y = prediction.annotations.indexFinger[0][1];

  // bladeIndexTipX = lerp(bladeIndexTipX, bladeIndex.tip.x, 0.5);
  // bladeIndexTipY = lerp(bladeIndexTipY, bladeIndex.tip.y, 0.5);
  // bladeIndexBaseX = lerp(bladeIndexBaseX, bladeIndex.base.x, 0.5);
  // bladeIndexBaseY = lerp(bladeIndexBaseY, bladeIndex.base.y, 0.5);

  bladeMiddleFinger.tip.x = prediction.annotations.middleFinger[3][0];
  bladeMiddleFinger.tip.y = prediction.annotations.middleFinger[3][1];
  bladeMiddleFinger.base.x = prediction.annotations.middleFinger[0][0];
  bladeMiddleFinger.base.y = prediction.annotations.middleFinger[0][1];
}

function displayString() {
  push();
  noStroke();
  fill(string.fill);
  rectMode(CORNER);
  rect(bubble.x+sin(frameCount/10), string.y, string.width, string.height);
  pop();
}

// function resetBubble() {
//   bubble.x = random(width);
//   bubble.y = height;
// }

// function moveBubble() {
//   let r = random(0,1);
//   if (r < bubble.change) {
//     bubble.vx = random (-bubble.speed, bubble.speed);
//     bubble.vy = random(-bubble.speed, bubble.speed);
//   }
//
//   bubble.x += bubble.vx;
//   bubble.y += bubble.vy;
// }

function checkOutOfBounds() {
  if (bubble.y < 0) {
    resetBubble();
  }

  bubble.x = constrain(bubble.x, 0, width);
}

function displayBubble() {
  push();
  fill(0, 100, 200);
  noStroke();
  ellipse(bubble.x, string.y,  bubble.size +sin(frameCount/5),
  bubble.size +cos(frameCount/5));
  pop();
}

function displayScissors() {
  push();
  noFill();
  stroke(255);
  strokeCap(ROUND);
  strokeWeight(15);
  line(bladeIndex.tip.x, bladeIndex.tip.y, bladeIndex.base.x, bladeIndex.base.y);
  // line(bladeIndexTipX, bladeIndexTipY, bladeIndexBaseX, bladeIndexBaseY);
  line(bladeMiddleFinger.tip.x, bladeMiddleFinger.tip.y, bladeMiddleFinger.base.x, bladeMiddleFinger.base.y);
  pop();

  push();
  fill(255,0,0);
  ellipseMode(CORNERS);
  ellipse(bladeIndex.base.x, bladeIndex.base.y, bladeMiddleFinger.base.x, bladeMiddleFinger.base.y);
  pop();

  // // pin head
  // push();
  // fill(255, 0, 0);
  // noStroke();
  // ellipse(pin.head.x, pin.head.y, pin.head.size);
  // pop();
}
