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
const ACE_KICK_IMG = `assets/images/ace_kick.png`;
const SPIKE_IMG = `assets/images/spike.png`;
const ALPACA_IMG = `assets/images/alpaca.png`;

const NUM_UNICORN_IMG = 3;
const NUM_UNICORNS = 50;
const UNICORN_IMG = `assets/images/unicorn`;
const UNICORN_ACE_IMG = `assets/images/unicorn_ace.png`;
const UNICORN_USER_IMG = `assets/images/unicorn_user.png`;


let state = `start` // start, level_1, level_2, limbo, end

// Image variables
let aceHeadImg, aceHead;
let aceHeadAngryImg, aceHeadAngry;
let aceBodyImg, aceBody;
let aceKickImg, aceKick;
let spikeImg, spike;
let alpacaImg, alpaca;
//unicorns
let unicornUserImg, unicornUser;
let unicornAceImg, unicornAce;
let unicornImages = [];
let unicorns = [];



// PRELOAD
function preload() {
  // Load character images
  aceHeadImg = loadImage(`${ACE_HEAD_IMG}`);
  aceHeadAngry = loadImage(`${ACE_HEAD_ANGRY_IMG}`);
  aceBodyImg = loadImage(`${ACE_BODY_IMG}`);
  aceKickImg = loadImage(`${ACE_KICK_IMG}`);
  spikeImg = loadImage(`${SPIKE_IMG}`);
  alpacaImg = loadImage(`${ALPACA_IMG}`);
  // Load unicorn images
  unicornUserImg = loadImage(`${UNICORN_USER_IMG}`);
  unicornAceImg = loadImage(`${UNICORN_ACE_IMG}`);

  for (let i = 0; i < NUM_UNICORN_IMG; i++) {
    let unicornImage = loadImage(`${UNICORN_IMG}${i}.png`);
    unicornImages.push(unicornImage);
  }


} // END PRELOAD


// SETUP
function setup() {
  createCanvas(windowWidth, windowHeight);

  // create images
  aceHead = new ImgBase(100, 100, aceHeadImg);
  aceHeadAngry = new ImgBase(50, 50, aceHeadAngry);
  aceBody = new Body(100, 100, aceBodyImg);
  aceKick = new Body(100, 100, aceKickImg);
  spike = new ImgBase(100, 100, spikeImg);
  alpaca = new ImgBase(100, 100, alpacaImg);

  unicornUser = new ImgBase(100, 100, unicornUserImg);
  unicornAce = new ImgBase(100, 100, unicornAceImg);

  createUnicorns();


} // END SETUP

function createUnicorns() {
  for (let i = 0; i < NUM_UNICORNS; i++) {
    let unicorn = new Unicorn(random(unicornImages));
    unicorns.push(unicorn);
  }
}



// DRAW
function draw() {
  background(0);

  if (state = `start`) {
    start();
  } else if (state = `level_1`) {
    // level_1();
  } else if (state = `level_2`) {
    // level_2();
  } else if (state = `limbo`) {
    // limbo();
  } else if (state = `end`) {
    // end();
  }

} // END DRAW

function start() {
  // aceBody.display();
  // aceKick.display();
  // aceHead.display();
  // aceHeadAngry.display();
  // spike.display();
  // alpaca.display();


}

function level_1() {
  // unicornAce.display();
  // unicornUser.display();
  showUnicorns();
}

function showUnicorns() {
  for (let i = 0; i < unicorns.length; i++) {
    unicorns[i].display();
  }
}
