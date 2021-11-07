/**
Greenhouse Hub Prototype
Sharon Ku & Leanne Suen Fa

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";
let bkg;
let textSettings = {
  bodyFont: "Quicksand",
  headerFont: "Gluten",
  size: 14,
};
// colours
let aqua = {
  r: 45,
  b: 227,
  g: 240,
};

let teal = {
  r: 8,
  g: 116,
  b: 123,
};

let usernameInput;

// All possible states:
// welcome, new-user-dialog, choose-pod, choose-podmate, choose-seed, pod-navigation, plant-view
let state = `welcome`;

$("loginBtn").click(goToGreenhouse);

function setup() {
  bkg = createCanvas(2000, 2000);
  bkg.position(0, 0);
  bkg.style("z-index", -1);
}

function draw() {
  // For testing only (Leanne could change this)
  background(teal.r, teal.g, teal.b);

  ellipse(mouseX, mouseY, 60);
  fill(175);

  // States setup:
  if (state === `welcome`) {
    welcome();
  } else if (state === `new-user-dialog`) {
    newUserDialog();
  } else if (state === `choose-pod`) {
    choosePod();
  } else if (state === `choose-podmate`) {
    choosePodmate();
  } else if (state === `choose-seed`) {
    chooseSeed();
  } else if (state === `pod-navigation`) {
    podNavigation();
  } else if (state === `plant-view`) {
    plantView();
  }
}

function welcome() {}

function newUserDialog() {}

function choosePod() {}

function choosePodmate() {}

function chooseSeed() {}

function podNavigation() {}

function plantView() {}
