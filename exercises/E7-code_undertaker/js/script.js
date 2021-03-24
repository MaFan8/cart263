/**
Code Undertaker
Maple Sung


Reference:
Code Taker by Pippin Barr
*/

"use strict";
let numLetters = 9;
let secret = `stratagem`;

$(`#start-dialog`).dialog({
  resizable: false,
  modal: true,
  buttons: {
    "Begin": function() {
      $(this).dialog(`close`);
    }
  },
  hide: {
    effect: "explode",
    duration: 1000
  }
});

$(`#solved-dialog`).dialog({
  autoOpen: false,
  buttons: {
    "I know.": function() {
      $(this).dialog(`close`);
    }
  }
});

// mouseover secret letters turn red
$(`.secret`).one(`mouseover`, function(event) {
  $(this).addClass(`found`, 500);
  $(this).draggable({
    helper: `clone`,
  }); // clone dragged letter to replace in poem
});

// Dropping letters in answer box
$(`#answer`).droppable({
  drop: function(event, ui) {
    // if original letter has class of secret,
    if ($(ui.draggable[0]).hasClass("secret")) {
      let letter = ui.draggable.text();
      let liTag = $("<li>"); // create <li> tag
      $(liTag).addClass("sortable-letter"); // add class to <li> tag
      $(liTag).text(letter); // place letter in <li> tag
      $("#sortable").append(liTag); // add <li> tag in answer box

      ui.draggable.draggable(`disable`); // stop original letter from draggable
      ui.draggable.removeClass(`found`, 500); //Stop highlighting
    };

    let word = $(`#sortable`).text(); // assign word to text from letters
    let numLetter = word.split(``); // break down word to string
    // if there is 9 letters, then allow sortable
    if (numLetter.length >= numLetters) {
      console.log("go");
      $(`#sortable`).sortable({disabled: false});
        $(this).css(`color`, `blue`);
    } else {
      $(`#sortable`).sortable({disabled: true});
    }
  }
});

// sorting letters in answer box
$(`#sortable`).sortable({
  stop: function(event, ui) {
    let word = $(`#sortable`).text(); // assign word to letters in box
    // if word is correct, turn background green, otherwise turn red
    if (word === secret) {
      $(this).css(`background-color`, `green`);
      $(`#solved-dialog`).dialog(`open`);
    } else {
      $(this).css(`background-color`, `red`);
    }
  },
  // change background to white when dragging
  over: function(event, ui) {
    $(this).css(`background-color`, `white`);
  }
});
