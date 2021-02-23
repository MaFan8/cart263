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
const NUM_UNICORNS = 4;
const UNICORN_FRONT_IMG = `assets/images/unicorn_front`;
const UNICORN_IMG = `assets/images/unicorn`
const UNICORN_ACE_FRONT_IMG = `assets/images/unicorn_ace_front.png`;
const UNICORN_ACE_IMG = `assets/images/unicorn_ace.png`;
const SPIKE_BACK_IMG = `assets/images/spikeBack.png`;


let state = `level_1`; // start, level_1, level_2, limbo, end

// Level variables
let startedLevel_1 = 0; // 0, 1, 2
let level_1Rect = undefined;
let startedLevel_2 = 0; // 0, 1, 2
let level_2Rect = undefined;
let loaded = false;
let inPlay = false;
let pause = false;

// Canvas variables
let canvasStart;
let canvas_1 = {
  w: 1000,
  h: 600,
};
let canvas_2 = {
  w: 500,
  h: 500,
};

// ml5 variables
let video;
let facemesh;
let options = {
  flipHorizontal: true
};
let predictions = [];
let user;

// Background variables
let bgOrange = {
  r: 255,
  g: 153,
  b: 0,
};
let bgTeal = {
  r: 1,
  g: 170,
  b: 166,
};

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
//unicorns images
let unicornAceFrontImg, unicornAceFront;
let unicornAceImg, unicornAce;
let unicornFrontImages = [];
let unicornsFront = [];
let unicornImages = [];
let unicorns = [];

let safeDist = 40;

// PRELOAD
function preload() {
  // Load character images
  heartImg = loadImage(`${HEART_IMG}`);
  aceHeadImg = loadImage(`${ACE_HEAD_IMG}`);
  aceHeadAngry = loadImage(`${ACE_HEAD_ANGRY_IMG}`);
  aceBodyImg = loadImage(`${ACE_BODY_IMG}`);
  aceKickImg = loadImage(`${ACE_KICK_IMG}`);
  spikeImg = loadImage(`${SPIKE_IMG}`);
  spikeBackImg = loadImage(`${SPIKE_BACK_IMG}`);
  alpacaImg = loadImage(`${ALPACA_IMG}`);
  // Load unicorn images
  unicornAceFrontImg = loadImage(`${UNICORN_ACE_FRONT_IMG}`);
  unicornAceImg = loadImage(`${UNICORN_ACE_IMG}`);
  // Load unicorns front images in array
  for (let i = 0; i < NUM_UNICORN_FRONT_IMG; i++) {
    let unicornFrontImage = loadImage(`${UNICORN_FRONT_IMG}${i}.png`);
    unicornFrontImages.push(unicornFrontImage);
  }
  // // Load unicorns images in array
  // for (let i = 0; i < NUM_UNICORN_IMG; i++) {
  //   let unicornImage = loadImage(`${UNICORN_IMG}${i}.png`);
  //   unicornImages.push(unicornImage);
  // }
} // END PRELOAD


// SETUP
function setup() {
  // create canvase
  canvasStart = createCanvas(1200, 800);
  level_1Rect = createGraphics(canvas_1.w, canvas_1.h);
  level_2Rect = createGraphics(canvas_2.w, canvas_2.h);

  background(bgOrange.r, bgOrange.g, bgOrange.b); //orange
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
  spike = new ImgBase(heartX + 50, heartY - 60, spikeImg, sizeSmall);
  alpaca = new ImgBase(heartX - 20, heartY, alpacaImg, sizeSmall + 0.2);
  spikeBack = new User(spikeBackImg, level_1Rect);
  unicornAceFront = new Unicorn(unicornAceFrontImg, level_1Rect);
  unicornAce = new Unicorn(unicornAceImg, level_1Rect);
  user = new User(spikeBackImg, level_1Rect);
}

setInterval(function() {
  if (unicornsFront.length < NUM_UNICORNS) {
    let unicornFront = new Unicorn(random(unicornFrontImages), level_1Rect);
    unicornsFront.push(unicornFront);
  }
}, randomNumber(2000, 10000));


function loadFaceMesh() {
  // start video and hide video element
  video = createCapture(VIDEO);
  video.hide();

  // start facemesh model
  facemesh = ml5.facemesh(video, function() {
    console.log(`model loaded`);
    loaded = true;
  });
  // save face detected results to prediction
  facemesh.on(`predict`, function(results) {
    predictions = results;
    // console.log(predictions);
  });
}


// DRAW
function draw() {
  background(bgOrange.r, bgOrange.g, bgOrange.b);

  if (state === `start`) {
    start();
  } else if (state === `level_1`) {
    level_1();
  }
  if (state === `level_2`) {
    level_2();
  } else if (state === `limbo`) {
    limbo();
  } else if (state === `end`) {
    end();
  }

} // END DRAW

function start() {
  displayStartText();
  displayStartImg();
}

function level_1() {
  // display text & image if FaceMesh is loading
  if (!loaded) {
    displayLevel_1Start();
    textBase.displayLoading();
  }

  // Load FaceMesh Once
  if (startedLevel_1 === 0) {
    level_1Rect.background(bgTeal.r, bgTeal.g, bgTeal.b);
    loadFaceMesh();
    startedLevel_1 = 1;
  }
  // add start/pause instruction after FaceMesh is loaded
  else if (startedLevel_1 == 1 && loaded) {
    displayLevel_1Start();
    textBase.displayPause();
  }
  // play once "space" is pressed
  else if (startedLevel_1 == 2) {
    if (inPlay) {
      level_1Play();
    } else {
      displayLevel_1Start();
      textBase.displayPause();
    }
  }
}

function level_2() {
  level_1Rect.background(bgTeal.r, bgTeal.g, bgTeal.b);
  level_2Rect.background(0);
  // if (!loaded) {
  //
  // }
  // Load createGraphics
  if (startedLevel_2 === 0) {

    startedLevel_2 = 1;
  }
  else if (startedLevel_2 == 1) {

    imageMode(CORNER);
    image(level_1Rect,100,100);







    push();
    imageMode(CENTER);
    translate(width/2, height/2)
    rotate(frameCount/60);
    image(level_2Rect,0,0);
    pop();
  }
}


function displayStartText() {
  textBase.displayTitle();
  textBase.displayStartInfo();
  textBase.displayStartTips();
  textBase.displayGo();
}

function displayLevel_1Start() {
  user.displayStatic();
  textBase.displayLevel_1Title();
  textBase.displayLevel_1Tips();
  unicornAce.displayStatic();
}

function level_1Play() {
  //reset rect_1:
  level_1Rect.clear();
  level_1Rect.background(bgTeal.r, bgTeal.g, bgTeal.b);

  if (predictions.length > 0) {
    updateUser(predictions[0]);
  }
  showUnicornsFront(); // display unicorns
  //display unicornAce after 15s
  if (millis() > 35000)
    showUnicornAceFront(); // display unicornAce

    // draw rect
    imageMode(CORNER);
    image(level_1Rect,100,100);
}

function displayStartImg() {
  aceBody.display();
  aceHeadAngry.display();
  aceHeadAngry.move();
  heart.displayHeart();
  spike.display();
  alpaca.display();
}

function showUnicornsFront() {
  for (let i = 0; i < unicornsFront.length; i++) {
    let unicornFront = unicornsFront[i];
    unicornFront.move();
    // check if unicorn touches user
    let d = dist(unicornFront.x, unicornFront.y, user.displayX, user.y - safeDist);
    if (d < safeDist) {
      state = `limbo`;
    }
    unicornFront.moveWrap();
    unicornFront.display();
  }
}

function showUnicornAceFront() {
  if (!unicornAceFront.isPaused) {
    unicornAceFront.move();
    // check if unicornAce touches user
    let d = dist(unicornAceFront.x, unicornAceFront.y, user.displayX, user.y - safeDist);
    if (d < safeDist) {
      state = `level_2`;
    }
  }
  unicornAceFront.moveWrapAce();
  unicornAceFront.display();
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
  if (startedLevel_1 === 1 && keyCode === 32) {
    startedLevel_1 = 2;
    inPlay = true;
  }
  if (startedLevel_1 === 2 && keyCode === 32) {
    inPlay = !inPlay; // pause
  }
}




// random function for FaceMesh
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
