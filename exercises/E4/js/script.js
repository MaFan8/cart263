"use strict";

/**
Bubble Popper
Pippin Barr

Use hand with pin on index finger to pop bubbles
*/

let state = `loading`; // loading, running

let video = undefined;
let modelName = `Handpose`;
let handpose = undefined;
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

  //bubble
  bubble = {
    x: random(width),
    y: height,
    size: 100,
    vx: 0,
    vy: -2,
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

  // if (predictions.length > 0) {
  //   let hand = predictions[0]; // get hand
  //   let index = hand.annotations.indexFinger; // get indexFinger
  //   let tip = index[3];
  //   let base = index[0];
  //   let tipX = tip[0];
  //   let tipY = tip[1];
  //   let baseX = base[0];
  //   let baseY = base[1];
  //   displayPin();
  //
  //   // check bubble popping
  //   let d = dist(tipX, tipY, bubble.x, bubble.y);
  //   if (d < bubble.size/2) {
  //     bubble.x = random(width);
  //     bubble.y = height;
  //   }
  // }
  // Check if there currently predictions to display
  if (predictions.length > 0) {
    // If yes, then get the positions of the tip and base of the index finger
    updatePin(predictions[0]);

    // Check if the tip of the "pin" is touching the bubble
    let d = dist(pin.tip.x, pin.tip.y, bubble.x, bubble.y);
    if (d < bubble.size / 2) {
      // Pop!
      resetBubble();
    }
    // Display the current position of the pin
    displayPin();
  }

  // Handle the bubble's movement and display (independent of hand detection
  // so it doesn't need to be inside the predictions check)
  moveBubble();
  checkOutOfBounds();
  displayBubble();
}

function updatePin(prediction) {
  pin.tip.x = prediction.annotations.indexFinger[3][0];
  pin.tip.y = prediction.annotations.indexFinger[3][1];
  pin.head.x = prediction.annotations.indexFinger[0][0];
  pin.head.y = prediction.annotations.indexFinger[0][1];
}

function resetBubble() {
  bubble.x = random(width);
  bubble.y = height;
}

function moveBubble() {
  bubble.x += bubble.vx;
  bubble.y += bubble.vy;
}

function checkOutOfBounds() {
  if (bubble.y < 0) {
    resetBubble();
  }
}

function displayBubble() {
  push();
  fill(0, 100, 200);
  noStroke();
  ellipse(bubble.x, bubble.y, bubble.size);
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

// function resetBubble() {
//   // update velocity to position
//   bubble.x += bubble.vx;
//   bubble.y += bubble.vy;
//   // reset once it reaches top
//   if (bubble.y < 0) {
//     bubble.x = random(width);
//     bubble.y = height;
//   }
// }
