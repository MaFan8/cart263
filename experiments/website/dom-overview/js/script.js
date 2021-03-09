// // CHANGE ELEMENTS with ID
// let mainHeading = document.getElementById(`main-heading`);
// let pronoun = document.getElementById(`pronoun`);
//
// // mainHeading.style[`color`] = `#339966`;
// mainHeading.style[`font-size`] = `4rem`;
// // mainHeading.sytle[`font-family`] = `Courier, monospace`;
// // mainHeading.styla[`background-color`] = `red`;
//
// pronoun.innerText = `you`; // changes text inside
// if (pronoun.innerText === `we`) {
//   pronoun.innerText = `you`;
// } // way to check
// pronoun.innerHTML = `<strong>you</strong>`;
//
// // HOW TO CHANGE ATTRIBUTES
// let image = document.getElementById(`clown-image`);
//
// image.setAttribute(`scr`,`http://loremflickr.com/320/240/clown`);
//   // use getAttribute to check
//
//
// // OTHER WAYS TO GET ELEMENTS withouth ID
// let headers = document.getElementsByClassName(`header`); // returns an array
//
// // for (let i = 0; i < headers.length; i++) {
// //   headers[i].style[`color`] = `#ff0000`;
// // }
//
// // GET ELEMENTS by TAGNAME
// let h2s = document.getElementsByTagName(`h2`);
//
// for (let i = 0; i < h2s.length; i++) {
//   h2s[i].style[`color`] = `#ff0000`;
// }

// // SELECT ELEMETS BY USING CSS SELECTOR
// let headers = document.querySelectorAll(`.header`); // `h1, h2`, #main-heading, etc.
//
// for (let i = 0; i < headers.length; i++) {
//   headers[i].style[`color`] = `#ff0000`;
// }


// TO ADD THINGS TO THE WEBPAGE
  // CREATE NEW ELEMENT
  let newP = document.createElement(`p`);
  newP.innerText = `Gosh, I sure do like clowns.`;

  let clownSection = document.getElementById(`clown-section`);
  clownSection.appendChild(newP);

  // REMOVE ELEMENTS
  let mainHeading = document.getElementById(`main-heading`);
  mainHeading.parentElement.removeChild(mainHeading);
