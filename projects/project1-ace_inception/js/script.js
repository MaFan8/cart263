"use strict";

/**
Ace Inception
Maple Sung

A game that enlists the user's help to infiltrate Ace's subconsious to implant an idea.

Uses:
ml5.js Posenet:
https://ml5js.org/reference/api-PoseNet/
Annyang:
https://www.talater.com/annyang/
ResponsiveVoice:
https://responsivevoice.org/api/

Sounds:
RyusaWorks - Drip Drop Plop
https://freesound.org/s/531143/
Kayasavas87 - Comical Grunts
https://freesound.org/s/70757/
mikewest - large rope pulley
https://freesound.org/s/394222/
discountrainbows = Fruitloop
https://freesound.org/people/discountrainbows/sounds/465746/
Matrixx_ - Portal_01
https://freesound.org/s/461012/
Setuniman  - Pomptp q46k
https://freesound.org/s/149347/
LittleRobotSoundFactory - Jingle Win Synth 01
https://freesound.org/s/274179/
andersmmg - Ding2
https://freesound.org/s/523425/
suntemple - Acvess DENIED
https://freesound.org/s/249300/


References:
Daniel Shiffman - Starfield
http://codingtra.in

*/

// Global constants
const HEART_IMG = `assets/images/heart.png`;
const ACE_HEAD_IMG = `assets/images/acehead.png`;
const ACE_HEAD_ANGRY_IMG = `assets/images/acehead_angry.png`;
const ACE_BODY_IMG = `assets/images/acebody.png`;
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
const SPIKE_BACK_IMG = `assets/images/spikeback.png`;
const NUM_SPIKE = 6;
const NUM_DOPEY_SPIKE = 80;
const VAULT_IMG = `assets/images/vault.png`;
const FIST_DIAGRAM_IMG = `assets/images/fistdiagram.png`;
const FIST_IMG = `assets/images/fist.png`;

// STATE
let state = `start`; // start, level_1, level_2, limbo, end

// Level variables
let startedLevel_1 = 0; // 0, 1, 2
let level_1Rect = undefined;
let startedLevel_2 = 0; // 0, 1, 2, 3, 4, 5
let level_2Rect = undefined;
let startedLimbo = 0; //0, 1, 2, 3
let limboRect = undefined;
let loaded = false;
let inPlay = false;
let paused = true;
let escapedLimbo = false;

// Canvas & background variables
let canvasBase;
// External libraries
let extLibrary;

// Library variables: ml5 Posenet, annyang, ResponsiveVoice
let videoImg, video;
let user;
let poseNet;
let callback;
let poses = [];
let name;
let insctructionSpoken = false;

// sound variables
let isPlayingSound = false;
let fruitloop;
let enterDream;
let pauseSound;
let levelUp;
let monkey;
let ding;
let wrongAnswer;
let dailSound;
let dailTurn;
let limboSound;
let ahhSound;

// Text variables
let textBase;
let chosenNumbers = [];
let chosenNumLength = 6;

// Image variables: Start
let stars = [];
let numStars = 800;
let img = {
  x: 200,
  y: 150,
  sizeSmall: 0.6,
  sizeBig: 1.2,
  heartX: 250,
  heartY: 480,
  kickX: 100,
  kickY: 100,
  spikeX: undefined,
  spikeY: undefined,
  spacing: 50,
};
let heartImg, heart, heartEnd;
// Image variables: Level_1
let aceHeadImg, aceHeadEnd;
let aceHeadAngryImg, aceHeadAngry;
let aceBodyImg, aceBody;
let aceKickImg, aceKickEnd;
let spikeImg, spike, spikeEnd;
let dopeySpikes = [];
let spikeBackImg, spikeBack;
let spikeBackEnds = [];
let alpacaImg, alpaca, alpacaVault, alpacaEnd;
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

// PRELOAD *********************************************************************
function preload() {
  // Load LEVEL_1 Images
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
  // Load LEVEL_2 Images
  vaultImg = loadImage(`${VAULT_IMG}`);
  fistDiagramImg = loadImage(`${FIST_DIAGRAM_IMG}`);
  fistImg = loadImage(`${FIST_IMG}`);

  // Sounds
  fruitloop = loadSound(`assets/sounds/fruitloop.wav`);
  enterDream = loadSound(`assets/sounds/enter.wav`);
  pauseSound = loadSound(`assets/sounds/pause.wav`);
  levelUp = loadSound(`assets/sounds/levelup.wav`);
  monkey = loadSound(`assets/sounds/ritomonkey.wav`);
  ding = loadSound(`assets/sounds/ding.wav`);
  dailSound = loadSound(`assets/sounds/dail.wav`);
  wrongAnswer = loadSound(`assets/sounds/wronganswer.wav`);
  dailTurn = loadSound(`assets/sounds/dailturn.wav`);
  limboSound = loadSound(`assets/sounds/limbo.wav`);
  ahhSound = loadSound(`assets/sounds/ahh.wav`);

} // END PRELOAD  **************************************************************

// SETUP  **********************************************************************
function setup() {
  fruitloop.loop(0, 1.2, 1); // start game sound
  // create canvas & background
  canvasBase = new CanvasAndBg();
  canvasBase.canvasStart();
  level_1Rect = createGraphics(canvasBase.canvas_1.w, canvasBase.canvas_1.h);
  level_2Rect = createGraphics(canvasBase.canvas_2.w, canvasBase.canvas_2.h);
  limboRect = createGraphics(canvasBase.canvas_3.w, canvasBase.canvas_3.h);

  // create library setup
  extLibrary = new ExternalLibraries();

  // create text
  textBase = new TextBase();
  // create images
  imagesSetup();
} // END SETUP  ****************************************************************

// CREATE IMAGES
function imagesSetup() {
  // START & LEVEL_1 images
  for (let i = 0; i < numStars; i++) {
    stars[i] = new Star();
  }
  heart = new ImgBase(img.heartX, img.heartY, heartImg, img.sizeBig);
  heartEnd = new ImgBase(width/3, height / 3, heartImg, 1);
  aceBody = new Body(img.x, img.y, aceBodyImg, img.sizeSmall);
  aceHeadAngry = new ImgBase(img.x, img.y, aceHeadAngry, img.sizeSmall);
  aceHeadEnd = new ImgBase(width / 2 +50, height / 3, aceHeadImg, 1);
  aceKickEnd = new Body(width / 2 , height / 2 - 80, aceKickImg, 1);
  spike = new ImgBase(img.heartX + 50,img.heartY - 60,spikeImg,img.sizeSmall);
  spikeEnd = new ImgBase(width / 3 + 120, height / 3, spikeImg, img.sizeSmall);
  // Array of Spike images
  for (let i = 0; i < NUM_DOPEY_SPIKE; i++) {
    let dopeySpike = new Unicorn(spikeImg, level_2Rect);
    dopeySpikes.push(dopeySpike);
  }
  alpaca = new ImgBase(img.heartX - 20,img.heartY,alpacaImg,img.sizeSmall + 0.2);
  alpacaVault = new Unicorn(alpacaImg, level_2Rect);
  alpacaEnd = new ImgBase(width / 4 + 120, height / 2.5, alpacaImg, 1);
  spikeBack = new User(spikeBackImg, level_1Rect);
  for (let i = 0; i < NUM_SPIKE; i++) {
    let spikeBackEnd = new Unicorn(spikeBackImg);
    spikeBackEnds.push(spikeBackEnd);
  }
  // unicorns
  unicornAceFront = new Unicorn(unicornAceFrontImg, level_1Rect);
  unicornAce = new Unicorn(unicornAceImg, level_1Rect);
  // setup unicorn images
  for (let i = 0; i < NUM_UNICORNS; i++) {
    let unicorn = new Unicorn(random(unicornImages), level_1Rect);
    unicorns.push(unicorn);
  }
  // LEVEL_2 Images
  user = new User(spikeBackImg, level_1Rect);
  vault = new ImgBase(level_2Rect.width / 2, level_2Rect.height / 2, vaultImg, 1.5, level_2Rect);
  fistDiagram = new ImgBase(width / 2, level_2Rect.height, fistDiagramImg, 0.8, level_2Rect);
  fist = new ImgBase(0, 0, fistImg, 0.5, level_2Rect);
  videoImg = new ImgBase(0, 0, video, 1, level_2Rect);
} // END CREATE IMAGES

// set interval for displaying images out randomly
setInterval(function () {
  if (unicornsFront.length < NUM_UNICORNSFRONT) {
    let unicornFront = new Unicorn(random(unicornFrontImages), level_1Rect);
    unicornsFront.push(unicornFront);
  }
}, randomNumber(2000, 10000));

// POSENET  ********************************************************************
function loadPosenet() {
  // start video and hide video element
  video = createCapture(VIDEO);
  video.hide();
  // get poses
  poseNet = ml5.poseNet(
    video,
    {
      flipHorizontal: true,
    },
    function () {
      console.log(`PoseNet loaded`);
      loaded = true;
    }
  );
  callback = function (results) {
    poses = results;
    // console.log(poses);
  };
  // turn on poseNet
  poseNet.on("pose", callback);
} // END POSENET ***************************************************************

// DRAW ************************************************************************
function draw() {
  background(canvasBase.bgOrange.r, canvasBase.bgOrange.g, canvasBase.bgOrange.b);

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

} // END DRAW ******************************************************************

// START
function start() {
  displayStartText();
  displayStartImg();
} // END START

// LEVEL_1
function level_1() {
  // display text & image if Posenet is loading
  if (!loaded) {
    displayLevel_1Start();
  }
  // Load Posenet Once
  if (startedLevel_1 === 0) {
    level_1Rect.background(canvasBase.bgTeal.r, canvasBase.bgTeal.g, canvasBase.bgTeal.b);
    loadPosenet(); // load POSENET
    startedLevel_1 = 1;
  }
  // add start/pause instruction after Posenet is loaded
  else if (startedLevel_1 === 1 && loaded) {
    // display start until keypressed to switch to 2
    displayLevel_1Start();
  } else if (startedLevel_1 === 2) {
    // if inPlay, display level_1Play simulation
    if (inPlay) {
      level_1Play();
    }
    // else clear drawing and display level_1 Start
    else {
      level_1Rect.clear();
      level_1Rect.background(canvasBase.bgTeal.r, canvasBase.bgTeal.g, canvasBase.bgTeal.b);
      displayLevel_1Start();
    }
  }
} // END LEVEL_1

// LEVEL_2
function level_2() {
  // Load & create background
  if (startedLevel_2 === 0) {
    level_1Rect.background(canvasBase.bgTeal.r, canvasBase.bgTeal.g, canvasBase.bgTeal.b);
    level_2Rect.background(canvasBase.bgRed.r, canvasBase.bgRed.g, canvasBase.bgRed.b);
    showLevel_1Graphics(); // show level_1Graphics behind level_2
    startedLevel_2 = 1;
  }
  // display until keypressed to switch to state: 2
  else if (startedLevel_2 === 1) {
    showLevel_1Graphics();
  }
  // load program to get passcode
  else if (startedLevel_2 === 2) {
    // if inPlay,
    if (inPlay) {
      level_2GetPasscode(); // simulate password retrival
      showLevel_1unicorns(); // keep showing level_1 unicorns
    }
    // else clear drawing and display level_2 Start
    else {
      level_2Rect.clear();
      level_2Rect.background(
        canvasBase.bgRed.r,
        canvasBase.bgRed.g,
        canvasBase.bgRed.b
      );
      showLevel_1Graphics(); // keep showing level_1 Graphics
    }
  }
  // load program to access vault
  else if (startedLevel_2 === 3) {
    level_2Play();
  }
  // load when vault is accessed
  else if (startedLevel_2 === 4) {
    level_2VaultIntro();
  } else if (startedLevel_2 === 5) {
    level_2Vault(); // entered vault
  }
} // END LEVEL_2

// LIMBO
function limbo() {
  // if limbo has been started, create setup
  if (startedLimbo === 0) {
    fruitloop.loop(0, 0.9, 1); // play game sound
    // display start & level_2 Background
    background(canvasBase.bgOrangeLevel_1.r, canvasBase.bgOrangeLevel_1.g, canvasBase.bgOrangeLevel_1.b);
    level_2Rect.background(canvasBase.bgRed.r, canvasBase.bgRed.g, canvasBase.bgRed.b);
    startedLimbo = 1;
  }
  // else display limbo start graphics and text
  else if (startedLimbo === 1) {
    canvasBase.tintBgRed(); // tint Red
    showLevel_1unicorns(); // show unicorns underneath on Level_1
    showLimboRectStart(); // draw limboRect with text
  }
  // else play
  else if (startedLimbo === 2) {
    playLimbo();
  }
} // END LIMBO

// ********** START FUNCTIONS **************************************************
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
// ********** END -  START FUNCTIONS *******************************************

// ********** LEVEL_1 FUNCTIONS ************************************************
function displayLevel_1Start() {
  // background
  background(canvasBase.bgOrange.r, canvasBase.bgOrange.g, canvasBase.bgOrange.b);
  canvasBase.tintBgOrange(); // tint backround
  displayStarGraphics(); // display stars on START state
  user.displayStatic();
  textBase.displayLevel_1Title();
  textBase.displayLevel_1Tips();
  unicornAce.displayStatic();
  // display "pause" text according to state
  if (!loaded) {
    textBase.displayLoading();
  } else {
    textBase.displayPause();
  }
}

// Star graphics
function displayStarGraphics() {
  push();
  translate(width / 2, height / 2);
  // Go through array, display and update
  for (var i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
    // if in LIMBO, change color and speed, then constrain it's speed
    if (state === `limbo`) {
      stars[i].fill += -1;
      stars[i].speed += 1;
      stars[i].speed = constrain(stars[i].speed, 0.4, 5);
    }
  }
  pop();
}

// Level_1 Play
function level_1Play() {
  // clear and display background
  level_1Rect.clear();
  level_1Rect.background( canvasBase.bgTeal.r,canvasBase.bgTeal.g,canvasBase.bgTeal.b);
  // detect poses
  if (poses.length > 0) {
    updateUser(poses[0]);
  }
  showUnicornsFront();  // display unicorns
  //display unicornAce after 35s
  if (millis() > 35000) showUnicornAceFront();

  // draw level_1Rect
  imageMode(CORNER);
  image(level_1Rect, canvasBase.canvas_1.x, canvasBase.canvas_1.y);
}

// Front facing Unicorns
function showUnicornsFront() {
  textBase.displayAttempts(); // text showing user attempts
  // Go through unicornsFront array,
  for (let i = 0; i < unicornsFront.length; i++) {
    let unicornFront = unicornsFront[i];
    unicornFront.move();

    // check if unicorn touches user
    let d = dist(unicornFront.x, unicornFront.y, user.displayX, user.y - unicornFront.safeDist);
    // if it is touching,
    if (d < unicornFront.safeDist && unicornFront.isTouched === false) {
      monkey.play(); // play monkey sound
      textBase.attemptsLeft -= 1; // countdown attempts
      unicornFront.isTouched = true;
    }
    // if there are no more attempts, state is LIMBO
    if (textBase.attemptsLeft <= 0) {
      state = `limbo`;
    }

    unicornFront.moveWrap();
    unicornFront.display();
  }
}


function updateUser(poses) {
  user.updateNose(poses);
  user.update(poses);
  user.display();
}

// Front facing ACE UNICORN
function showUnicornAceFront() {
  // if aceUnicorn is running,
  if (!unicornAceFront.isPaused) {
    unicornAceFront.move();

    // check if unicornAce touches user
    let d = dist(unicornAceFront.x, unicornAceFront.y, user.displayX, user.y - unicornAceFront.safeDist);
    // if unicornAce touches user, state is LEVEL_2
    if (d < unicornAceFront.safeDist) {
      levelUp.play(0,1); // play LevelUp sound
      poseNet.removeListener("pose", callback); // Stop POSENET
      video.pause(); // Stop videio
      state = `level_2`;
    }
  }

  unicornAceFront.moveWrapAce();
  unicornAceFront.display();
}

// ********** END - LEVEL_1 FUNCTIONS *******************


//********** LEVEL_2 FUNCTIONS **************************
// show LEVEL_1 Graphics
function showLevel_1Graphics() {
  // display START & LEVEL_1 background and graphics
  background(canvasBase.bgOrangeLevel_1.r, canvasBase.bgOrangeLevel_1.g, canvasBase.bgOrangeLevel_1.b);
  displayStarGraphics();
  level_1Rect.background(canvasBase.bgTeal.r, canvasBase.bgTeal.g, canvasBase.bgTeal.b);
  canvasBase.tintBgTeal(); // tint Level_1 background

  // Go through array, draw and move Unicorns
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
  textBase.displayPause();
}

// LEVEL_1 UNICORNS
function showLevel_1unicorns() {
  // display START & LEVEL_1 background and graphics
  background(canvasBase.bgOrangeLevel_1.r, canvasBase.bgOrangeLevel_1.g, canvasBase.bgOrangeLevel_1.b);
  displayStarGraphics();
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
}

// LEVEL_2 Get Password
function level_2GetPasscode() {
  //reset level_2Rect:
  level_2Rect.clear();
  level_2Rect.background(canvasBase.bgRed.r, canvasBase.bgRed.g, canvasBase.bgRed.b);
  vault.displayVaultStatic(); // display vault
  textBase.vaultMoniter(extLibrary); // display Vault Moniter

  // display speak name until voice is detected
  if (!extLibrary.instructionSpoken) {
    extLibrary.showVoiceInstruction();
  }
  // then if name is correct, show password and speak confirmation of retrieval
  else if (extLibrary.correct && !extLibrary.passcodeSet) {
    setTimeout(function () {
      ding.play(0,1, 1);// play ding sound
      extLibrary.generatePasscode(); // generate passcode and display
      // start 5s countdown
      let counter = 5;
      let timerInterval = setInterval(function () {
        textBase.updateTimer(counter); // update timer text
        loadPosenet(); // Load Posenet
        counter--; // counting down
        if (counter <= 0) {
          clearInterval(timerInterval); // clear setInterval
        }
      }, 1000);
    }, 3000); // generate passcode after 3s
    extLibrary.passcodeSet = true;
  } else {
    extLibrary.showVoiceRetrieved(); // display retrieved text
    textBase.displayLevel_2Timer(); // display timer
  }

  // if 2 or less attempts have been made, show attempts text
  if (extLibrary.attemptsLeft <= 2) {
    extLibrary.displayAttempts(); // display attempts text
  }
  // if there are no more attempt
  if (extLibrary.attemptsLeft <= 0) {
    extLibrary.showVoiceDenied(); // display denied text
    // switch state to LIMBO after 3s
    setTimeout(function () {
      state = `limbo`;
    }, 3000);
  }

  // draw level_2Rect
  imageMode(CORNER);
  image(level_2Rect, canvasBase.canvas_2.x, canvasBase.canvas_2.y);
  // if timer is at 1
  if (textBase.timer === 1) {
    fruitloop.loop(0, 1.2, 1); // start game sound
    responsiveVoice.pause(); // pause responsiveVoice
    startedLevel_2 = 3;
  }
}

// LEVEL_2 Play
function level_2Play() {
  showLevel_1unicorns(); // keep displaying LEVEL_1 graphics
  //reset level_2Rect:
  level_2Rect.clear();
  level_2Rect.background(canvasBase.bgRed.r, canvasBase.bgRed.g, canvasBase.bgRed.b);
  // look for poses
  if (poses.length > 0) {
    updateUser(poses[0]);
  }
  vault.displayVault(user); // display vault that turns by user's pose
  fist.displayFists(user); // display hands
  textBase.checkDail(vault); // check dail movement and translate to currentIndex
  textBase.displayNumber(); // display number from dail Movement
  // if text is present,
  if (textBase.set) {
    textBase.displayChosenNumber(); // display chosen number
    // Check if passcode matches with stored passcode
    if (textBase.stringTest === str(extLibrary.passcode)) {
      levelUp.play(0,1); //play level up Sound
      vault.enter = true; // enter vault
      extLibrary.speakWelcome();// speak Welcome
      // switch state after 3s
      setTimeout(function () {
        poseNet.removeListener("pose", callback); // Stop Posenet from detecting poses
        video.pause();
        video.stop(); // doesn't seem either one works...
        startedLevel_2 = 4;
      }, 3000);
    } else {
      // else if array string has been filled, and wrong, switch to LIMBO
      if (chosenNumbers.length === chosenNumLength) {
        limboSound.play(0,1.1, 0.8); // play limboSound
        // switch state after 3s
        setTimeout(function () {
          state = `limbo`;
        }, 3000);
      }
    }
  }
  // draw level_2Rect and video image
  videoImg.displayVideo();
  imageMode(CORNER);
  image(level_2Rect, canvasBase.canvas_2.x, canvasBase.canvas_2.y);
}

// VAULT INTRO
function level_2VaultIntro() {
  showLevel_1unicorns(); // keep displaying LEVEL_1 graphics
  // clear and create LEVEL_2 backgrouhd
  level_2Rect.clear();
  level_2Rect.background(canvasBase.bgRed.r, canvasBase.bgRed.g, canvasBase.bgRed.b);
  canvasBase.tintBgRed(); //tint red

  // GO through array of dopeySpikes, and display
  for (let i = 0; i < dopeySpikes.length; i++) {
    let dopeySpike = dopeySpikes[i];
    dopeySpike.displayRandomImg();
  }
  textBase.displayVaultText();
  textBase.displayKickTimerLevel_2();
  textBase.infoShown = true;
}

// VAULT inside
function level_2Vault() {
  showLevel_1unicorns(); // keep displaying LEVEL_1 graphics
  // clear and create LEVEL_2 backgrouhd
  level_2Rect.clear();
  level_2Rect.background(canvasBase.bgRedLevel_3.r, canvasBase.bgRedLevel_3.g, canvasBase.bgRedLevel_3.b);
  displayVaultGraphics();
  textBase.displayKickTimerLevel_2(); // show timer
  // if not paused, show vault dail changes and countdown timer
  if (!paused) {
    displayVaultGraphics();
    textBase.kickTimer -= 0.1;
  }
  // if paused and timer not up uet
  if (paused && textBase.kickTimer >= 0) {
    ahhSound.play(0,1, 1); // play relief sound
    repelSpike();
  }
  // else if timer is up, state is LIMBO
  else if (textBase.kickTimer <= 0) {
    limboSound.play(0,1.1, 0.8); // play limboSound
    state = `limbo`;
  }
}

// VAULT graphics inside
function displayVaultGraphics() {
  // Go through dopeySpike arrray,
  for (let i = 0; i < dopeySpikes.length; i++) {
    let dopeySpike = dopeySpikes[i];
    dopeySpike.checkOffScreen(); // check for going off screen
    dopeySpike.moveRandomImg(); // move
    dopeySpike.displayRandomImg(); // display
  }
  alpacaVault.moveRandomImg(); // move alpaca
  alpacaVault.displayRandomImg(); // display alpaca
}

// SPIKE reaction & movement
function repelSpike() {
  // Go through dopeySpike array, move away from alpaca
  for (let i = 0; i < dopeySpikes.length; i++) {
    let dopeySpike = dopeySpikes[i];
    dopeySpike.randomImgX -= (alpacaVault.randomImgX - dopeySpike.randomImgX) / 20;
    dopeySpike.randomImgY -= (alpacaVault.randomImgY - dopeySpike.randomImgY) / 20;
    // if Spike is offScreen, then remove
    if (dopeySpike.imgOffScreen) {
      ahhSound.play(0,1, 1); // play relief sound
      dopeySpikes.splice(i, 1);
      // Once there arn't any left, change states in 3s
      if (i <= 0) {
        setTimeout(function () {
          state = `end`;
        }, 5000);
      }
    }
  }
}

// ********** END - LEVEL_2 FUNCTIONS *******************

//********** LIMBO FUNCTIONS **************************

function showLimboRectStart() {
  // create limboRect & background
  limboRect.background(0);
  textBase.displayLimboText();
  imageMode(CENTER);
  translate(
    canvasBase.canvas_3.x + canvasBase.canvas_3.x / 2,
    canvasBase.canvas_3.y + canvasBase.canvas_3.y
  ); // move to the middle
  rotate(canvasBase.limboAngle);
  image(limboRect, 0, 0);
}

// show LIMBO graphics
function displayLimboGraphics() {
  // Go through array of dopeySpike,
  for (let i = 0; i < dopeySpikes.length; i++) {
    let dopeySpike = dopeySpikes[i];
    dopeySpike.checkOffScreenLimbo(); // check offScreen
    dopeySpike.moveRandomImg(); // move
    dopeySpike.displayRandomImgLimbo(); // display
  }
  alpacaVault.moveRandomImg(); // move alpaca
  alpacaVault.displayRandomImgLimbo(); // display alpaca
}

// LIMBO Play
function playLimbo() {
  // clear and create background
  limboRect.clear();
  showLevel_1unicorns();
  limboRect.background(0);
  translate(
    canvasBase.canvas_3.x + canvasBase.canvas_3.x / 2,
    canvasBase.canvas_3.y + canvasBase.canvas_3.y
  ); // move to the middle
  displayLimboGraphics(); // show LIMBO graphics
  canvasBase.mousePoint(); // show mouse point
  canvasBase.checkInsideRect(); // check if mouse is inside LIMBORect
  // if mouse is inside LIMBO, rotate and set new angle
  if (canvasBase.insideLimbo) {
    rotate(canvasBase.limboRectSpeed);
    canvasBase.angleMode = canvasBase.angleMode + canvasBase.limboRectSpeed;
  }
  // display LimboRect
  imageMode(CENTER);
  angleMode(DEGREES);
  rotate(canvasBase.limboAngle);
  image(limboRect, 0, 0);
  // if alpaca is found, spike will move away from alpaca
  if (escapedLimbo) {
    repelSpikeLimbo();
  }
}

// SPIKE reationg & movement
function repelSpikeLimbo() {
  // Go through array of dopeySpikes and move them away from alpaca
  for (let i = 0; i < dopeySpikes.length; i++) {
    let dopeySpike = dopeySpikes[i];
    dopeySpike.limboImgX -= (alpacaVault.limboImgX - dopeySpike.limboImgX) / 20;
    dopeySpike.limboImgY -= (alpacaVault.limboImgY - dopeySpike.limboImgY) / 20;
    // if Spike is offScreen, remove from array
    if (dopeySpike.offScreen) {
      ahhSound.play(0,1, 1); // play relief sound
      dopeySpikes.splice(i, 1);
      // if there arn't any left, then page is reloaded
      if (i <= 0) {
        setTimeout(function () {
          location.reload();
        }, 3000);
      }
    }
  }
}

// ********** END - LIMBO FUNCTIONS *******************

function end() {
  // background and graphics
  background(canvasBase.bgOrange.r, canvasBase.bgOrange.g, canvasBase.bgOrange.b);
  displayStarGraphics();
  aceKickEnd.display();
  aceHeadEnd.display();
  aceHeadEnd.move();
  heartEnd.displayHeart();
  spikeEnd.display();
  alpacaEnd.display();
  textBase.displayEndTitle();
}

// KEYPRESSED FUNCTIONS
function keyPressed() {
  // SPACE pressed to change from start to level_1
  if (state === `start` && keyCode === 32) {
    state = `level_1`;
  }
  // IN LEVEL_1
  if (state === `level_1`) {
    // SPACE pressed to change from start to level_1
    if (startedLevel_1 === 1 && keyCode === 32) {
      enterDream.play(0, 1.2, 0.3); // play enter sound
      startedLevel_1 = 2;
      inPlay = true;
    }
    // SPACE pressed pause and resume
    else if (startedLevel_1 === 2 && keyCode === 32) {
      pauseSound.play(0,1); //play pause sound
      inPlay = !inPlay; // pause
    }
  }
  // IN LEVEL_2
  if (state === `level_2`) {
    // SPACE pressed to change from 1 to 2
    if (startedLevel_2 === 1 && keyCode === 32) {
      enterDream.play(0, 1.2, 0.3); // play enter sound
      fruitloop.pause(); //pause game sound
      startedLevel_2 = 2;
      inPlay = true;
      extLibrary.timedPrompt(); // speak prompt
    }
    // SPACE pressed pause and resume
    else if (startedLevel_2 === 2 && keyCode === 32) {
      pauseSound.play(0,1); //play pause sound
      inPlay = !inPlay; // pause
    }
    // SPACE pressed to change from 4 to 5
    else if (startedLevel_2 === 4 && keyCode === 32) {
      enterDream.play(0, 1.2, 0.3); // play enter sound
      startedLevel_2 = 5;
      textBase.infoShown = true;
      paused = false;
    }
  }
  // IN LIMBO
  if (state === `limbo`) {
    // SPACE pressed to change from 1 to 2
    if (startedLimbo === 1 && keyCode === 32) {
      enterDream.play(0, 1.3, 0.4); // play enter sound
      startedLimbo = 2;
    }
  }
  // ENTER pressed to log vault dail numbers in monitor
  if (keyCode === ENTER) {
    textBase.set = true;
    if (chosenNumbers.length <= chosenNumLength) {
      chosenNumbers.push(textBase.curIndex);
      dailSound.play(); // play dailSound
    }
  }
}

// mousePressed to find Alpaca in LIMBO and VAULT
function mousePressed() {
  alpacaVault.checkFoundAlpaca(canvasBase);
  alpacaVault.checkFoundAlpacaLimbo(canvasBase);
}

// random function for FaceMesh
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
