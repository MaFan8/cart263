/**
Code Taker
Pippen Barr

The user is the Tom-Hanks-in-the-Da-Vinci-Code of classic poetry, seeing coded messages in poems. The user reads a poem and searches it with their mouse to uncover special letters. If they drag the letters in the correct order into a special solution area, they crack the code! Code taker! Da Vinci!?
*/

"use strict";

let secret = `Theremin`;

$(`#solved-dialog`).dialog({
  autoOpen: false,
  buttons: {
    "I know.": function() {
      $(this).dialog(`close`);
    }
  }
});

$(`.secret`).one(`mouseover`, function(event) {
  $(this).addClass(`found`, 500);
  $(this).draggable({
    helper: `clone`,
  });
});

$(`#answer`).droppable({
  drop: function(event, ui) {
  let letter = ui.draggable.text();
  $(this).append(letter); // add letter in answer box
  ui.draggable.draggable(`disable`); // stop original letter from draggable
  ui.draggable.removeClass(`found`, 500); //Stop highlighting
  //Check if they got interval
  if ($(this).text() === `Theremin`) {
    $(`#solved-dialog`).dialog(`open`);
  }
}
});
