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

let line1 = document.getElementById(`line-1`);
let line2 = document.getElementById(`line-2`);
let line3 = document.getElementById(`line-3`);


setupLines(); // Setup start lines
addHoverListeners(); // listen for clicks and respond by changing them
addClickListener();
addKeyListener();

function setupLines() {
  line1.innerText = random(haikuLines.fiveSyllables);
  line2.innerText = random(haikuLines.sevenSyllables);
  line3.innerText = random(haikuLines.fiveSyllables);
}

function addHoverListeners() {
  line1.addEventListener(`mouseenter`, highlight);
  line1.addEventListener(`mouseleave`, unHighlight);
  line2.addEventListener(`mouseenter`, highlight);
  line2.addEventListener(`mouseleave`, unHighlight);
  line3.addEventListener(`mouseenter`, highlight);
  line3.addEventListener(`mouseleave`, unHighlight);
}

let originalColor = haiku.style;
function highlight(event) {
  event.target.style[`color`] = `#d7fcf4`;
}

function unHighlight(event) {
  event.target.style = originalColor;
}

function addClickListener() {
  line1.addEventListener(`click`, changeWord);
  line2.addEventListener(`click`, changeWord);
  line3.addEventListener(`click`, changeWord);
}

function changeWord(event) {
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
    changeNoun(element);
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


function changeNoun(element) {
  let originalWord = element.innerText;
    let words = RiTa.tokenize(element.innerText);
    let partOfSpeech = RiTa.pos(element.innerText);
    let output = " ";
    let sentence = "";
    for (let i = 0; i < words.length; i++) {
    // if (/nn.*/.test(pos[i])) {
    //   output = RiTa.randomWord({ targetPos: "nn"});
    // }
    if (partOfSpeech[i] === "nn") {
      output = RiTa.randomWord({ targetPos: "nn"});
      words[i] = output;
      // sentence = RiTa.untonkenize(words[i]);
    }
    else if (partOfSpeech[i] === "nns") {
      output = RiTa.randomWord({ targetPos: "nns"});
    }
    else {
      output = words[i];
    }
    console.log(output);
  }

  console.log(partOfSpeech);
}


function addKeyListener() {
  line1.addEventListener(`keyup`, changeLine);
  line2.addEventListener(`keyup`, changeLine);
  line3.addEventListener(`keyup`, changeLine);
}

function changeLine(event) {
  if (event.keyCode === 32) {
  setNewLine(event.target);
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
