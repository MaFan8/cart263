"use strict";

/**
Ace Inception
Maple Sung

A game that enlists the user's help to infiltrate Ace's subconsious to implant an idea.

Uses:
ml5.js Facemesh:
https://learn.ml5js.org/#/reference/facemesh


*/

// Global constants
const ACE_HEAD_IMG = `assets/images/acehead.png`;
const ACE_HEAD_ANGRY_IMG = `assets/images/acehead_angry.png`;
const ACE_BODY_IMG = `assets/images/aceBody.png`;
const ACE_KICK_IMG = `assets/images/ace_kick.png`;
const SPIKE_IMG = `assets/images/spike.png`;
const ALPACA_IMG = `assets/images/alpaca.png`;

const NUM_UNICORN_FRONT_IMG = 4;
const NUM_UNICORNS = 5;
const UNICORN_FRONT_IMG = `assets/images/unicorn_front`;
const UNICORN_ACE_IMG = `assets/images/unicorn_ace_front.png`;
const SPIKE_BACK_IMG = `assets/images/spikeBack.png`;


let state = `start`; // start, level_1, level_2, limbo, end
let bgStart = {
  r: 255,
  g: 153,
  b: 0,
};

let video;
let facemesh;
let options = {
  flipHorizontal: true
};
let predictions = [];
let user;
let pause = true;

// Text varibales
let text;
// Image variables
let aceHeadImg, aceHead;
let aceHeadAngryImg, aceHeadAngry;
let aceBodyImg, aceBody;
let aceKickImg, aceKick;
let spikeImg, spike;
let spikeBackImg, spikeBack;
let alpacaImg, alpaca;
//unicorns
let unicornAceImg, unicornAce;
let unicornFrontImages = [];
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
  unicornAceImg = loadImage(`${UNICORN_ACE_IMG}`);
  spikeBackImg = loadImage(`${SPIKE_BACK_IMG}`);

  for (let i = 0; i < NUM_UNICORN_FRONT_IMG; i++) {
    let unicornImage = loadImage(`${UNICORN_FRONT_IMG}${i}.png`);
    unicornFrontImages.push(unicornImage);
  }

} // END PRELOAD


// SETUP
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Load FaceMesh
  loadFaceMesh();

  // create text
  text = new Text;
  // create images
  imagesSetup();

} // END SETUP

function imagesSetup() {
  aceHead = new ImgBase(width / 2, height / 2, aceHeadImg);
  aceHeadAngry = new ImgBase(width / 2, height / 2, aceHeadAngry);
  aceBody = new Body(width / 2, height / 2, aceBodyImg);
  aceKick = new Body(100, 100, aceKickImg);
  spike = new ImgBase(100, 100, spikeImg);
  alpaca = new ImgBase(100, 100, alpacaImg);
  spikeBack = new User(spikeBackImg);
  unicornAce = new Unicorn(unicornAceImg);
  user = new User(spikeBackImg);
}

setInterval(function() {
  if (unicorns.length < NUM_UNICORNS) {
    let unicorn = new Unicorn(random(unicornFrontImages));
    unicorns.push(unicorn);
  }
}, randomNumber(2000, 10000));


function loadFaceMesh() {
  // start video and hide video element
  video = createCapture(VIDEO);
  video.hide();

  // start facemesh model
  facemesh = ml5.facemesh(video, function() {
    console.log(`model loaded`);

  });
  // save face detected results to prediction
  facemesh.on(`predict`, function(results) {
    predictions = results;
    // console.log(predictions);
  });
}



// DRAW
function draw() {

  if (state === `start`) {
    start();
  } else if (state === `level_1`) {
    level_1();
  } else if (state === `level_2`) {
    // level_2();
  } else if (state === `limbo`) {
    limbo();
  } else if (state === `end`) {
    // end();
  }

} // END DRAW

function start() {
  video.pause();
  background(bgStart.r, bgStart.g, bgStart.b);
  // text.title();

  // aceBody.display();
  // aceKick.display();
  // aceHead.display();
  // aceHeadAngry.display();
  // spike.display();
  // alpaca.display();
}

function level_1() {
  background(1, 170, 166);
  if (pause) {
    video.pause();
    user.displayStatic();
  } else {
    video.play();
    // Check for face and update predictions
    if (predictions.length > 0) {
      updateUser(predictions[0]);
    }
    showUnicorns(); // display unicorns
    // showUnicornAce(); // display unicornAce
  }
}

function showUnicorns() {
  for (let i = 0; i < unicorns.length; i++) {
    let unicorn = unicorns[i];
    unicorn.move();
    unicorn.checkTouch(user);
    unicorn.moveWrap();
    unicorn.display();
  }
}

function showUnicornAce() {
  unicornAce.move();
  unicornAce.moveWrap();
  unicornAce.display();
  console.log("Ace");
}

function updateUser(prediction) {
  user.update(prediction);
  user.display();
}

function limbo() {
  background(0);
  console.log("limbo");
}

function keyPressed() {
  if (keyCode === 32) {
    state = `level_1`;
  }
  //  else if (state === `level_1` && keyCode === 32) {
  //   pause = false;
  // }
}




function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
