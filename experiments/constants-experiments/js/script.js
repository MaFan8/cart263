"use strict";

// const PI= 3.14159;
// // always use caps for constants
//
// const I_LOVE_TO_LEARN = true;

const NUM_CIRCLES = 10;
let circleAlpha = 50;
let circleSizeIncrease = 50;

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  circleAlpha = map(mouseX, 0, width, 10, 100);
  circleSizeIncrease = map(mouseY, 0, height, 10, 100);

  for (let i = 0; i < NUM_CIRCLES; i++) {
    push();
    fill(255, circleAlpha);
    ellipse(width / 2, height / 2, i * circleSizeIncrease);
    // concentric circles
    pop();
  }
}
