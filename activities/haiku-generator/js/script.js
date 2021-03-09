/**
Haiku Generator
Pippin Barr

Generates random Haiku
*/

"use strict";

let haikuLines = {
fiveSyllables: [
  `O, to be a tree`,
  `The cat does not know`,
  `We are all forests`,
  `You have done your best`,
  `They are all gone now`
],

sevenSyllables: [
  `Say the things left unsaid`,
  `Never believe the wind's lies`,
  `The autumn stretches its legs`,
  `Nothing can satisfy you`,
  `They will not come back again`
]
};

// let line1 = random(fiveSyllableLines);
// let line2 = random(sevenSyllableLines);
// let line3 = random(fiveSyllableLines);

// console.log(line1);
// console.log(line2);
// console.log(line3);

let line1 = document.getElementById(`line-1`);
let line2 = document.getElementById(`line-2`);
let line3 = document.getElementById(`line-3`);

setupLines(); // Setup start lines
addListeners(); // listen for clicks and respond by changing them

// line1P.innerText = line1;
// line2P.innerText = line2;
// line3P.innerText = line3;

// line1P.addEventListener(`click`, lineClicked);
// line2P.addEventListener(`click`, lineClicked);
// line3P.addEventListener(`click`, lineClicked);

function setupLines() {
  line1.innerText = random(haikuLines.fiveSyllables);
  line2.innerText = random(haikuLines.sevenSyllables);
  line3.innerText = random(haikuLines.fiveSyllables);
}

function addListeners() {
  line1.addEventListener(`click`, changeLine);
  line2.addEventListener(`click`, changeLine);
  line3.addEventListener(`click`, changeLine);
}

function changeLine(event) {
  // setNewLine(event.target);
  fadeOut(event.target, 1);
}

function fadeOut(element, opacity) {
  opacity -= 0.01;
  element.style[`opacity`] = opacity; // set opacity on element
  if (opacity > 0) {
    // call fadeOut ONCE PER FRAME
    requestAnimationFrame(function() {
      fadeOut(element,opacity);
    });
  }
  else {
    // do something when it's faded out...
    setNewLine(element);
    fadeIn(element, 0);
  }
}

function fadeIn(element, opacity) {
  opacity += 0.01;
  element.style[`opacity`] = opacity;  // set opacity on element
  if (opacity < 1) {
    // call fadeOut ONCE PER FRAME
    requestAnimationFrame(function() {
      fadeIn(element,opacity);
    });
  }
else {
  // do nothing
}
}

function setNewLine(element) {
  if (element === line1 || element === line3) {
    element.innerText = random(haikuLines.fiveSyllables);
  }
  else {
    element.innerText = random(haikuLines.sevenSyllables);
  }
}

function random(array) {
  // round (random 0,1 * length of array)
  let index = Math.floor(Math.random() * array.length);
  return array[index];
}
