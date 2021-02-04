"use strict";

let clicks = 0;

// set score when loaded
let gameData = {
  highScore: 0
};

function setup() {
  createCanvas(windowWidth, windowHeight);

  // load gameData
  let data = JSON.parse(localStorage.getItem(`click-attack-game-data`));
  // check if there is data, use it, otherwise use default = 0
  if (data !== null) {
    gameData = data;
  }
}



function draw() {
  background(255);

  push();
  textSize(64);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  fill(0);
  text(clicks, width/2, height/2);
  pop();

  push();
  textSize(32);
  textAlign(LEFT,TOP);
  textStyle(BOLD);
  fill(0);
  text(`High score: ${gameData.highScore}`, 100, 100);
  pop();

}

function mousePressed() {
  clicks++;

  // check if highScore has been beaten
  if (clicks > gameData.highScore) {
    gameData.highScore = clicks;
    localStorage.setItem(`click-attack-game-data`, JSON.stringify(gameData)); // save converted data to string and updated score
    }
}

// delete data
function keyPressed() {
  if (key === `c`) {
    localStorage.removeItem(`click-attack-game-data`);
  }
}
