/**************************************************
Sheepervisor
Maple Sung


Participate in a scheme to round up your herd!


References:
Pippin Barr
January 24, 2021
Where's Sausage Dog
Source Code and Images
**************************************************/

// global constants
const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS = 30;

const LOAD_ANIMAL_IMAGES = `assets/images/animal`;
const LOAD_SAUSAGEDOG_IMAGES = `assets/images/sausage-dog.png`;
const LOAD_SHEEP_IMAGE = `assets/images/sheep.png`;

// arrays
let animalImages = [];
let animals = [];

let sausageDogImages = [];
let sausageDogs = [];
let numSausageDogs = 10;

let passage = undefined;
let fence = undefined;
let sheepImage = undefined;
let sheep = undefined;

// PRELOAD
function preload() {
  // load animals
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    let animalImage = loadImage(`${LOAD_ANIMAL_IMAGES}${i}.png`);
    animalImages.push(animalImage);
  }

  // load sausageDog
  for (let i = 0; i < numSausageDogs; i++) {
    let sausageDogImage = loadImage(`${LOAD_SAUSAGEDOG_IMAGES}`);
    sausageDogImages.push(sausageDogImage);
  }

  // load sheep
  sheepImage = loadImage(`${LOAD_SHEEP_IMAGE}`);
} //END PRELOAD

// SETUP
function setup() {
  createCanvas(windowWidth, windowHeight);
  let passage = new Passage();

  // create the animals
  createAnimals();
  createSausageDog();

  // create the Sheep
  createSheep();
} //END SETUP

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
  let animalWidth = random(20, 60);
  let animalHeight = random(20, 60);
  let animal = new Animal(x, y, animalImage, animalWidth, animalHeight);
  return animal;
}

function createSausageDog() {
  for (let i = 0; i < sausageDogImages.length; i++) {
    let x = windowWidth / 2;
    let y = windowHeight / 2;
    let sausageDog = new SausageDog(x, y, sausageDogImages, width, height);
  }
  console.log(`createdog`);
}

function createSheep() {
  let x = windowWidth / 2;
  let y = windowHeight / 2;
  let sheepWidth = 60;
  let sheepHeight = 55;
  sheep = new Sheep(x, y, sheepImage, sheepWidth, sheepHeight);
}

// DRAW
function draw() {
  background(245, 227, 228);
  showPassage();

  // call animals
  updateAnimals();
  // updateSausageDog();

  // call the sheep
  updateSheep();
} // END DRAW

// function checkOffScreen() {
//   if (
//     animal.x - animal.width / 2 > passage.x + passage.w / 2 &&
//     animal.x + animal.width / 2 < passage.x - passage.w / 2 &&
//     animal.y + animal.height / 2 < 0
//   ) {
//     animal.active = true;
//   }
// }

function showPassage() {
  let passage = new Passage();
  // passage.barriers(animal);
  passage.display();
}

// call updated animals
function updateAnimals() {
  for (let i = 0; i < animals.length; i++) {
    animals[i].checkProximity(sheep);
    animals[i].moveRandom();
    animals[i].moveWrap();
    animals[i].update();
  }
}

function updateSausageDog() {
  for (let i = 0; i < sausageDogImages.length; i++) {
    let sausageDog = sausageDogs[i];
    sausageDog.moveRandom();
    sausageDog.moveWrap();
    sausageDog.update();
  }
}

function updateSheep() {
  sheep.handleInput();
  sheep.moveWrap();
  sheep.update();
}
