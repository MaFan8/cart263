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
const HEART_IMG = `assets/images/heart.png`;
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


let state = `level_1`; // start, level_1, level_2, limbo, end
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

// Text variables
let textBase;
// Image variables
let imgX = 200;
let imgY = 150;
let sizeSmall = 0.6;
let sizeBig = 1.2;
let heartImg, heart;
let heartX = 250;
let heartY = 480;
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
  heartImg = loadImage(`${HEART_IMG}`);
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

  // // Load FaceMesh
  // loadFaceMesh();

  // create text
  textBase = new TextBase;
  // create images
  imagesSetup();

} // END SETUP

function imagesSetup() {
  heart = new ImgBase(heartX, heartY, heartImg, sizeBig);
  aceBody = new Body(imgX, imgY, aceBodyImg, sizeSmall);
  aceHeadAngry = new ImgBase(imgX, imgY, aceHeadAngry, sizeSmall);
  aceHead = new ImgBase(width / 2, height / 2, aceHeadImg);
  // aceKick = new Body(100, 100, aceKickImg);
  spike = new ImgBase(heartX +50, heartY -60, spikeImg, sizeSmall);
  alpaca = new ImgBase(heartX -20, heartY, alpacaImg, sizeSmall +0.2);
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
    end();
  }

} // END DRAW

function start() {
  background(bgStart.r, bgStart.g, bgStart.b);
  displayStartText();
  displayStartImg();
}


function level_1() {
  background(1, 170, 166);
  // if (pause) {
  //   video.pause();
  //   user.displayStatic();
  // } else {
  //   video.play();
  //   // Check for face and update predictions
  //   if (predictions.length > 0) {
  //     updateUser(predictions[0]);
  //   }
    showUnicorns(); // display unicorns
    // showUnicornAce(); // display unicornAce

}

function displayStartText() {
  textBase.displayTitle();
  textBase.displayStartInfo();
  textBase.displayStartTips();
  textBase.displayGo();
}

function displayStartImg() {
  aceBody.display();
  aceHeadAngry.display();
  aceHeadAngry.move();
  heart.displayHeart();
  spike.display();
  alpaca.display();
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
}




function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
