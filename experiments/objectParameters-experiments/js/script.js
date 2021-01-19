"use strict";

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  // too many parameters!!
  // drawFancyRect(250, 250, 200, 200, 255, 255, 0, CENTER);

  let config = {
    x: 250,
    y: 250,
    width: 200,
    height: 200,
    fillColor: {
      r: 255,
      g: 255,
      b: 0,
    },
    mode: CENTER,
  };
  drawFancyRect(config);
}

// function drawFancyRect(x, y, w, h, r, g, b, mode) {
// fill(r, b, b);
//rectMode(mode);
// rect(x, y, w, h);
// }

function drawFancyRect({ x, y, width, height, fillColor, mode }) {
  push();
  fill(fillColor.r, fillColor.g, fillColor.b);
  rectMode(mode);
  rect(x, y, width, height);
  pop();
}
