"use strict";

/**
The Cleanse Advisor
Maple Sung

Consult the Cleanse Advisor for the betterment of your life.

References:
Pippin Barr
January 28, 2021
Slamina
Source Code

Corpora
january 28, 2021
Landry Care Instructions

Uses:
ResponsiveVoice
https://responsivevoice.org/
annyang
https://www.talater.com/annyang/
*/

const instructions = [
  "Washing -- Instruction: Machine Wash, Normal",
  "Washing -- Instruction: Machine Wash, Cold",
  "Washing -- Instruction: Machine Wash, Warm",
  "Washing -- Instruction: Machine Wash, Hot",
  "Washing -- Instruction: Machine Wash, Permanent Press",
  "Washing -- Instruction: Machine Wash, Gentle or Delicate",
  "Washing -- Instruction: Hand Wash",
  "Washing -- Instruction: Do Not Wash",
  "Bleaching -- Instruction: Bleach When Needed",
  "Bleaching -- Instruction: Non-Chlorine Bleach When Needed",
  "Bleaching -- Instruction: Do Not Bleach",
  "Drying -- Instruction: Tumble Dry, Normal",
  "Drying -- Instruction: Tumble Dry, Normal, Low Heat",
  "Drying -- Instruction: Tumble Dry, Normal, Medium Heat",
  "Drying -- Instruction: Tumble Dry, Normal, High Heat",
  "Drying -- Instruction: Tumble Dry, Normal, No Heat",
  "Drying -- Instruction: Tumble Dry, Permanent Press",
  "Drying -- Instruction: Tumble Dry, Gentle",
  "Drying -- Instruction: Do Not Tumble Dry",
  "Drying -- Instruction: Do Not Dry",
  "Drying -- Instruction: Line Dry",
  "Drying -- Instruction: Drip Dry",
  "Drying -- Instruction: Dry Flat",
  "Drying -- Instruction: Dry In Shade",
  "Drying -- Instruction: Line Dry In Shade",
  "Drying -- Instruction: Dry Flat In Shade",
  "Drying -- Instruction:  Drip Dry In Shade",
  "Wringing -- Instruction:  Do Not Wring",
  "Ironing -- Instruction:  Iron At Low Temperature",
  "Ironing -- Instruction:  Iron At Medium Temperature",
  "Ironing -- Instruction:  Iron",
  "Ironing -- Instruction:  Iron At High Temperature",
  "Ironing -- Instruction:  Do Not Iron",
  "Ironing -- Instruction:  Do Not Steam",
  "Drycleaning -- Instruction:  Dryclean",
  "Drycleaning -- Instruction:  Do Not Dryclean",
];

// Global constants
const title = `Consult the Cleanse Advisor



Tell me 5 things that is in your mind right this moment.

Press 'SPACE' to begin your journey...`;


let words = [];
let numWords = 5;
let currentInstruction = ``;

let userWordDist = 50;

let advisorColor = {
  r: 216,
  g: 216,
  b: 242,
};
let adviceFrame = {
  x: 900,
  y: 500,
}

let userColor = {
  r: 254,
  g: 194,
  b: 63
};

let state = `start`; // could be  start, simulation

// SETUP
function setup() {
  createCanvas(windowWidth, windowHeight);

  if (annyang) {
    let commands = {
      '*word': setWord,
    };
    annyang.addCommands(commands);
    annyang.start();

    fill(userColor.r, userColor.g, userColor.b);
    textSize(30);
    textStyle(BOLD);
    textFont('roboto');
    textAlign(CENTER, CENTER);
    rectMode(CENTER);
  }

} // END SETUP

function setWord(word) {
  words.push(word.toLowerCase());
  // stop listening and speak advice after 5 words
  if (words.length === numWords) {
    annyang.pause();
    speakAdvice();
  }
}

// DRAW
function draw() {
  background(0);

  if (state === "start") {
   start();
 }
 if (state === "simulation") {
   simulation();
 }

} // END DRAW

function start() {
  push();
  textSize(40);
  fill(advisorColor.r, advisorColor.g, advisorColor.b);
  textFont(`futura`);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(title, windowWidth/2, windowHeight/2, adviceFrame.x, adviceFrame.y);
  pop();
}


function simulation() {
  displayUserWords();
  displayAdvice();
}


function displayUserWords() {
  let x = windowWidth / 2;
  let y = windowHeight / 5;
  for (let i = 0; i < words.length; i++) {
    text(words[i], x, y);
    y = y + userWordDist;
  }
}

function speakAdvice() {
  let advice = random(instructions);
  responsiveVoice.speak(advice, "UK English Female", {
    pitch: 2,
    rate: 0.8,
    volume: 0.3,
    onstart: function () {
      showSpeaking(advice);
    },
  });
}

function showSpeaking(advice) {
  currentInstruction = advice;
}

function displayAdvice() {
  push();
  fill(advisorColor.r, advisorColor.g, advisorColor.b);
  textSize(40);
  rectMode(CENTER);
  textAlign(CENTER, BOTTOM);
  text(currentInstruction, windowWidth / 2, windowHeight/2 - 120, adviceFrame.x, adviceFrame.y);
  pop();
}

function keyPressed() {
  if (keyCode === 32) {
    state = "simulation";
  }
}
