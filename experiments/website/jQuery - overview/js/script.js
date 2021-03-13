"use strict";

// CSS() METHOD
// // Get the <h1> element by its id and store it in a variable
// let $mainHeading = $(`#main-heading`);
// // Set its color property using the .css() method
// $mainHeading.css(`color`, `#339966`);

// more efficent of using jQuery
// $(`.header`).css(`color`, `#ff0000`);

// USING VARIABLES when wanting to change more than one think in one class
// let $headers = $(`.header`);
// $headers.css(`color`,`red`);
// $headers.css(`background-color`,`black`);
// $headers.css(`font-size`,`3rem`);

// // Get the <h1> element by its id and store it in a variable
// let $mainHeading = $(`#main-heading`);
// // Set its CSS properties using the .css() method
// $mainHeading.css(`color`, `#339966`);
// $mainHeading.css(`font-size`, `5rem`);
// $mainHeading.css(`font-family`, `Helvetica, sans-serif`);
// $mainHeading.css(`background-color`, `#000000`);


// jQUERY WITH OBJECT
$(`#main-heading`).css({
  "color": `#339966`,
  "font-size": `5rem`,
  "font-family": `Helvetica, sans-serif`,
  "background-color": `#000000`
});


// CHANGING TEXT CONTENT - TEXT() METHOD
// $(`#example-span`).text(`a Spaniel`);

// Get the current text in the span
let spanText = $(`#example-span`).text();
// Reverse it
let reverseSpanText = spanText.split(``).reverse().join(``);
// Set the span's text to the reversed version
$(`#example-span`).text(reverseSpanText);


// CHANGING HTML CONTENT OF ELEMENTS - HTML() METHOD
// Get the HTML content of the span
let spanHTML = $(`#example-span`).html();
// Set the HTML content of the span as the original content wrapped in a <strong> tag
$(`#example-span`).html(`<strong>${spanHTML}</strong>`);

// SET ATTRIBUTTES (ID,CLASS,SRC,A) - .ATTR() method
$(`#main-heading`).attr(`contenteditable`, `true`);

// checking an attribute
if ($(`#thicc-link`).attr(`href`) === `https://thi.cc`) {
  $(`#thicc-link`).text(`thicc, thicc link`);
}

// CREATING & ADDING ELEMENTS
// Create a <p> element
let $newP = $(`<p></p>`);
// Set the text inside the new <p> element so it has something to say!
$newP.text(`Hot off the presses!`);

// Add it to the second section (selected by id)
$(`#second-section`).append($newP);
  // preprend() - adds before id
  // after() - after element
  // before() - 

// REMOVING ELEMENTS
$(`#main-heading`).remove();
