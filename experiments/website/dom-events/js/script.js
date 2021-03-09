// KEY TIME-BASED EVENTS

// let paragraph = document.getElementById(`paragraph`);

// CALL FUNCTION AFTER TIME
// setTimeout(function() {
//   paragraph.style[`color`] = `#ff0000`;
// },3000);

// BLINKING
// setInterval(blink,500);
// function blink() {
//   let opacity = paragraph.style[`opacity`];
//   if (opacity === `1`) {
//     paragraph.style[`opacity`] = `0`;
//   }
//   else {
//     paragraph.style[`opacity`] = `1`;
//   }
// }


// FADING OUT
// let paragraph = document.getElementById(`paragraph`);
// let opacity = 1;
//
// fadeOut(); // set process BUT Only does it once
//
// function fadeOut() {
//   opacity -= 0.01;
//   paragraph.style[`opacity`] = opacity;
//   // call it again when next frame
//   if (opacity >0) {
//     requestAnimationFrame(fadeOut);
//   }
// }


// EVENT-BASED TRIGGER
let paragraph = document.getElementById(`paragraph`);

// MOUSE EVENT
// paragraph.addEventListener(`click`,function(event) {
// // console.log(event);
//   // paragraph.style[`background-color`] = `#ff0000`;
//   event.target.innerText = `${event.clientX}, ${event.clientY}`;
// });

// USING EVENT.TARGET for more than one element
// let mainHeading = document.getElementById(`main-heading`);
// let subHeading = document.getElementById(`sub-heading`);
// let paragraph = document.getElementById(`paragraph`);
//
// mainHeading.addEventListener(`click`,setRedTextColor);
// subHeading.addEventListener(`click`,setRedTextColor);
// paragraph.addEventListener(`click`,setRedTextColor);
//
// function setRedTextColor(event) {
//   // `event.target` - tells me which is clicked to trigger it
//   event.target.style[`color`] = `#ff0000`;
// }

// MOUSEENTER, MOUSELEAVE, CONTEXTMENU (LEFT-CLICK)
// let originalText = paragraph.innerText;

// paragraph.addEventListener(`contextmenu`, function(event) {
//   event.target.innerText = `SECRET MESSAGE!!!`;
// })
// paragraph.addEventListener(`mouseleave`, function(event) {
//   // event.target.style[`color`] = `#ff0000`;
//   event.target.innerText = originalText;
// })

// KEYBOARD - KEYDOWN, KEYUP(on release)
document.addEventListener(`keydown`, function(event) {
//   if (event.keyCode === 32) {
//   paragraph.style[`color`] = `#ff0000`;
// }
  paragraph.innerText = paragraph.innerText + event.key; // adds key typed
});

// OFFLINE
let mainHeading = document.getElementById(`main-heading`);
window.addEventListener(`offline`, function(event) {
  mainHeading.innerText = `:(`;
});
