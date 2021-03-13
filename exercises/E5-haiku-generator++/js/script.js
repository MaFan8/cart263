/**
Haiku Generator
Pippin Barr

Generates random Haiku
*/

"use strict";

let title = `Click to change the noun`
let instruction = `Press "space" to restart`;
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

let lineTitle = document.getElementById(`title`);
let lineInfo = document.getElementById('instruction');
let line1 = document.getElementById(`line-1`);
let line2 = document.getElementById(`line-2`);
let line3 = document.getElementById(`line-3`);


setupLines(); // Setup start lines
addHoverListeners(); // listen for hovers and respond by changing them
addClickListener(); // listen for clicks and respond by changing them
addKeyListener(); // listen for key and respond by changing them

function setupLines() {
  lineTitle.innerText = title;
  lineInfo.innerText = instruction;
  line1.innerText = random(haikuLines.fiveSyllables);
  line2.innerText = random(haikuLines.sevenSyllables);
  line3.innerText = random(haikuLines.fiveSyllables);
}

function addHoverListeners() {
  lineTitle.addEventListener(`mouseenter`, highlight);
  lineTitle.addEventListener(`mouseleave`, unHighlight);
  lineInfo.addEventListener(`mouseenter`, highlight);
  lineInfo.addEventListener(`mouseleave`, unHighlight);
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
  lineTitle.addEventListener(`click`, changeWord);
  lineInfo.addEventListener(`click`, changeWord);
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
      fadeOut(element, opacity);
    });
  } else if (element === lineInfo) {
    changeVerb(element);
    fadeIn(element, 0);
  } else {
    changeNoun(element);
    element.style[`color`] = `#5e1800`;
    fadeIn(element, 0);
  }
}


function fadeIn(element, opacity) {
  opacity += 0.01;
  element.style[`opacity`] = opacity; // set opacity on element
  if (opacity < 1) {
    // call fadeOut ONCE PER FRAME
    requestAnimationFrame(function() {
      fadeIn(element, opacity);
    });
  } else {
    // do nothing
  }
}

// Change noun
function changeNoun(element) {
  let originalWord = element.innerText;
  let words = RiTa.tokenize(element.innerText); // break into strings of words
  let partOfSpeech = RiTa.pos(element.innerText); // get parts of cpeech
  let output = " "; // output is one word
  let sentence = ""; // sentence of a string of words
  // go through array in line
  for (let i = 0; i < words.length; i++) {
    // check if there are any nouns or plural nouns
    if (partOfSpeech[i] === "nn") {
      //replace with noun
      output = RiTa.randomWord({
        targetPos: "nn"
      });
      words[i] = output; // word at index is the ouput
      changed = true;
    } else if (partOfSpeech[i] === "nns") {
      // replace with plural noun
      output = RiTa.randomWord({
        targetPos: "nns"
      });
      words[i] = output; // word at index is the ouput
      changed = true;
    }
    // put back into string of a sentence + space between them
    sentence = sentence + words[i] + " ";
  }
  // put sentence into element
  element.innerText = sentence;
}

// Change noun
function changeVerb(element) {
  let originalWord = element.innerText;
  let words = RiTa.tokenize(element.innerText); // break into strings of words
  let partOfSpeech = RiTa.pos(element.innerText); // get parts of cpeech
  let output = " "; // output is one word
  let sentence = ""; // sentence of a string of words
  // go through array in line
  for (let i = 0; i < words.length; i++) {
    // check if there are any nouns or plural nouns
    if (/vb.*/.test(partOfSpeech[i])) {
      output = RiTa.randomWord({ targetPos: "vb"});
      words[i] = output; // word at index is the ouput
    }
    // put back into string of a sentence + space between them
    sentence = sentence + words[i] + " ";
  }
  // put sentence into element
  element.innerText = sentence;
}


function addKeyListener() {
  document.addEventListener(`keyup`, changeLine);
}

function changeLine(event) {
  if (event.keyCode === 32) {
    location.reload();
  }
}

// function setNewLine(element) {
//   element.innerText = random(haikuLines.fiveSyllables);
//   element.innerText = random(haikuLines.sevenSyllables);
// }



function random(array) {
  // round (random 0,1 * length of array)
  let index = Math.floor(Math.random() * array.length);
  return array[index];
}
