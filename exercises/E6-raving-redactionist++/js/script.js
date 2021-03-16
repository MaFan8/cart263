"use strict";

const REVEAL_PROBABLILITY = 0.1;
const UPDATE_FREQUENCY = 500;

let $secrets;

setup();
// sets click handler and starts time loops
function setup() {
  $secrets = $(`.top-secret`);
  $(`.top-secret`).on(`click`, redact);
  setInterval(revelation, UPDATE_FREQUENCY);
}




function redact() {
  $(this).removeClass(`revealed`);
  $(this).addClass(`redacted`);
}

function revelation() {
  $(`.redacted`).each(attemptReveal);
}

function attemptReveal() {
  let r = Math.random();
  if (r < REVEAL_PROBABLILITY) {
    $(this).removeClass(`redacted`);
    $(this).addClass(`revealed`);
  }
}
