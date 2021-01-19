/**************************************************
Where's Sausage Dog
Pippin Barr

Find the sausage Dog **************************************************/

// global constants
const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS = 100;

const LOAD_ANIMAL_IMAGES = `assets/images/animal`;
const LOAD_SAUSAGE_DOG_IMAGE = `assets/images/sausage-dog.png`;

// place with empty array to store images
let animalImages = [];
let animals = [];

let sausageDogImage = undefined;
let sausageDog = undefined;

// PRELOAD
function preload() {
  // load animals
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    let animalImage = loadImage(`${LOAD_ANIMAL_IMAGES}${i}.png`); //'i' generates each number of animal
    animalImages.push(animalImage);
  }

  // load SausageDog
  sausageDogImage = loadImage(`${LOAD_SAUSAGE_DOG_IMAGE}`);
} //end PRELOAD

// SETUP
function setup() {
  createCanvas(windowWidth, windowHeight);

  // create the animals
  createAnimals();

  // create sausageDog at random location
  createSausageDog();
} // END SETUP

// create the animals
function createAnimals() {
  for (let i = 0; i < NUM_ANIMALS; i++) {
    let animal = createRandomAnimal();
    animals.push(animal);
  }
}

function createRandomAnimal() {
  let x = random(0, width);
  let y = random(0, height);
  let animalImage = random(animalImages);
  let animal = new Animal(x, y, animalImage);
  return animal;
}

// create sausageDog at random location
function createSausageDog() {
  let x = random(0, width);
  let y = random(0, height);
  sausageDog = new SausageDog(x, y, sausageDogImage);
}

// DRAW
function draw() {
  background(255, 255, 0);

  // call animals
  updateAnimals();

  // call sausageDog
  updateSausageDog();
} // END DRAW

// call updated animals
function updateAnimals() {
  for (let i = 0; i < animals.length; i++) {
    animals[i].update(); //give me animals at position 'i' and update it
  }
}

// call updated sausageDog
function updateSausageDog() {
  sausageDog.update();
}

function mousePressed() {
  sausageDog.mousePressed();
}
