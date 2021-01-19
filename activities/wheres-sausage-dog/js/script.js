/**************************************************
Where's Sausage Dog
Pippin Barr

Find the sausage Dog **************************************************/

// global constants
const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS = 100;

// place with empty array to store images
let animalImages = [];
let animals = [];

let sausageDogImage = undefined;
let sausageDog = undefined;

// PRELOAD
function preload() {
  // load animals
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    let animalImage = loadImage(`assets/images/animal${i}.png`); //'i' generates each number of animal
    animalImages.push(animalImage);
  }

  // load SausageDog
  sausageDogImage = loadImage(`assets/images/sausage-dog.png`);
} //end PRELOAD

// SETUP
function setup() {
  createCanvas(windowWidth, windowHeight);

  // create the animals
  for (let i = 0; i < NUM_ANIMALS; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let animalImage = random(animalImages);
    let animal = new Animal(x, y, animalImage);
    animals.push(animal);
  }

  // create sausageDog in random location
  let x = random(0, width);
  let y = random(0, height);
  sausageDog = new SausageDog(x, y, sausageDogImage);
} // end SETUP

// DRAW
function draw() {
  background(255, 255, 0);

  // call animals
  for (let i = 0; i < animals.length; i++) {
    animals[i].update(); //give me animals at position 'i' and update it
  }

  // call sausageDog
  sausageDog.update();
} // end DRAW

function mousePressed() {
  sausageDog.mousePressed();
}
