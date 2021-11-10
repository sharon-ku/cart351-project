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
let numPods = 100;

// All possible states:
// welcome, new-user-dialog, choose-pod, choose-podmate, choose-seed, pod-navigation, plant-view
let state = `pod-navigation`;

function preload() {
  // load pod images
  for (let i = 0; i < numPodImages; i++) {
    let loadPodImage = loadImage(`assets/images/pods/pod${i}.png`);
    podImages.push(loadPodImage);
  }
}

function setup() {
  bkg = createCanvas(canvasWidth, canvasWidth);
  bkg.position(0, 0);
  bkg.style("z-index", -1);

  for (let i = 0; i < numPods; i++) {
    let x = random(100, canvasWidth - 50);
    let y = random(100, canvasWidth - 50);
    let image = random(podImages);
    let newState = `plant-view`;
    let pod = new Greenhouse(x, y, image, state, newState);
    pods.push(pod);
    console.log(pods[i]);
  }
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
function plantView() {
  text("inside pod", 100, 100);
}

function mousePressed() {
  for (let i = 0; i < pods.length; i++) {
    let pod = pods[i];
    pod.mousePressed();
  }
}
