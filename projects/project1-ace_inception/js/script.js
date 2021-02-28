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
const NUM_UNICORNSFRONT = 4;
const UNICORN_FRONT_IMG = `assets/images/unicorn_front`;
const UNICORN_ACE_FRONT_IMG = `assets/images/unicorn_ace_front.png`;
const UNICORN_ACE_IMG = `assets/images/unicorn_ace.png`;
const NUM_UNICORN_IMG = 4;
const NUM_UNICORNS = 50;
const UNICORN_IMG = `assets/images/unicorn`;
const SPIKE_BACK_IMG = `assets/images/spikeBack.png`;

const VAULT_IMG = `assets/images/vault.png`;
const FIST_DIAGRAM_IMG = `assets/images/fistDiagram.png`;
const FIST_IMG = `assets/images/fist.png`;


let state = `level_2`; // start, level_1, level_2, limbo, end

// Level variables
let startedLevel_1 = 0; // 0, 1, 2
let level_1Rect = undefined;
let startedLevel_2 = 0; // 0, 1, 2
let level_2Rect = undefined;
let loaded = false;
let inPlay = false;
let injured = 0;

// Canvas & background variables
let canvasBase;
// ml5 variables
let videoImg, video;
let user;
let poseNet;
let pose;
let poses = [];
// Text variables
let textBase;

// Image variables: Start
let img = {
  x: 200,
  y: 150,
  sizeSmall: 0.6,
  sizeBig: 1.2,
  heartX: 250,
  heartY: 480,
};
let heartImg, heart;
// Image variables: Level_1
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
// Image variables: level_2
let vaultImg, vault;
let fistDiagramImg, fistDiagram;
let fistImg, fist;


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
  // Load unicorns images in array
  for (let i = 0; i < NUM_UNICORN_IMG; i++) {
    let unicornImage = loadImage(`${UNICORN_IMG}${i}.png`);
    unicornImages.push(unicornImage);
  }

  vaultImg = loadImage(`${VAULT_IMG}`);
  fistDiagramImg = loadImage(`${FIST_DIAGRAM_IMG}`);
  fistImg = loadImage(`${FIST_IMG}`);
} // END PRELOAD


// SETUP
function setup() {
  // create canvas
  canvasBase = new CanvasAndBg;
  canvasBase.canvas_0;
  level_1Rect = createGraphics(canvasBase.canvas_1.w, canvasBase.canvas_1.h);
  level_2Rect = createGraphics(canvasBase.canvas_2.w, canvasBase.canvas_2.h);

  canvasBase.bgOrange;
  // create text
  textBase = new TextBase;
  // create images
  imagesSetup();
} // END SETUP

function imagesSetup() {
  heart = new ImgBase(img.heartX, img.heartY, heartImg, img.sizeBig);
  aceBody = new Body(img.x, img.y, aceBodyImg, img.sizeSmall);
  aceHeadAngry = new ImgBase(img.x, img.y, aceHeadAngry, img.sizeSmall);
  aceHead = new ImgBase(width / 2, height / 2, aceHeadImg);
  // aceKick = new Body(100, 100, aceKickImg);
  spike = new ImgBase(img.heartX + 50, img.heartY - 60, spikeImg, img.sizeSmall);
  alpaca = new ImgBase(img.heartX - 20, img.heartY, alpacaImg, img.sizeSmall + 0.2);
  spikeBack = new User(spikeBackImg, level_1Rect);
  // unicorns
  unicornAceFront = new Unicorn(unicornAceFrontImg, level_1Rect);
  unicornAce = new Unicorn(unicornAceImg, level_1Rect);
  // setup unicorn images
  // while(unicorns.length < NUM_UNICORNS){
  for (let i = 0; i < NUM_UNICORNS; i++) {
    let unicorn = new Unicorn(random(unicornImages), level_1Rect);

    // let overlapping = false;
    // // let protection = 0;
    // for (let j = 0; j< unicorns.length; j++) {
    //   let other = unicorns[j];
    //   let d = dist(unicorn.randomX, unicorn.randomY, other.randomX, other.randomY)
    //   if (d < unicorn.randomW + other.randomW || d < unicorn.randomH + other.randomW) {
    //     overlapping = true;
    //     break;
    //   }
    // }
    // if (!overlapping) {
      unicorns.push(unicorn);
    }
// }

  user = new User(spikeBackImg, level_1Rect);
  vault = new ImgBase(level_2Rect.width / 2, level_2Rect.height / 2, vaultImg, 1.5, level_2Rect);
  fistDiagram = new ImgBase(width / 2, level_2Rect.height, fistDiagramImg, 0.8, level_2Rect);
  fist = new ImgBase(0, 0, fistImg, 0.5, level_2Rect);
  videoImg = new ImgBase(-310, 150, video, level_2Rect);
}

// set interval for pushing images out randomly
setInterval(function() {
  if (unicornsFront.length < NUM_UNICORNSFRONT) {
    let unicornFront = new Unicorn(random(unicornFrontImages), level_1Rect);
    unicornsFront.push(unicornFront);
  }
}, randomNumber(2000, 10000));


// POSENET
function loadPosenet() {
  // start video and hide video element
  video = createCapture(VIDEO);
  video.hide();
  // get poses
  poseNet = ml5.poseNet(video, {
    flipHorizontal: true
  }, function() {
    console.log(`PoseNet loaded`);
    loaded = true;
  });
  // turn on poseNet
  poseNet.on('pose', function(results) {
    poses = results;
    // console.log(poses);
  });
} // END POSENET


// DRAW
function draw() {
  canvasBase.bgOrange();

  if (state === `start`) {
    start();
  } else if (state === `level_1`) {
    level_1();
  } else if (state === `level_2`) {
    level_2();
  } else if (state === `limbo`) {
    limbo();
  } else if (state === `end`) {
    end();
  }

} // END DRAW

// START
function start() {
  displayStartText();
  displayStartImg();
}

// LEVEL_1
function level_1() {
  // display text & image if FaceMesh is loading
  if (!loaded) {
    displayLevel_1Start();
  }
  // Load FaceMesh Once
  if (startedLevel_1 === 0) {
    level_1Rect.background(canvasBase.bgTeal.r, canvasBase.bgTeal.g, canvasBase.bgTeal.b);
    loadPosenet();
    startedLevel_1 = 1;
  }
  // add start/pause instruction after FaceMesh is loaded
  else if (startedLevel_1 == 1 && loaded) {
    displayLevel_1Start();
  }
  // play once "space" is pressed
  else if (startedLevel_1 == 2) {
    if (inPlay) {
      level_1Play();
    } else {
      level_1Rect.clear();
      level_1Rect.background(canvasBase.bgTeal.r, canvasBase.bgTeal.g, canvasBase.bgTeal.b);
      displayLevel_1Start();
    }
  }
} // END LEVEL_1

// LEVEL_2
function level_2() {
  if (!loaded) {
    showLevel_1Graphics();
    textBase.displayPause(); //TEST
  }
  // Load PoseNet & createGraphics
  if (startedLevel_2 === 0) {
    level_1Rect.background(canvasBase.bgTeal.r, canvasBase.bgTeal.g, canvasBase.bgTeal.b);
    level_2Rect.background(canvasBase.bgRed.r, canvasBase.bgRed.g, canvasBase.bgRed.b);
    loadPosenet(); /// TESTING
    startedLevel_2 = 1;
  } else if (startedLevel_2 == 1) {
    showLevel_1Graphics();

    if (inPlay) {



      level_2Play();
    } else {
      textBase.displayPause(); //TEST
    }
  }
} // END LEVEL_2


// ********** START FUNCTIONS ***************************
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
// ********** END -  START FUNCTIONS ********************


// ********** LEVEL_1 FUNCTIONS *************************
function displayLevel_1Start() {
  user.displayStatic();
  textBase.displayLevel_1Title();
  textBase.displayLevel_1Tips();
  unicornAce.displayStatic();
  if (!loaded) {
    textBase.displayLoading();
  } else {
    textBase.displayPause();
  }
}

function level_1Play() {
  //reset rect_1:
  level_1Rect.clear();
  level_1Rect.background(canvasBase.bgTeal.r, canvasBase.bgTeal.g, canvasBase.bgTeal.b);

  if (poses.length > 0) {
    updateUser(poses[0]);
  }
  showUnicornsFront(); // display unicorns
  //display unicornAce after 15s
  if (millis() > 35000)
    showUnicornAceFront(); // display unicornAce

  // draw rect_1
  imageMode(CORNER);
  image(level_1Rect, canvasBase.canvas_1.x, canvasBase.canvas_1.y);
}

function showUnicornsFront() {
  // display injured counted
  level_1Rect.push();
  level_1Rect.fill(0);
  level_1Rect.text(injured, 200, 200);
  level_1Rect.pop();

  for (let i = 0; i < unicornsFront.length; i++) {
    let unicornFront = unicornsFront[i];
    unicornFront.move();
    // check if unicorn touches user
    let d = dist(unicornFront.x, unicornFront.y, user.displayX, user.y - unicornFront.safeDist);
    if (d < unicornFront.safeDist && unicornFront.istouched === false) {
      injured += 1;
      unicornFront.istouched = true;
    }
    if (injured > 3) {
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
    let d = dist(unicornAceFront.x, unicornAceFront.y, user.displayX, user.y - unicornAceFront.safeDist);
    if (d < unicornAceFront.safeDist) {
      state = `level_2`;
    }
  }
  unicornAceFront.moveWrapAce();
  unicornAceFront.display();
}

function updateUser(poses) {
  user.updateNose(poses);
  user.update(poses);
  user.display();
}
// ********** END - LEVEL_1 FUNCTIONS *******************


//********** LEVEL_2 FUNCTIONS **************************
function showLevel_1Graphics() {
  // level_1Rect.clear();
  level_1Rect.background(canvasBase.bgTeal.r, canvasBase.bgTeal.g, canvasBase.bgTeal.b);
  // draw unicorns
  for (let i = 0; i < unicorns.length; i++) {
    let unicorn = unicorns[i];
    unicorn.moveRandom();
    unicorn.displayRandom();
  }
  // draw rect_1
  imageMode(CORNER);
  image(level_1Rect, canvasBase.canvas_1.x, canvasBase.canvas_1.y);

  // draw rect_2
  imageMode(CORNER);
  image(level_2Rect, canvasBase.canvas_2.x, canvasBase.canvas_2.y);
  textBase.displayLevel_2Title();
  textBase.displayLevel_2Tips();
  fistDiagram.displayFistDiagram();
}

function level_2Play() {
  //reset rect_2:
  level_2Rect.clear();
  level_2Rect.background(canvasBase.bgRed.r, canvasBase.bgRed.g, canvasBase.bgRed.b);
  if (poses.length > 0) {
    updateUser(poses[0]);
  }
  vault.displayVault(user); // display vault that turns by poses
  fist.displayFists(user); // display hands

  // draw rect_2 and video image
  imageMode(CORNER);
  image(level_2Rect, canvasBase.canvas_2.x, canvasBase.canvas_2.y);
  videoImg.displayVideo();
}

// ********** END - LEVEL_2 FUNCTIONS *******************

function limbo() {
  background(0);
}

function keyPressed() {
  if (state === `start` && keyCode === 32) {
    state = `level_1`;
  }
  if (state === `level_1`) {
    if (startedLevel_1 === 1 && keyCode === 32) {
      startedLevel_1 = 2;
      inPlay = true;
    }
    if (startedLevel_1 === 2 && keyCode === 32) {
      inPlay = !inPlay; // pause
    }
  }
  if (state === `level_2`) {
    if (startedLevel_2 === 0 && keyCode === 32) {
      startedLevel_2 = 1;
      inPlay = true;
    }
    if (startedLevel_2 === 1 && keyCode === 32) {
      inPlay = !inPlay; // pause
    }
  }
}




// random function for FaceMesh
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
