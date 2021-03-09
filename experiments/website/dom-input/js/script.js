// BUTTON
// let button = document.getElementById(`example-button`);
//
// button.addEventListener(`click`, function(event) {
//   // alert(`Nice clicking!`);
//   event.target.style[`display`] = `none`; // disappears
// })


// TEXT
// let textInput = document.getElementById(`example-text-input`);
// let button = document.getElementById(`submit-button`);
//
// button.addEventListener(`click`, function(event) {
//   // access text
//   let input = textInput.value;
//   alert(input); // display
// });
//
// textInput.addEventListener(`keydown`, function(event) {
//   if (event.keyCode === 13) {
//     let input = textInput.value;
//     alert(input);
//   }
// });

// SLIDER
// let slider = document.getElementById(`example-slider`);
// let button = document.getElementById(`check-button`);

// button.addEventListener(`click`, function(event) {
//   let value = slider.value;
//   alert(value);
// })

// display when slider is let go
// slider.addEventListener(`change`, function(event) {
//   alert(slider.value);
// })

// COLOR picker
let picker = document.getElementById(`color-picker`);
picker.addEventListener(`input`, function(event) {
  let color = picker.value;
  // alert(color);
  document.body.style[`background-color`] = color
})
