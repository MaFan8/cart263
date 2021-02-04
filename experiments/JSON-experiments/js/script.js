"use strict";

let tarotData = undefined;
let fortune = `No fortune found yet...`;

// function preload() {
// // immediate assigning results from tarotData
//   tarotData = loadJSON(`assets/data/tarot_interpretations.json`);
// }



function setup() {
  createCanvas (windowWidth, windowHeight);

  // // picks random card
  // let card = random(tarotData.tarot_interpretations);
  // fortune = random(card.fortune_telling);
}



function draw() {
  background(225);

  // let firstShadowMeaning = tarotData.tarot_interpretations[0].meanings.shadow[0]; // displays 'Being gullible an d naive'
  //
  // push();
  // textSize(32);
  // textAlign(CENTER);
  // fill(0);
  // text(firstShadowMeaning, width/2, height/2);
  // pop();


  push();
  textSize(32);
  textAlign(CENTER);
  fill(0);
  text(fortune, width/2, height/2);
  pop();
}

function mousePressed() {
  // outside of preload, jSON file will be loaded, it will keep running until tarotLoaded is called
  loadJSON(`assets/data/tarot_interpretations.json`, tarotLoaded)
}

// when it's loaded, then you can assign the data in perameters
function tarotLoaded(data) {
  tarotData = data; // saved data into tarotData
  // picks random card
  let card = random(tarotData.tarot_interpretations);
  fortune = random(card.fortune_telling);
}
