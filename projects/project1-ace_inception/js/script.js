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

const NUM_UNICORN_FRONT_IMG = 4;
const NUM_UNICORNS = 4;
const UNICORN_FRONT_IMG = `assets/images/unicorn_front`;
const UNICORN_ACE_IMG = `assets/images/unicorn_ace_front.png`;


let state = `level_1`; // start, level_1, level_2, limbo, end

// Image variables
let aceHeadImg, aceHead;
let aceHeadAngryImg, aceHeadAngry;
let aceBodyImg, aceBody;
let aceKickImg, aceKick;
let spikeImg, spike;
let alpacaImg, alpaca;
//unicorns
let unicornAceImg, unicornAce;
let unicornFrontImages = [];
let unicorns = [];

let circle = {
  x: undefined,
  y: undefined,
  size: undefined,
  sizeRatio: 0.75,
  fill: 255,
  alpha: 200,
  vx: undefined,
  speed: 2,
};

  let angle = 0;

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
  unicornAceImg = loadImage(`${UNICORN_ACE_IMG}`);

  for (let i = 0; i < NUM_UNICORN_FRONT_IMG; i++) {
    let unicornImage = loadImage(`${UNICORN_FRONT_IMG}${i}.png`);
    unicornFrontImages.push(unicornImage);
  }


} // END PRELOAD


// SETUP
function setup() {
  createCanvas(windowWidth, windowHeight);

  // create images
  aceHead = new ImgBase(width/2, height/2, aceHeadImg);
  aceHeadAngry = new ImgBase(width/2, height/2, aceHeadAngry);
  aceBody = new Body(width/2, height/2, aceBodyImg);
  aceKick = new Body(100, 100, aceKickImg);
  spike = new ImgBase(100, 100, spikeImg);
  alpaca = new ImgBase(100, 100, alpacaImg);

  unicornAce = new Unicorn(unicornAceImg);

  createUnicorns();




} // END SETUP

function createUnicorns() {
  for (let i = 0; i < NUM_UNICORNS; i++) {
    let unicorn = new Unicorn(random(unicornFrontImages));
    unicorns.push(unicorn);
  }
}

// DRAW
function draw() {
  background(234,245,214);

  if (state === `start`) {
    start();
  } else if (state === `level_1`) {
    level_1();
  } else if (state === `level_2`) {
    // level_2();
  } else if (state === `limbo`) {
    // limbo();
  } else if (state === `end`) {
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
  // showUnicorns();

  // let time = random(5000, 15000);
  // setTimeout(showUnicornAce, time);



}

function showUnicorns() {
  for (let i = 0; i < unicorns.length; i++) {
    unicorns[i].move();
    unicorns[i].moveWrap();
    unicorns[i].display();
  }
}

function showUnicornAce() {
  unicornAce.move();
  unicornAce.moveWrap();
  unicornAce.display();
  console.log("Ace");
}
