"use strict";

const TAROT_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`;
const OBJECT_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`;
const INSTRUMENT_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`;
const PROFILE_DATA_KEY = `spy-profile-data`;

let spyProfile = {
  name: `REDACTED`,
  alias: `REDACTED`,
  secretWeapon: `REDACTED`,
  password: `REDACTED`,
}

let tarotData = undefined;
let objectData = undefined;
let instrumentData = undefined;

function preload() {

  tarotData = loadJSON(TAROT_URL);
  objectData = loadJSON(OBJECT_URL);
  instrumentData = loadJSON(INSTRUMENT_URL);

}


function setup() {
  createCanvas(windowWidth, windowHeight);


    let data = JSON.parse(localStorage.getItem(PROFILE_DATA_KEY));
    if (data) {
      //check password only if there is data
      let password = prompt(`Input password.`)
      //confrontation
      if (password === data.password) {
        setSpyData(data);
      } // show data
    } else {
     generateSpyProfile();
   }
}

function setSpyData(data) {
  // data = spyProfile; PROBLEMS
  spyProfile.name = data.name;
  spyProfile.alias = data.alias;
  spyProfile.secretWeapon = data.secretWeapon;
  spyProfile.password = data.password;
}


function generateSpyProfile() {
  spyProfile.name = prompt(`Input your name.`);
  let instrument = random(instrumentData.instruments);
  spyProfile.alias = `The ${instrument}`;
  spyProfile.secretWeapon = random(objectData.objects);
  let card = random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);

  localStorage.setItem(PROFILE_DATA_KEY, JSON.stringify(spyProfile));
}



function draw() {
  background(255);

  // string to store all textoutput
  let profile = `** SPY PROFILE **

  Name: ${spyProfile.name}
  Alias: ${spyProfile.alias}
  Secret Weapon: ${spyProfile.secretWeapon}
  Password: ${spyProfile.password}`;

  push();
  textFont(`Courier, monospace`);
  textSize(24);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  fill(0);
  text(profile, 100,100);
  pop();

}

function keyPressed() {
  if (key === `c`) {
    localStorage.removeItem(PROFILE_DATA_KEY);
  }
}
