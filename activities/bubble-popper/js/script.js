"use strict";

/**
Bubble Popper
Pippin Barr

Use hand with pin on index finger to pop bubbles
*/

let predictions = [];

let video = undefined;
let handpose = undefined;
let bubble = undefined;

function preload() {

}



function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();

  // load handpose model
  const handpose = ml5.handpose(video, {flipHorizontal: true}, function() {  console.log(`model loaded`);
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
  background(0);

  if (predictions.length > 0) {
    let hand = predictions[0]; // get hand
    let index = hand.annotations.indexFinger; // get indexFinger
    let tip = index[3];
    let base = index[0];
    let tipX = tip[0];
    let tipY = tip[1];
    let baseX = base[0];
    let baseY = base[1];

    displayPin();

    // check bubble popping
    let d = dist(tipX, tipY, bubble.x, bubble.y);
    if (d < bubble.size/2) {
      bubble.x = random(width);
      bubble.y = height;
    }
  }

  resetBubble();
  displayBubble();
}

function displayPin() {
  // pin body
  push();
  noFill();
  stroke(255);
  strokeWeight(2);
  line(baseX, baseY, tipX, tipY);
  pop();
  // pin head
  push();
  fill(255,0,0);
  noStroke();
  ellipse(baseX, baseY, 20,20);
  pop();
}

function resetBubble() {
  // update velocity to position
  bubble.x += bubble.vx;
  bubble.y += bubble.vy;
  // reset once it reaches top
  if (bubble.y < 0) {
    bubble.x = random(width);
    bubble.y = height;
  }
}

function displayBubble() {
  push();
  fill(0, 100, 200);
  noStroke();
  ellipse(bubble.x, bubble.y, bubble.size);
  pop();
}
