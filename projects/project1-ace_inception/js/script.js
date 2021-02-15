"use strict";

/**
Ace Inception
Maple Sung

A game that enlists the user's help to infiltrate Ace's subconsious to implant an idea.

Uses:

*/

// Global constants
const ACE_HEAD_IMG = `assets/images/acehead.png`;
const ACE_HEAD_ANGRY_IMG = `assets/images/acehead_angry.png`;
const ACE_BODY_IMG = `assets/images/aceBody.png`;

let state = `level_1` // start, level_1, level_2, limbo, end

// Image variables
let aceHead;
let aceHeadImg;
let aceHeadAngry;
let aceHeadAngryImg;
let aceBody;
let aceBodyImg;



// PRELOAD
function preload() {
  aceHeadImg = loadImage(`${ACE_HEAD_IMG}`);
  aceHeadAngry = loadImage(`${ACE_HEAD_ANGRY_IMG}`);
  aceBodyImg = loadImage(`${ACE_BODY_IMG}`)
} // END PRELOAD


// SETUP
function setup() {
  createCanvas(windowWidth, windowHeight);

  // load images
  aceHead = new Head (100, 100, aceHeadImg);
  aceHeadAngry = new Head (50, 50, aceHeadAngry);
  aceBody = new Body (100, 100, aceBodyImg);
} // END SETUP


// DRAW
function draw() {
  background(0);

  if (state = `start`) {

  }
  else if (state = `level_2`) {

  }
  else if (state = `level_2`) {

  }
  else if (state = `limbo`) {

  }
  else if (state = `end`) {
    
  }


  // aceBody.display();
  // aceHead.display();
  // aceHeadAngry.display();

} // END DRAW
