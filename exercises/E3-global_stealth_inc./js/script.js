"use strict";

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
const STRANGE_WORDS_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/words/strange_words.json`;
const PROFESSION_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/humans/occupations.json`;
const WRESTLER_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/humans/wrestlers.json`;
const APPLIANCES_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/technology/appliances.json`;
const FABRIC_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/materials/fabrics.json`;
const VENUE_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/geography/venues.json`;
const PROFILE_DATA_KEY = `agent-profile-data`;

const textPosition = {
  w: 100,
  h: 100
};

let agentProfile = {
  name: `**REDACTED**`,
  password: `**REDACTED**`,
}

let assignmentInfo = {
  target: ``,
  weapon: ``,
  weaponMaterial: ``,
  venue: ``,
  fee: ``,
}

let welcomeText = `Welcome to GLOBAL STEALTH INC.`
let loadingText = `- Verifying Access...`;
let deniedText = `** ACCESS DENIED **
Data eliminated`;
let strangeWordsData = undefined;
let wrestlerData = undefined;
let appliancesData = undefined;
let fabricData = undefined;
let venueData = undefined;

let showText = false;


let state = `launch`; // coule be Launch, Admission, Accessed, Denied

// PRELOAD
function preload() {
  strangeWordsData = loadJSON(STRANGE_WORDS_URL);
  wrestlerData = loadJSON(WRESTLER_URL);
  appliancesData = loadJSON(APPLIANCES_URL);
  fabricData = loadJSON(FABRIC_URL);
  venueData = loadJSON(VENUE_URL);
} // END PRELOAD


// SETUP
function setup() {
  createCanvas(windowWidth, windowHeight);

  // text defaults
  textFont(`Courier, monospace`);
  textSize(24);
  textAlign(LEFT, TOP);

  // load ANNYANG
  if (annyang) {
    let commands = {
      '*password': setPassword,
    };
    annyang.addCommands(commands);
  }

  // set up data storage if name is provided
  let data = JSON.parse(localStorage.getItem(PROFILE_DATA_KEY));
  if (data) {
    setAgentData(data);
    let name = prompt(`Comfirm your name.`);
    if (name === data.name) {
      alert(`ANNOUNCE PASSWORD TO ENTER`);
      state = 'admission';
    } else {
      state = `denied`;
    }
  }

  generateAssignmentProfile();
} // END SETUP

function setPassword(password) {
  if (password === agentProfile.password.toLowerCase()) {
    state = `accessed`;
  } else {
    state = `denied`;
  }
}

function setAgentData(data) {
  agentProfile.name = data.name;
  agentProfile.password = data.password.toLowerCase();
}

// DRAW
function draw() {
  background(0);

  if (state === `launch`) {
    generatePassword();
  }
  if (state === 'validName') {
    displayUserProfile();
  }
  if (state === `admission`) {
    displayAdmission();
  }
  if (state === `accessed`) {
    accessed();
  }
  if (state === `denied`) {
    displayDenied();
  }

} // END DRAW


function generatePassword() {
  displayWelcome();
  agentProfile.name = prompt(`Insert your name.`); //ask for name
  agentProfile.password = random(strangeWordsData.words); // generate password

  // check if there is a valid input
  if (!(agentProfile.name === "" || agentProfile.name === null)) {
    localStorage.setItem(PROFILE_DATA_KEY, JSON.stringify(agentProfile));
    state = `validName`;
  }
}

function displayWelcome() {
  push();
  textSize(40);
  textAlign(CENTER, CENTER);
  fill(255, 182, 0);
  text(welcomeText, width / 2, height / 2);
  pop();
}

function displayUserProfile() {
  let profile = `<< AGENT PROFILE >>

  Name: ${agentProfile.name}
  Password: ${agentProfile.password}


    ~ Press ENTER to access assignment.
    ~ press 'c' to eliminate data.`;

  push();
  fill(255, 182, 0);
  text(profile, textPosition.w, textPosition.h);
  pop();
}

function displayAdmission() {
  annyang.start(); // start listening
    // show loading text
    push();
    fill(255, 0, 0);
    text(loadingText, textPosition.w, textPosition.h);
    pop();

}

function generateAssignmentProfile() {
  assignmentInfo.target = random(wrestlerData.wrestlers);
  assignmentInfo.weapon = random(appliancesData.appliances);
  assignmentInfo.weaponMaterial = random(fabricData.fabrics);

  let randomIndex = Math.floor(random(venueData.categories.length));
  let venueDataCategory = venueData.categories[randomIndex];
  let randomCategory = Math.floor(random(venueDataCategory.length));
  // console.log(venueDateCat.categories[randomCat]);
  assignmentInfo.venue = venueDataCategory.categories[randomCategory].name;

  assignmentInfo.fee = int(random(10, 1000000));
}

function accessed() {
  annyang.abort(); //stop listening
  displayAcessed();
}

function displayAcessed() {
  let assignment = `<< ASSIGNMENT >>

  Target: ${assignmentInfo.target}
  Weapons: ${assignmentInfo.weapon}
  Weapon Material: ${assignmentInfo.weaponMaterial}
  Place of Termination: ${assignmentInfo.venue}
  Fee:  $ ${assignmentInfo.fee}`

  push();
  fill(255, 182, 0);
  text(assignment, textPosition.w, textPosition.h);
  pop();

}

function displayDenied() {
  push();
  fill(255, 0, 0);
  text(deniedText, textPosition.w, textPosition.h);
  pop();
}

function keyPressed() {
  if (key === `c`) {
    localStorage.removeItem(PROFILE_DATA_KEY);
    location.reload();
  }
  if (keyCode === ENTER) {
    location.reload();
  }
}
