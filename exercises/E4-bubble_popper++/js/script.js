"use strict";

/**
Bubble Popper++
Maple Sung

Use hand to cut the ballon free, blow it around until it reaches the pop zone where user claps to pop the bubble.

References:
Based on Pippin Barr's Bubble Popper
https://github.com/pippinbarr/cart263-2021/tree/main/examples/ai/bubble-popper/
*/

let state = `running`; // loading, running

let video = undefined;
let modelName = `Handpose`;
let handpose = undefined;

let classifier;
let soundModel =
  `https://teachablemachine.withgoogle.com/models/2msNc-lvl/model.json`;
let option = {
  probabilityThreashold: 0.7
};
let label = undefined;

let string = undefined;
let stringCut = false;
let bubble = undefined;
let bubblePopped = false;
let popZone = undefined;
let displayText = ``;

let predictions = [];
let scissorShow = true;

let bladeIndex = {
  tip: {
    x: undefined,
    y: undefined
  },
  base: {
    x: undefined,
    y: undefined,
  }
};
let bladeIndexTipX = undefined;
let bladeIndexTipY = undefined;
let bladeIndexBaseX = undefined;
let bladeIndexBaseY = undefined;

let predictionStart = true;

let bladeMiddleFinger = {
  tip: {
    x: undefined,
    y: undefined
  },
  base: {
    x: undefined,
    y: undefined,
  }
};
let bladeMiddleFingerTipX = undefined;
let bladeMiddleFingerTipY = undefined;
let bladeMiddleFingerBaseX = undefined;
let bladeMiddleFingerBaseY = undefined;

// PRELOAD
function preload() {
  // load soundModel
  classifier = ml5.soundClassifier(soundModel, option);
} // END PRELOAD


// SETUP
function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();

  // load handpose model
  handpose = ml5.handpose(video, {
    flipHorizontal: true
  }, function() {
    state = `running`;
    console.log(`model loaded`);
  });

  // listen for predictions
  handpose.on('predict', function(results) {
    predictions = results;
  })

  // start listening for soundModel
  classifier.classify(gotResult);


  //string
  string = {
    fill: (255),
    width: 1,
    height: height,
  };
  //bubble
  bubble = {
    x: random(100, width - 100),
    y: random(height / 3, height / 2),
    size: 80,
    vx: random(-1, 1),
    vy: -0.5,
    change: 0.02,
    speed: 1,
  };

  // pop zone
  popZone = {
    x: random(100, width - 100),
    y: random(100, height - 100),
    size: 140,
  };
  resetpopZone();

} // END SETUP

function resetpopZone() {
  let d = dist(bubble.x, bubble.y, popZone.x, popZone.y);
  if (d < bubble.size/2 + popZone.size/2) {
    popZone.x = random(100, width - 100);
    popZone.y = random(100, height - 100);
}
}

// DRAW
function draw() {

  if (state === `loading`) {
    loading();
  } else if (state === `running`) {
    running();




  if (label === `Blow`) {
    bubble.vx += random(0, 1);
    bubble.vy += random(0, 1);
  }

  let d = dist(bubble.x, bubble.y, popZone.x, popZone.y);
  if (label === `Snap`) {
      push();
      fill(255);
      textAlign(CENTER);
      textSize(150);
      text(`*`, popZone.x, popZone.y +80);
      pop();

      if (d < 50 && label === `Snap`){
        bubblePopped = true;
      }
    }

  }
} // END DRAW


function loading() {
  push();
  textSize(32);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`Loading ${modelName}...`, width / 2, height / 2);
  pop();
}

function running() {
  background(0);

  // Check if there are current predictions (hand)
  if (predictions.length > 0 && scissorShow) {
    updateScissors(predictions[0]); // index and middle finger

    checkScissorCut();
    displayScissors();
  }

  checkStringIsCut(); // check string status
  if (!bubblePopped) {
  checkBounceOfWalls(); // bubble bounces within window
  displayBubble();
}

  displayPopZone();


}

function updateScissors(prediction) {
  bladeIndex.tip.x = prediction.annotations.indexFinger[3][0];
  bladeIndex.tip.y = prediction.annotations.indexFinger[3][1];
  bladeIndex.base.x = prediction.annotations.indexFinger[0][0];
  bladeIndex.base.y = prediction.annotations.indexFinger[0][1];

  bladeMiddleFinger.tip.x = prediction.annotations.middleFinger[3][0];
  bladeMiddleFinger.tip.y = prediction.annotations.middleFinger[3][1];
  bladeMiddleFinger.base.x = prediction.annotations.middleFinger[0][0];
  bladeMiddleFinger.base.y = prediction.annotations.middleFinger[0][1];

  // stablize points
  if (predictionStart === true) {
    bladeIndexTipX = bladeIndex.tip.x;
    bladeIndexTipY = bladeIndex.tip.y;
    bladeIndexBaseX = bladeIndex.base.x;
    bladeIndexBaseY = bladeIndex.base.y;

    bladeMiddleFingerTipX = bladeMiddleFinger.tip.x;
    bladeMiddleFingerTipY = bladeMiddleFinger.tip.y;
    bladeMiddleFingerBaseX = bladeMiddleFinger.base.x;
    bladeMiddleFingerBaseY = bladeMiddleFinger.base.y;

    predictionStart = false;
  } else {
    bladeIndexTipX = lerp(bladeIndexTipX, bladeIndex.tip.x, 0.5);
    bladeIndexTipY = lerp(bladeIndexTipY, bladeIndex.tip.y, 0.5);
    bladeIndexBaseX = lerp(bladeIndexBaseX, bladeIndex.base.x, 0.5);
    bladeIndexBaseY = lerp(bladeIndexBaseY, bladeIndex.base.y, 0.5);

    bladeMiddleFingerTipX = lerp(bladeMiddleFingerTipX, bladeMiddleFinger.tip.x, 0.5);
    bladeMiddleFingerTipY = lerp(bladeMiddleFingerTipY, bladeMiddleFinger.tip.y, 0.5);
    bladeMiddleFingerBaseX = lerp(bladeMiddleFingerBaseX, bladeMiddleFinger.base.x, 0.5);
    bladeMiddleFingerBaseY = lerp(bladeMiddleFingerBaseY, bladeMiddleFinger.base.y, 0.5);
  }
}

function checkScissorCut() {
  // check if scissors are between string length
  if (bladeIndex.tip.y > bubble.y + bubble.size / 2 &&
    bladeMiddleFinger.tip.y > bubble.y + bubble.size / 2) {
    // tips and bases of index finger surrounds bubble.x position
    if ((bladeIndex.tip.x > bubble.x + bubble.size / 2 &&                 bladeIndex.base.x < bubble.x - bubble.size / 2) || (bladeIndex.tip.x < bubble.x - bubble.size / 2 &&
    bladeIndex.base.x > bubble.x + bubble.size / 2)) {
      // check if index + middle fingers are touching
      let d = dist(bladeIndex.tip.x, bladeIndex.tip.y, bladeMiddleFinger.tip.x, bladeMiddleFinger.tip.y);
      if (d < 25) {
        stringCut = true;
      }
    }
  }
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  } else if (stringCut) {
    console.log(results[0]);
    label = results[0].label;
  }
}

function checkStringIsCut() {
  if (!stringCut) {
    displayString();
  } else {
    video.stop();
    scissorShow = false;
    moveBubble();
  }
}

function checkBounceOfWalls() {
  if (bubble.x + bubble.size / 2 > width) {
    bubble.vx = -bubble.vx;
  }
  if (bubble.x - bubble.size / 2 < 0) {
    bubble.vx = +0.5;
  }
  if (bubble.y + bubble.size / 2 > height) {
    bubble.vy = -bubble.vy;
  }
  if (bubble.y - bubble.size / 2 < 0) {
    bubble.vy = +0.5;
  }
}

function moveBubble() {
  bubble.x += bubble.vx;
  bubble.y += bubble.vy;
}

function displayString() {
  push();
  noStroke();
  fill(string.fill);
  rectMode(CORNER);
  rect(bubble.x + sin(frameCount / 10), bubble.y, string.width, string.height);
  pop();
}

function displayBubble() {
  push();
  fill(0, 100, 200);
  noStroke();
  ellipse(bubble.x, bubble.y, bubble.size + sin(frameCount / 5),
    bubble.size + cos(frameCount / 5));
  pop();
}

function displayPopZone() {
  push();
  noFill();
  stroke(128)
  ellipse(popZone.x, popZone.y, popZone.size);
  pop();

}

function displayScissors() {
  let tipDist = dist(bladeIndex.tip.x, bladeIndex.tip.y, bladeMiddleFinger.tip.x, bladeMiddleFinger.tip.y);
  let baseDist = dist(bladeIndex.base.x, bladeIndex.base.y, bladeMiddleFinger.base.x, bladeMiddleFinger.base.y);

  push();
  noFill();
  stroke(255);
  strokeCap(ROUND);
  strokeWeight(5);
  line(bladeIndexTipX, bladeIndexTipY + tipDist/2, bladeIndexBaseX, bladeIndexBaseY);
  line(bladeMiddleFinger.tip.x, bladeMiddleFinger.tip.y, bladeIndex.base.x, bladeIndex.base.y);
  pop();

  // hinge
  push();
  fill(255,0,0);
  ellipseMode(CENTER);
  ellipse(bladeIndex.base.x, bladeIndex.base.y, baseDist/2);
  pop();
}
