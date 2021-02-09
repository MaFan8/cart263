"use strict";

/**
Ace Inception
Maple Sung

A game that enlists the user's help to infiltrate Ace's subconsious to implant an idea.

Uses:

*/

const ACE_HEAD_IMG = `assets/images/acehead.png`;
const ACE_BODY_IMG = `assets/images/aceBody.png`;

let aceHeadImg;
let aceBodyImg;


// PRELOAD
function preload() {
  aceHeadImg = loadImage(`${ACE_HEAD_IMG}`);
  aceBodyImg = loadImage(`${ACE_BODY_IMG}`)
} // END PRELOAD


// SETUP
function setup() {
  createCanvas(windowWidth, windowHeight);
} // END SETUP


// DRAW
function draw() {
  background(0);

  push();
  imageMode(CENTER);
  scale(0.5);
  translate(width/2, height/2);
  image(aceBodyImg, width/2, height/2 + 180);
  image(aceHeadImg, width/2, height/2);
  // 200+sin(frameCount*0.1)*10,
  //    200+cos(frameCount*0.1)*10
  pop();
} // END DRAW
