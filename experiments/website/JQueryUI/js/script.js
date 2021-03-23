$(`#escape-tunnel`).hide();

$(`#introduction-dialog`).dialog({
  resizable: false,
  modal: true,
  buttons: {
    "Imagination": function() {
      // disable the walls!
      $(`#prisoner`).draggable(`option`, `containment`, `none`);
      $(this).dialog(`close`);
    },
    "Escape tunnel": function() {
      $(`#escape-tunnel`).show();
      $(this).dialog(`close`);
    }
  }
});

$(`#prisoner`).effect({
effect: `shake`,
duration: 2000,
times: 10,
distance: 7,
complete: makePrisonerDraggable
});

// DRAGGABLE
function makePrisonerDraggable() {
  $(`#prisoner`).draggable({
    containment: '#prison',
    start: function(event, ui) {
      $(this).addClass(`prisoner-dragging`, 750);
    },
    stop: function(event, ui) {
      $(this).removeClass(`prisoner-dragging`, 750);
    }
  });
}

// OPTIONS
// setTimeout(function() {
//   $(`#prisoner`).draggable(`disable`)
// }, 5000);


//DROPPABLE
$(`#escape-tunnel`).droppable({
  drop: function(event, ui) {
    ui.draggable.remove(); // whatever gets dropped in tunner disappears
    $(this).hide({
      effect: `blind`,
      duration: 500,
    });
  }
});

// TRANSITIONS
