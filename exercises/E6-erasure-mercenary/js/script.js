"use strict";

const REVEAL_PROBABLILITY = 0.1;
const ERASE_PROBABILITY = 0.05;
const UPDATE_FREQUENCY = 2500;
const SHAKESPEARE_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/words/literature/shakespeare_phrases.json`;
const NUM_LINES = 50;

let $secrets;


setup();
// sets click handler and starts time loops
function setup() {
  $.getJSON(SHAKESPEARE_URL, displayJSON);
  setInterval(revelation, UPDATE_FREQUENCY);
}

function displayJSON(index, value) {
  let lines = index.phrases; // get json array fo phrases
  let outputLine = ""; // put into string
  // go through array and take random lines
  for (let i = 0; i < NUM_LINES; i++) {
    let randomLine = Math.floor(lines.length * Math.random());

    // randomly wrap span tags onto lines 12% of the time
    let r = Math.random();
    if (r < ERASE_PROBABILITY) {
      outputLine = outputLine + "<span>" + lines[randomLine].trim() + "</span>" + ".\n";
    } else {
      outputLine = outputLine + lines[randomLine].trim() + ".\n";
    }
  }

  $(`#paragraph-1`).html(outputLine); // add html elements onto 'p' tags
  $(`#paragraph-1`).find($(`span`)).addClass(`revealed`); // add class to span
}

function revelation() {
  $(`.revealed`).each(attemptErase);
}

function attemptErase() {
  // replace text with an input field 10% of the time
  let r = Math.random();
  if (r < REVEAL_PROBABLILITY) {
    // change text color to red, then fadeOut
    $(this).css('color', 'red').fadeOut(5000, function() {
      // remove revealed class, change to text string
      $(this).removeClass(`revealed`);
      let textString = $(this).text();
      $(this).text(``); // overwriting text to empty string
      let $input = $(`<input type="text" data="${textString}">`);
      $(this).replaceWith($input); // replace with input element

      $input.keypress(enterInput); // allow 'enter' to store and replace text with input text
    });
  }
}


function enterInput() {
  let keycode = event.keyCode;
  // if ENTER is pressed
  if (keycode === 13) {
    // Check for correct text input
    if ($(this).val() === $(this).attr("data")) {
      console.log("correct");
      //if correct, text will be blue
      let userInput = "<span style = 'color:blue'>" + $(this).val() + "</span>";
      $(this).replaceWith(userInput);
    } else {
      // if wrong, text will be red
      let userInput = "<span style = 'color:red'>" + $(this).val() + "</span>";
      $(this).replaceWith(userInput);
    }
  }
}
