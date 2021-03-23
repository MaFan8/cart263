/**
Code Undertaker
Maple Sung


Reference:
Code Taker by Pippin Barr
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
