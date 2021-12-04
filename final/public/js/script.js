"use strict";

// To allow client to connect to socket
let clientSocket;
let socketId = -1;
let running = false;

// Stores user info from DB
let userInfo = undefined;

let bkg;
let canvasWidth = 3000;

// All possible states:
// new-user, pod-navigation, inside-pod, plant-view
// let state = `pod-navigation`;
let state = undefined;

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

// narrative string
// this first string will appear in new-user state
let narrationText = "Choose a pod that will be your new home";

let stars = [];
const NUM_STARS = 100;

// text properties
let font = `quicksand, sans-serif`;

let pods = [];
let podImages = []; //array to store pod images
let numPodImages = 4; //number pod podImages
const NUM_POD_IMG = 4;
const NUM_PODS = 100;

const NUM_PLANT_IMG = 4;
let cactusImages = [];
let dragonImages = [];
let cherryImages = [];

// used temporarily to randomly select a plant
let allPlantImages = [];

let cactus;
// let growthStage = 5;

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

// seed icon
let seedIconImg;
let seedIcon;

// close modal windows
$("#closeMessageForm").click(function () {
  $("#MessagingForm").toggle();
});
$("#closeSeedForm").click(function () {
  $("#SeedForm").toggle();
});
$("#closeReceivedMessageForm").click(function () {
  $("#receivedMessageForm").toggle();
});

let sendMessage = document.getElementById("MessagingForm");
let chooseSeed = document.getElementById("SeedForm");
let receiveMessage = document.getElementById("receivedMessageForm");

// click anywhere on window to close modal
window.onclick = function (event) {
  if (event.target == sendMessage) {
    sendMessage.style.display = "none";
  }
  if (event.target == chooseSeed) {
    chooseSeed.style.display = "none";
  }
  if (event.target == receiveMessage) {
    receiveMessage.style.display = "none";
  }
};

function preload() {
  // load pod images
  for (let i = 0; i < NUM_POD_IMG; i++) {
    let loadPodImage = loadImage(`assets/images/pods/pod${i}.png`);
    podImages.push(loadPodImage);
  }

  // cactus images
  for (let i = 0; i < NUM_PLANT_IMG; i++) {
    let plantImage = loadImage(`assets/images/plants/cactus${i}.png`);
    cactusImages.push(plantImage);
  }

  // cherry images
  for (let i = 0; i < NUM_PLANT_IMG; i++) {
    let plantImage = loadImage(`assets/images/plants/cherry${i}.png`);
    cherryImages.push(plantImage);
  }

  // dragon images
  for (let i = 0; i < NUM_PLANT_IMG; i++) {
    let plantImage = loadImage(`assets/images/plants/dragon${i}.png`);
    dragonImages.push(plantImage);
  }

  // allPlantImages used to temporarily store plant images
  allPlantImages.push(cactusImages, cherryImages, dragonImages);

  // load home icon image
  homeIconImg = loadImage(`assets/images/icons/greenhouse-icon.png`);

  // load butterfly icon image
  butterflyIconImg = loadImage(`assets/images/icons/butterfly-icon.png`);

  // load teleport icon image
  teleportIconImg = loadImage(`assets/images/icons/teleport-icon.png`);

  // load seed icon image
  seedIconImg = loadImage(`assets/images/icons/seed_icon.png`);
}

/* ----------------------------------------
setup()
-----------------------------------------*/
function setup() {
  bkg = createCanvas(canvasWidth, canvasWidth);
  bkg.position(0, 0);
  bkg.style("z-index", -1);

  // grab user data from local storage and store it in userInfo variable
  userInfo = JSON.parse(localStorage.getItem(`user`));
  console.log(userInfo);
  // now delete user data from local storage
  localStorage.removeItem(`user`);

  clientSocket = io.connect("http://localhost:3000");

  clientSocket.on("connect", function (data) {
    console.log("connected");
    // put code here that should only execute once the client is connected
    /*********************************************************************************************/
    // NEW:: pass the userID from db so server can CONNECT the userID and socket id together ... */
    /********************************************************************************************/
    clientSocket.emit("join", userInfo);
    // handler for receiving client id
    clientSocket.on("joinedClientId", function (data) {
      // socketId = data;
      // console.log("myId " + socketId);
      console.log(data);

      clientSocket.emit("requestGreenhouses");

      running = true;
    });
  });

  clientSocket.on("newGreenhouses", function (results) {
    // create pods
    for (let i = 0; i < results.length; i++) {
      // keep some distance from borders

      let x = results[i].x;
      let y = results[i].y;
      let image = random(podImages);
      let taken = results[i].taken;

      // resize canvas to windowWidth and windowHeight
      let pod = new Greenhouse(x, y, image, windowWidth, windowHeight, taken);
      pods.push(pod);
      // console.log(pods[i]);
    }
  });

  // create icons
  let iconSize = windowWidth / 15;
  let homeIconSize = iconSize - 20;

  let iconX_R = windowWidth * 0.01;

  // add home icon
  homeIcon = new HomeIcon(
    iconX_R,
    iconX_R,
    homeIconImg,
    homeIconSize,
    canvasWidth,
    canvasWidth
  );

  // draw butterfly icon
  // place butterfly icon on right side of the screen
  // butterflyIconProperties.x += windowWidth;
  let iconX_L = windowWidth - iconSize * 1.1 - 30;
  let iconY_L = windowHeight * 0.1;
  //console.log($("#MessagingForm"));

  butterflyIcon = new ButterflyIcon(
    iconX_L,
    iconX_R,
    butterflyIconImg,
    iconSize
  );

  // draw teleport  icon
  // place  teleport icon on right side of the screen

  let teleportIcon_Y = iconX_R + iconSize * 1.4;

  teleportIcon = new TeleportIcon(
    iconX_L,
    teleportIcon_Y,
    teleportIconImg,
    iconSize
  );

  seedIcon = new SeedIcon(100, 100, seedIconImg, iconSize);

  // Create sparkling stars!
  for (let i = 0; i < NUM_STARS; i++) {
    let star = createStar();
    stars.push(star);
  }

  // Create plant
  // cactus = new Plant(windowWidth / 2, windowHeight / 2, cactusImages);
  // For now, cactus stores a random plant image
  cactus = new Plant(windowWidth / 2, windowHeight / 2, random(allPlantImages));

  // Check if user is new using their pod id value:
  if (userInfo[0].podId.length === 0) {
    // user does not have a pod
    console.log(`no greenhouse`);
    state = `new-user`;
  } else {
    // user already has a greenhouse
    console.log(`yes greenhouse`);
    state = `pod-navigation`;
  }
  // Set state based on whether the user is new
}

// blueprint for a star
function createStar() {
  let star = {
    x: random(0, canvasWidth),
    y: random(0, canvasWidth),
    alpha: 125,
    vx: 0,
    vy: 0,
    speed: 0.5,
    size: 10,
    fill: 255,
  };

  return star;
}

/* ----------------------------------------
draw()
-----------------------------------------*/
function draw() {
  if (running) {
    // background(teal.r, teal.g, teal.b);
    background(31, 80, 80);

    // States setup:
    if (state === `new-user`) {
      newUser();
    } else if (state === `pod-navigation`) {
      podNavigation();
    } else if (state === `inside-pod`) {
      insidePod();
    }
  }
}

// Allow user to select a new greenhouse and cue intro story
function newUser() {
  // background(31, 80, 80);
  background(0);

  // draw stars
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];

    // make star size smaller
    star.size = 5;

    moveStar(star);
    displayStar(star);
  }

  for (let i = 0; i < pods.length; i++) {
    let pod = pods[i];
    pod.update();
  }

  push();
  textSize(25);
  textAlign(CENTER);
  textFont(font);
  fill(aqua.r, aqua.g, aqua.b);
  text(narrationText, windowWidth / 2, windowHeight / 2);
  pop();
}

function podNavigation() {
  background(31, 80, 80);

  // draw stars
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];

    // make star size smaller
    star.size = 5;

    moveStar(star);
    displayStar(star);
  }

  for (let i = 0; i < pods.length; i++) {
    let pod = pods[i];
    pod.update();

    // if (pod.overlap()) {
    //   console.log("overlap");
    //   // change cursor type
    //   // cursor("pointer");
    //   noCursor();
    // } else {
    //   cursor("default");
    // }
  }
}

function insidePod() {
  background(31, 80, 80);

  // draw stars
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];

    // increase star size
    star.size = 10;

    moveStar(star);
    displayStar(star);
  }

  push();
  textSize(24);
  textFont(font);
  fill(aqua.r, aqua.g, aqua.b);
  text("Welcome Home !", windowWidth * 0.025, windowHeight * 0.95);
  pop();

  homeIcon.display();
  homeIcon.overlap();

  butterflyIcon.display();
  butterflyIcon.overlap();

  teleportIcon.display();
  teleportIcon.overlap();

  seedIcon.display();
  seedIcon.overlap();

  cactus.display();
}

// Display star as circle
function displayStar(star) {
  push();
  noStroke();
  fill(21, 136, 146, star.alpha);

  if (random() < 0.5) {
    star.alpha -= 20;
  } else {
    star.alpha += 20;
  }

  ellipse(star.x, star.y, star.size);
  pop();
}

function moveStar(star) {
  if (random() < 0.05) {
    star.vx = random(-star.speed, star.speed);
    star.vy = random(-star.speed, star.speed);
  }

  star.x = constrain(star.x, 0, canvasWidth);
  star.y = constrain(star.y, 0, canvasWidth);

  star.x += star.vx;
  star.y += star.vy;
}

function mousePressed() {
  for (let i = 0; i < pods.length; i++) {
    let pod = pods[i];
    pod.mousePressed();
  }

  if (state === `inside-pod`) {
    // homeIcon.mousePressed();
    butterflyIcon.mousePressed();
    teleportIcon.mousePressed();

    cactus.mousePressed();
    seedIcon.mousePressed();
  }
}

function windowResized() {
  console.log(`resized`);
  if (state === `inside-pod`) {
    resizeCanvas(windowWidth, windowHeight);
  }
}
