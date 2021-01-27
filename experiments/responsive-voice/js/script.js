"use strict";

let phrase = `Hello, world!`;
let saying = ``; // Track what is currently being said

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // Display what is currently being said...
  background(255);

  push();
  textSize(32);
  textAlign(CENTER);
  text(saying, width / 2, height / 2);
  pop();
}

function mousePressed() {
  responsiveVoice.speak(phrase, "UK English Male", {
    onstart: showSpeaking, //calls function
    onend: hideSpeaking,
  });
}

function showSpeaking() {
  saying = phrase;
}

function hideSpeaking() {
  saying = ``;
}
