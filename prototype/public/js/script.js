/**
Greenhouse Hub Prototype
Sharon Ku & Leanne Suen Fa

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";
let bkg;
let canvasWidth = 2000;

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

let homeIconProperties = {
  x: 50,
  y: 50,
  img: undefined,
  size: undefined,
};
let homeIcon;

// All possible states:
// welcome, new-user-dialog, choose-pod, choose-podmate, choose-seed, pod-navigation, plant-view
let state = `pod-navigation`;

function preload() {
  // load pod images
  for (let i = 0; i < NUM_POD_IMG; i++) {
    let loadPodImage = loadImage(`assets/images/pods/pod${i}.png`);
    podImages.push(loadPodImage);
  }

  homeIconProperties.img = loadImage(`assets/images/icons/greenhouse.png`);
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

  homeIconProperties.size = windowWidth / 15;

  // add home icon
  homeIcon = new HomeIcon(
    homeIconProperties.x,
    homeIconProperties.y,
    homeIconProperties.img,
    homeIconProperties.size
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
}
