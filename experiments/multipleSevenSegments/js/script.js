"use strict";

/**


Multiple Seven Segment Display by  suppergerrie2
https://editor.p5js.org/suppergerrie2/sketches/SkqBEHGs7
*/
let number = 0;

let sevenSegments = [];

//Set this to whatever you want, program will update.
let SEVEN_SEGMENT_COUNT = 6;

let autoCountingCheckbox = undefined;

function setup() {
  frameRate(10);

  for(let i = 0; i < SEVEN_SEGMENT_COUNT; i++) {
    let sevenSegment = new SevenSegment;
  	sevenSegments.push(sevenSegment);
  }

  createCanvas(sevenSegments.length*140+50, 400);

  autoCountingCheckbox = createCheckbox("Enable auto counting", true);
  createInput(0, "number");
}

function draw() {
  background(0);

  for(let i = sevenSegments.length-1; i >= 0; i--) {
    let numOffset = sevenSegments.length - 1 - i;

    let numPower = pow(10, numOffset+1);
    let lastNumPower = numPower/10;

    numOffset = pow(10, numOffset);

    //Calculate the remainder
    let numToDraw = number%numPower;
    //Divide so it comes into the "ones" place
    numToDraw/=lastNumPower;
    //Remove the decimals
    numToDraw = floor(numToDraw);

  	sevenSegments[i].draw(numToDraw, i);
  }

  if(autoCountingCheckbox.checked())  {
    number = (number + 1) % (pow(10, sevenSegments.length));
  }
}

function getColor(val, shift) {
  let r = 255;
  let g = 0;
  let b = 0;
  let a = 40+255 * ((val >> shift) & 1);
  return color(r, g, b, a);
}




// var sourceText = "0123456789";
// var curIndex = 0;
// function setup() {
//   createCanvas(400, 400);
//   // frameRate(10);
// }
// function draw() {
//   background(50);
//   fill(255);
//   textSize(144);
//   textAlign(CENTER, CENTER);
//   text(
//     sourceText.substring(curIndex, curIndex+1),
//     width/2, height/2);
//   // curIndex++;
//   if (curIndex > sourceText.length) {
//     curIndex = 0;
//   }
// }
//
// function keyPressed() {
//   if (keyCode === ENTER) {
//     curIndex +=1;
//   }
// }
