// LISTENER - .ON()
// $(`.header`).on(`click`, function(event) {
//   // THIS = event.target
//   $(this).remove();
// });


// ADDING TEXT
// $(`section`).on(`click`, function(event) {
//   $(this).append(`<p>This will beadded on EVERY click.</p>`);
// })

// HAPPENING ONLY ONCE
// $(`section`).one(`click`, function(event) {
//   $(this).append(`<p>This will beadded on FIRST click.</p>`);
// })


// TO STOP EVENT LISTENER
// $(`.header`).on(`click`, function(event) {
//   $(this).css(`color`, `red`);
//   // $(`.header`).off(`click`);
// });


// FORM INPUT
$(`#example-button`).on(`click`, function(event) {
  $(this).remove();
});

// GET INFO IN INPUT
$(`#example-button`).on(`click`, function(event) {
  let input = $(`#example-text-input`).val();
  alert(input);
});

// GET VALUE OF SLIDER
$(`#range-slider`).on(`change`, function(event) {
  let input = $(this).val();
  alert(input);
});


// CSS - ADDCLASS()
$(`.header`).addClass(`highlight`);
// event of css has no period becuase Addclass is the DOCTYPE

$(`.header`).on(`click`, function(event) {
  $(this).removeClass(`highlight`);
});

// TOGGLE CLASS = BLINKING
// setInterval(function() {
//   $(`.header`).toggleClass(`highlight`);
// }, 500);

// HIDE/SHOW AT DIFF TIMES
// $(`#button`).on(`click`, function(event) {
//   $(`#main-heading`).hide();
//   setTimeout(function() {
//     $(`.header`).show();
//   },2000);
// });

// TOGGLE SHOW/HIDE
$(`#button`).on(`click`, function(event) {
  $(`#main-heading`).toggle();
});

// FADING
// $(`#button`).on(`click`, function(event) {
//   $(`#paragraph`).fadeOut(5000);
// });

// $(`#button`).on(`click`, function(event) {
  // $(`#paragraph`).fadeOut(5000);
  // $(`#paragraph`).fadeOut(2500, function() {
  //   $(this).fadeIn(1000);
  // });
    // $(`#paragraph`).fadeToggle(2000);
//     $(`#paragraph`).slideUp(2500, function() {
//       $(this).slideDown(200);
//     })
// });

// ANIMATE (works with units, not colors unless with UI library, not transform property)
// $(`#button`).on(`click`, function(event) {
//   $(this).animate({
//     "opacity": 0.1,
//     "font-size": "3rem"
//   }, 2000, function() {
//     //third argument on end
//     $(`#paragraph`).text("animated");
//   });
// });

$(`#button`).on(`click`, function(event) {
  $(this).animate({
    "opacity": 0.1,
    "height": `200px`
  }, {
    duration: 2000,
    // ON END function
    complete: function() {
      $(`#paragraph`).text("ANIMATE");
    },
  easing: `linear` //style
  });
});

// CALL EACH()
$(`.header`).each(function() {
  let reverseText = $(this).text().split(``).reverse().join(``);
  $(this).text(reverseText);
});
