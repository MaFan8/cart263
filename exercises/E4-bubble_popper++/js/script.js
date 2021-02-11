"use strict";

/**
Bubble Popper++
Maple Sung

Use hand with pin on index finger to pop bubbles

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

let pin = {
  tip: {
    x: undefined,
    y: undefined
  },
  head: {
    x: undefined,
    y: undefined,
    size: 20,
  }
};


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
    console.log(results);
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
    updatePin(predictions[0]); // take index and middle finger

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

  checkOutOfBounds();
  displayString();
  displayBubble();
}

function updatePin(prediction) {
  pin.tip.x = prediction.annotations.indexFinger[3][0];
  pin.tip.y = prediction.annotations.indexFinger[3][1];
  pin.head.x = prediction.annotations.indexFinger[0][0];
  pin.head.y = prediction.annotations.indexFinger[0][1];
}

function displayString() {
  push();
  noStroke();
  fill(string.fill);
  rectMode(CORNER);
  rect(bubble.x+sin(frameCount/10), string.y, string.width, string.height);
  pop();
}

function resetBubble() {
  bubble.x = random(width);
  bubble.y = height;
}

function moveBubble() {
  let r = random(0,1);
  if (r < bubble.change) {
    bubble.vx = random (-bubble.speed, bubble.speed);
    bubble.vy = random(-bubble.speed, bubble.speed);
  }

  bubble.x += bubble.vx;
  bubble.y += bubble.vy;
}

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

function displayPin() {
  // pin body
  push();
  noFill();
  stroke(255);
  strokeWeight(2);
  line(pin.tip.x, pin.tip.y, pin.head.x, pin.head.y);
  pop();
  // pin head
  push();
  fill(255, 0, 0);
  noStroke();
  ellipse(pin.head.x, pin.head.y, pin.head.size);
  pop();
}
