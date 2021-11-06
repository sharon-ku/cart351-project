/**
Greenhouse Hub Prototype
Sharon Ku & Leanne Suen Fa

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";
let text = {
  bodyFont: "Quicksand",
  HeaderFont: "Gluten",
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

// All possible states:
// welcome, new-user-dialog, choose-pod, choose-podmate, choose-seed, pod-navigation, plant-view
let state = `welcome`;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // For testing only (Leanne could change this)
  background(teal.r, teal.g, teal.b);
  ellipse(mouseX, mouseY, 60);

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

function welcome() {
  push();
  fill(aqua.r, aqua.g, aqua.b);
  textSize(text.size * 4);
  textAlign(CENTER, CENTER);
  textFont(text.bodyFont);
  text("Welcome to Greenhouse hub", windowWidth / 2, windowHeight / 2);
  pop();
}

function newUserDialog() {}

function choosePod() {}

function choosePodmate() {}

function chooseSeed() {}

function podNavigation() {}

function plantView() {}
