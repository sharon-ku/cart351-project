/**
Greenhouse Hub Prototype
Sharon Ku & Leanne Suen Fa

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";
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
let username = "username";
let button;
let buttonImg;
// All possible states:
// welcome, new-user-dialog, choose-pod, choose-podmate, choose-seed, pod-navigation, plant-view
let state = `welcome`;

function setup() {
  createCanvas(5000, 5000);
  buttonImg = loadImage("assets/images/arrow.png");
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
  let inputX = windowWidth * (1 / 3);
  let inputY = windowHeight / 2;
  let inputSize = 400;

  let welcome = "welcome to Greenhouse hub";
  push();
  fill(aqua.r, aqua.g, aqua.b);
  textSize(textSettings.size * 6);
  textAlign(LEFT, CENTER);
  textFont(textSettings.headerFont);
  text(welcome, windowWidth / 2, windowHeight / 2 - 400);

  pop();

  usernameInput = createInput("username");
  usernameInput.position(inputX, inputY);
  usernameInput.size(inputSize);

  // let submitIcon = image(buttonImg, inputX + inputSize * 0.75, inputY, 50, 50);

  button = createImg("assets/images/arrow.png");
  button.size(75, 75);
  button.position(inputX + inputSize, inputY);
  button.mousePressed(changeState);
}

function newUserDialog() {
  push();
  fill(aqua.r, aqua.g, aqua.b);
  textSize(textSettings.size * 4);
  textAlign(CENTER, CENTER);
  textFont(textSettings.headerFont);
  text("new User dialog", windowWidth / 2, windowHeight / 2);
  pop();
}

function choosePod() {
  push();
  fill(aqua.r, aqua.g, aqua.b);
  textSize(textSettings.size * 4);
  textAlign(CENTER, CENTER);
  textFont(textSettings.headerFont);
  text("choosePod", windowWidth / 2, windowHeight / 2);
  pop();
}

function choosePodmate() {}

function chooseSeed() {}

function podNavigation() {}

function plantView() {}

// function mousePressed() {}
function changeState() {
  if ((state = `welcome`)) {
    state = `new-user-dialog`;
    usernameInput.html("hi");
  }
}
