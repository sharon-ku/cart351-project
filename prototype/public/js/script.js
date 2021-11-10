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

let aqua = {
  r: 45,
  g: 227,
  b: 240,
};

// text properties
let font = `quicksand, sans-serif`;

let pods = [];
let podImages = []; //array to store pod images
let numPodImages = 4; //number pod podImages
const NUM_POD_IMG = 4;
const NUM_PODS = 100;

let cactus;
let cactus_baby_Img;
let cactus_young_Img;
let cactus_bloom_Img;
let growthStage = 5;

// icon
// home icon
let homeIconImg;
let homeIcon;

// butterfly icon
let butterflyIconImg;
let butterflyIcon;

// teleport icon
let teleportIconImg;
let teleportIcon;

function preload() {
  // load pod images
  for (let i = 0; i < NUM_POD_IMG; i++) {
    let loadPodImage = loadImage(`assets/images/pods/pod${i}.png`);
    podImages.push(loadPodImage);
  }

  // cactus images
  cactus_baby_Img = loadImage(`assets/images/plants/cactus0.png`); //stage 1
  cactus_young_Img = loadImage(`assets/images/plants/cactus1.png`); //stage 2
  cactus_bloom_Img = loadImage(`assets/images/plants/cactus2.png`); //stage 3

  // load home icon image
  homeIconImg = loadImage(`assets/images/icons/greenhouse_icon.png`);

  // load butterfly icon image
  butterflyIconImg = loadImage(`assets/images/icons/butterfly_icon.png`);

  // load butterfly icon image
  teleportIconImg = loadImage(`assets/images/icons/teleport_icon.png`);
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
  let iconSize = windowWidth / 15;
  let iconX_R = windowWidth * 0.05;

  // add home icon
  homeIcon = new HomeIcon(iconX_R, iconX_R, homeIconImg, iconSize);

  // draw butterfly icon
  // place butterfly icon on right side of the screen
  // butterflyIconProperties.x += windowWidth;
  let iconX_L = windowWidth - iconX_R;
  let iconY_L = windowHeight * 0.07;

  butterflyIcon = new ButterflyIcon(
    iconX_L,
    iconY_L,
    butterflyIconImg,
    iconSize
  );

  // draw teleport  icon
  // place  teleport icon on right side of the screen

  let teleportIcon_Y = iconY_L + iconSize * 1.25;

  teleportIcon = new TeleportIcon(
    iconX_L,
    teleportIcon_Y,
    teleportIconImg,
    iconSize
  );

  cactus = new Plant(windowWidth / 2, windowHeight / 2, cactus_baby_Img);
}

function draw() {
  // background(teal.r, teal.g, teal.b);
  background(31, 80, 80);

  // States setup:
  if (state === `pod-navigation`) {
    podNavigation();
  } else if (state === `inside-pod`) {
    insidePod();
  }
}

function podNavigation() {
  for (let i = 0; i < pods.length; i++) {
    let pod = pods[i];
    pod.display();
  }
}
function insidePod() {
  push();
  textSize(24);
  textFont(font);
  fill(aqua.r, aqua.g, aqua.b);
  text("Welcome Home !", windowWidth * 0.025, windowHeight * 0.95);
  pop();

  homeIcon.display();
  butterflyIcon.display();
  teleportIcon.display();

  cactus.display();
}

function plantView() {
  text("Plant view", 100, 100);
  homeIcon.display();
}

function mousePressed() {
  for (let i = 0; i < pods.length; i++) {
    let pod = pods[i];
    pod.mousePressed();
  }

  homeIcon.mousePressed();
  butterflyIcon.mousePressed();
  teleportIcon.mousePressed();

  cactus.mousePressed();
}
