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

let title = `SHEEPERVISOR!


Collect all animals and drop them into the dark abyss.
** I hope you know sausage dogs are not real animals. **

Use ↔ ↕ to control your sheep `;

let fail = `Sorry... you're sheep is not good enough!`;
let end = `APPROUVED!!

That's one spirited sheep!`;

let bg = {
  r: 245,
  g: 227,
  b: 228,
};

// arrays
let animalImages = [];
let animals = [];

let sausageDogImages = [];
let sausageDogs = [];
let numSausageDogs = 10;

let passage = undefined;
let sheepImage = undefined;
let sheep = undefined;

let state = "start"; //could be start, simulation, attacked, success

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
  passage = new Passage();

  // create the animals
  createAnimals();
  createSausageDog();
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
    let x = random(0, width);
    let y = random(0, height);
    let sausageDog = new SausageDog(x, y, sausageDogImages[i], 50, 50);
    sausageDogs.push(sausageDog);
  }
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
  background(bg.r, bg.g, bg.b);

  if (state === "start") {
    start();
  }
  if (state === "simulation") {
    simulation();
  }
  if (state === "attacked") {
    attacked();
  }
  if (state === "success") {
    success();
  }
} // END DRAW

function start() {
  push();
  textSize(40);
  fill(0);
  textFont(`futura`);
  textAlign(CENTER);
  textStyle(BOLD);
  text(title, windowWidth / 2, height / 4);
  pop();
}

function simulation() {
  showPassage();
  updateAnimals();
  updateSausageDog();
  updateSheep();
}

function attacked() {
  push();
  textSize(40);
  fill(0);
  textFont(`futura`);
  textAlign(CENTER);
  textStyle(BOLD);
  text(fail, windowWidth / 2, height / 4);
  pop();
}

function success() {
  push();
  textSize(40);
  fill(0);
  textFont(`futura`);
  textAlign(CENTER);
  textStyle(BOLD);
  text(end, windowWidth / 2, height / 4);
  pop();

  let x = random(windowWidth);
  let y = random(windowHeight);
  let size = random(20, 80);
  fill(0, 0, 255);
  ellipse(x, y, size, size);
}

function showPassage() {
  let passage = new Passage();
  passage.display();
}

function updateAnimals() {
  for (let i = 0; i < animals.length; i++) {
    animals[i].barriers(passage);
    if (!animals[i].active) {
      animals.splice(i, 1);
      break;
    }
    animals[i].checkProximity(sheep);
    animals[i].moveWrap();
    animals[i].update();
  }
  checkNoMoreAnimals();
}

function checkNoMoreAnimals() {
  if (animals.length == 0) {
    state = "success";
  }
}

function updateSausageDog() {
  for (let i = 0; i < sausageDogImages.length; i++) {
    let sausageDog = sausageDogs[i];
    if (!sausageDog.active) {
      state = "attacked";
    }
    sausageDog.checkTouch(sheep);
    sausageDog.barriers(passage);
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

function keyPressed() {
  if (state === "start") {
    state = "simulation";
  }
}
