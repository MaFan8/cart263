"use strict";

/**


Multiple Seven Segment Display by  suppergerrie2
https://editor.p5js.org/suppergerrie2/sketches/SkqBEHGs7
*/
// let number = 0;
//
// let sevenSegments = [];
//
// //Set this to whatever you want, program will update.
// let SEVEN_SEGMENT_COUNT = 1;
//
//
// function setup() {
//   // frameRate(5);
//
//   for (let i = 0; i < SEVEN_SEGMENT_COUNT; i++) {
//     let sevenSegment = new SevenSegment;
//     sevenSegments.push(sevenSegment);
//   }
//
//   createCanvas(windowWidth, windowHeight);
// }
//
// function draw() {
//   background(0);
//
//   for (let i = sevenSegments.length - 1; i >= 0; i--) {
//       let reset = sevenSegments.length - 1 - i;
//       let numRestart = pow(10, reset + 1);;
//       let numToDraw = number % numRestart;
//       numToDraw = floor(numToDraw);
//
//
//       sevenSegments[i].display(numToDraw, i, 200, 200);
//       // sevenSegments[i].digit_0(numToDraw, i, 200, 200);
//
//
//       if (number > 9) {
//         number = 0;
//       }else if (numToDraw < 0) {
//         number = 9;
//       }
//     }
// if (number === 4) {
// // something happens
// console.log("hit");
// }
// // console.log(number);
//
//
// }
//
// function getColor(val, shift) {
//   let r = 255;
//   let g = 0;
//   let b = 0;
//   let a = 40 + 255 * ((val >> shift) & 1);
//   return color(r, g, b, a);
// }
//
// function keyPressed() {
//   if (keyCode === ENTER) {
//     number = (number + 1);
//   }
//   if (keyCode === 32) {
//     number = (number - 1);
//   }
// }

// var sourceText = "0123456789";
// var curIndex = 0;
// function setup() {
//   createCanvas(400, 400);
//   // frameRate(10);
// }
// function draw() {
//   background(50);
//   fill(255);
//   textSize(144);
//   textAlign(CENTER, CENTER);
//   text(
//     sourceText.substring(curIndex, curIndex+1),
//     width/2, height/2);
//   if (curIndex > sourceText.length) {
//     curIndex = 0;
//   }
//   if (curIndex < 0) {
//     curIndex = 9;
//   }
// }
//
// function keyPressed() {
//   if (keyCode === ENTER) {
//     curIndex += 1;
//   }
//   if (keyCode === 32) {
//     curIndex = curIndex - 1;
//   }
//   console.log(curIndex);
// }

let go = false;

function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(50);

  let x = width / 2;
  let y = height / 2;
  let size = 50;
  fill(255);
  ellipse(x, y, size);
  if (go) {
    size += 1;
  }
}
function keyPressed() {
  if (keyCode === ENTER) {
    go = true;
  }
}

/**
Global Stealth Inc.
Maple

An operative's access to their assignment.

References:
Pippin Barr
Febuary 4, 2021
Spy Profile Generator
Source Code

Uses:
Darius Kazemi's corpora project:
https://github.com/dariusk/corpora/

annyang
https://www.talater.com/annyang/

*/

//GLOBAL CONSTANTS

// const USER_DATA_KEY = `user-data`;
//
// const textPosition = {
//   w: 100,
//   h: 100
// };
//
// let userAccount = {
//   name: ``,
//   passcode: ``,
// }
// let currentInstruction = ``;
// let currentNameAnswer = ``;
// let attemptsLeft = 3;
// let correct = false;
// let denied;
// let retrieved;
//
//
// // let showText = false;
// let name;
// let instructionSpoken = false;
//
//
// let state = `launch`;
//
//
// // SETUP
// function setup() {
//   createCanvas(windowWidth, windowHeight);
//
//   // text defaults
//   textFont(`Courier, monospace`);
//   textSize(24);
//   textAlign(LEFT, TOP);
//
//   setTimeout(speakNamePrompt, 2000);
//
// } // END SETUP
//
// function speakNamePrompt() {
//   let promptName = `Declare your name.`;
//   responsiveVoice.speak(promptName, "US English Female", {
//     pitch: 0,
//     rate: 1,
//     volume: 0.5,
//     onstart: function() {
//       showSpeaking(promptName);
//     },
//     onend: loadAnnyang,
//   });
// }
//
// function showSpeaking(promptName) {
//   currentInstruction = promptName;
// }
//
// function speakDenied() {
//   let promptDenied = `PASSCODE RETRIEVAL DENIED`;
//   responsiveVoice.speak(promptDenied, "US English Female", {
//     pitch: 0,
//     rate: 1,
//     volume: 0.5,
//     onstart: function() {
//       showSpeaking(promptDenied);
//     },
//   });
// }
//
// function showSpeaking(promptDenied) {
//   denied = promptDenied;
// }
//
// function speakRetrieved() {
//   let promptRetrieved = `** IDENTITY VERIFIED... **\n *** PASSCODE RETRIEVED ***`;
//   responsiveVoice.speak(promptRetrieved, "US English Female", {
//     pitch: 0,
//     rate: 1,
//     volume: 0.5,
//     onstart: function() {
//       showSpeaking(promptRetrieved);
//     },
//   });
// }
//
// function showSpeaking(promptRetrieved) {
//   retrieved = promptRetrieved;
// }
//
// function loadAnnyang() {
//   // load ANNYANG
//   if (annyang) {
//     let commands = {
//       '*name': setName,
//     };
//     annyang.addCommands(commands);
//     annyang.start();
//   }
// }
//
// function setName(name) {
//   instructionSpoken = true;
//   currentNameAnswer = name.toUpperCase();
//
//   if (currentNameAnswer === `FUZZY'S`) {
//     annyang.abort(); // stop Annyang
//     speakRetrieved();
//     // generate random passcode
//     setTimeout(generatePasscode, 3000);
//     currentNameAnswer = `FUZZY`;
//     correct = true;
//   } else {
//     console.log("wrong");
//     attemptsLeft -= 1;
//   }
//   if (attemptsLeft <= 0) {
//     speakDenied();
//     annyang.abort(); // stop Annyang
//
//   }
// }
//
// function generatePasscode() {
//   userAccount.passcode = int(random(10, 1000000));
// }
//
//
// function draw() {
//   background(0);
//
//   if (state === `launch`) {
//     vaultMoniter();
//     if (!instructionSpoken) {
//       displayCurrentInstruction();
//     }
//
//       if (attemptsLeft <= 2) {
//         displayAttempts();
//       } else if (attemptsLeft < 0) {
//         displayDenied();
//       }
//       if (correct) {
//         console.log("win");
//       }
//       displayRetrieved();
//     }
//
//   } // END DRAW
//
//
//
//   function vaultMoniter() {
//     let account = `<< RETRIEVE YOUR ACCOUNT >>
//
//   Name: ${currentNameAnswer}
//   Your Passcode is: ${userAccount.passcode}`
//
//     push();
//     fill(255, 182, 0);
//     text(account, textPosition.w, textPosition.h);
//     pop();
//   }
//
//
//   function displayCurrentInstruction() {
//     push();
//     fill(255);
//     textSize(40);
//     rectMode(CENTER);
//     textAlign(CENTER, TOP);
//     text(currentInstruction, width / 2, height / 2);
//     pop();
//   }
//
//   function displayAttempts() {
//     push();
//     fill(255);
//     textSize(25);
//     rectMode(CENTER);
//     textAlign(CENTER, TOP);
//     text(`Attempts Left: ${attemptsLeft}`, width / 2, height / 2 - 50);
//     pop();
//   }
//
//   function displayDenied() {
//     push();
//     fill(255);
//     textSize(40);
//     rectMode(CENTER);
//     textAlign(CENTER, TOP);
//     text(denied, width / 2, height / 2);
//     pop();
//   }
//
//
//   function displayRetrieved() {
//     push();
//     fill(255);
//     textSize(40);
//     rectMode(CENTER);
//     textAlign(CENTER, TOP);
//     text(retrieved, width / 2, height / 2);
//     pop();
//   }
