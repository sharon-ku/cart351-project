/**
Greenhouse Hub Prototype
Sharon Ku & Leanne Suen Fa

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";
let bkg;
let canvasWidth = 2000;

// All possible states:
// pod-navigation, inside-pod, plant-view
let state = `pod-navigation`;

let teal = {
  r: 8,
  g: 116,
  b: 123,
};

let pods = [];
let podImages = []; //array to store pod images
let numPodImages = 4; //number pod podImages
const NUM_POD_IMG = 4;
const NUM_PODS = 100;

let plants = [];
let plantImages = [];
const NUM_PLANT_IMG = 3;
let num_plants = 6;
let growthStage = 5;

let iconSize = undefined;

// icon
// home icon
let homeIconProperties = {
  x: 50,
  y: 50,
  img: undefined,
};
let homeIcon;

// butterfly icon
let butterflyIconProperties = {
  x: -50,
  y: 50,
  img: undefined,
};
let butterflyIcon;

// teleport icon
let teleportIconProperties = {
  y: 75,
  img: undefined,
};
let teleportIcon;

function preload() {
  // load pod images
  for (let i = 0; i < NUM_POD_IMG; i++) {
    let loadPodImage = loadImage(`assets/images/pods/pod${i}.png`);
    podImages.push(loadPodImage);
  }

  // load home icon image
  homeIconProperties.img = loadImage(`assets/images/icons/greenhouse_icon.png`);

  // load butterfly icon image
  butterflyIconProperties.img = loadImage(
    `assets/images/icons/butterfly_icon.png`
  );

  // load butterfly icon image
  teleportIconProperties.img = loadImage(
    `assets/images/icons/teleport_icon.png`
  );
}

function setup() {
  bkg = createCanvas(canvasWidth, canvasWidth);
  bkg.position(0, 0);
  bkg.style("z-index", -1);

  // create pods
  for (let i = 0; i < NUM_PODS; i++) {
    let x = random(100, canvasWidth - 50);
    let y = random(100, canvasWidth - 50);
    let image = random(podImages);

    // resize canvas to windowWidth and windowHeight
    let pod = new Greenhouse(x, y, image, windowWidth, windowHeight);
    pods.push(pod);
    console.log(pods[i]);
  }

  // create icons
  iconSize = windowWidth / 15;

  // add home icon
  homeIcon = new HomeIcon(
    homeIconProperties.x,
    homeIconProperties.y,
    homeIconProperties.img,
    iconSize
  );

  // draw butterfly icon
  // place butterfly icon on right side of the screen
  butterflyIconProperties.x += windowWidth;

  butterflyIcon = new ButterflyIcon(
    butterflyIconProperties.x,
    butterflyIconProperties.y,
    butterflyIconProperties.img,
    iconSize
  );

  // draw teleport  icon
  // place  teleport icon on right side of the screen
  teleportIconProperties.y += iconSize;

  teleportIcon = new TeleportIcon(
    butterflyIconProperties.x,
    teleportIconProperties.y,
    teleportIconProperties.img,
    iconSize
  );
}

function draw() {
  // For testing only (Leanne could change this)
  // background(teal.r, teal.g, teal.b);
  background(31, 80, 80);
  ellipse(mouseX, mouseY, 60);
  fill(175);

  // States setup:
  if (state === `pod-navigation`) {
    podNavigation();
  } else if (state === `inside-pod`) {
    insidePod();
  } else if (state === `plant-view`) {
    plantView();
  }
}

function podNavigation() {
  for (let i = 0; i < pods.length; i++) {
    let pod = pods[i];
    pod.display();
  }
}
function insidePod() {
  text("Welcome Home", 50, windowHeight - 50);

  homeIcon.display();
  butterflyIcon.display();
  teleportIcon.display();
}

function plantView() {
  text("Plant view", 100, 100);
}

function mousePressed() {
  for (let i = 0; i < pods.length; i++) {
    let pod = pods[i];
    pod.mousePressed();
  }

  homeIcon.mousePressed();
  butterflyIcon.mousePressed();
  teleportIcon.mousePressed();
}
