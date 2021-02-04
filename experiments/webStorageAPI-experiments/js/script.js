"use strict";

let userData = {
  name: `stranger`
};

function setup() {
  createCanvas(windowWidth, windowHeight);

  //check if we know their name
  let data = JSON.parse(localStorage.getItem(`web-storage-example-personalization`));
  if (data) {
    userData.name = data.name;
  }
  else {
    //ask user to give name
    userData.name = prompt(`What's your name?`);
    // save data
    localStorage.setItem(`web-storage-example-personalization`, JSON.stringify(userData));
  }
}

function draw() {
  background(255);

  push();
  textSize(64);
  textAlign(CENTER);
  text(`Hi there, ${userData.name}!`, width / 2, height / 2);
  pop();
}


function keyPressed() {
  if (key === `c`) {
    localStorage.removeItem(`web-storage-example-personalization`);
  }
}
