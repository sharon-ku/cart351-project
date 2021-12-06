/**
script.js
Sharon Ku & Leanne Suen Fa

All our p5 stuff
Linked to greenhouses.html
*/

"use strict";

// To allow client to connect to socket
let clientSocket;
let socketId = -1;
let running = false;

// Stores user info from DB
let userInfo = undefined;

// User's pod positions
let userPodX = undefined;
let userPodY = undefined;

// visitor pod coordinates
let visitPodX = undefined;
let visitPodY = undefined;

let bkg;
let canvasWidth = 3000;

// All possible states:
// new-user, pod-navigation, inside-pod, plant-view
// let state = `pod-navigation`;
let state = undefined;

// state when inside pod: can either be `visiting` or `home`
let podState = undefined;

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
// all plants in a single pod
let garden = [];
let displayGarden;

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

// bkg Music
let bkgMusic;

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

  // load background Music
  bkgMusic = loadSound(`assets/music/Sugar_Cookie/sugar_cookie.mp3`);
}

/* ----------------------------------------
setup()
-----------------------------------------*/
function setup() {
  bkg = createCanvas(canvasWidth, canvasWidth);
  bkg.position(0, 0);
  bkg.style("z-index", -1);

  // grab user data from local storage and store it in userInfo variable
  userInfo = JSON.parse(localStorage.getItem(`user`))[0];
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

      // only start draw once running is true
      running = true;
    });
  });

  // display greenhouses from database
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

      // Request the user greenhouse positions to be found
      clientSocket.emit("getUserPodPositions");
    }
  });

  // Once the user's pod has been found, change its tint
  clientSocket.on("foundUserGreenhousePositions", function (result) {
    userPodX = result.x;
    userPodY = result.y;

    console.log(userPodX, userPodY);

    // change tint color of user greenhouse
    for (let i = 0; i < pods.length; i++) {
      let pod = pods[i];
      if (pod.x === userPodX && pod.y === userPodY) {
        pod.setUserPodTint();
        // set pod's taken value to true
        pod.taken = true;
      }
    }
  });

  // get visiting pod coordinates
  clientSocket.on("foundPodVisited", function (result) {
    visitPodX = result.x;
    visitPodY = result.y;
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

  let teleportIcon_Y = iconX_R + iconSize * 2.7;

  teleportIcon = new TeleportIcon(
    iconX_L,
    teleportIcon_Y,
    teleportIconImg,
    iconSize
  );

  let seedIcon_Y = iconX_R + iconSize * 1.4;
  seedIcon = new SeedIcon(iconX_L, seedIcon_Y, seedIconImg, iconSize);

  // Create sparkling stars!
  for (let i = 0; i < NUM_STARS; i++) {
    let star = new Star();
    stars.push(star);
  }

  //++++ To remove
  // Create plant
  // cactus = new Plant(windowWidth / 2, windowHeight / 2, cactusImages);
  // For now, cactus stores a random plant image

  cactus = new Plant(random(allPlantImages));

  // ****does not work
  // display greenhouses from database
  clientSocket.on("displayPlant", function (results) {
    for (let i = 0; i < results.length; i++) {
      console.log(results[i]);
      let plantType = results[i].name;
      let growthStage = results[i].growthStage;

      console.log(plantType);

      // fill garden with plants and their growth stages
      if (plantType === "cherry") {
        garden[i] = cherryImages[growthStage];
      } else if (plantType === "dragon") {
        garden[i] = dragonImages[growthStage];
      } else if (plantType === "cactus") {
        garden[i] = cactusImages[growthStage];
      }
      displayGarden = new Plant(garden);
      console.log(garden);
    }
  });

  // Check if user is new using their pod id value:
  if (userInfo.podId.length === 0) {
    // user does not have a pod
    console.log(`no greenhouse`);
    state = `new-user`;
  } else {
    // user already has a greenhouse
    console.log(`yes greenhouse`);
    state = `pod-navigation`;
  }
}

/* ----------------------------------------
draw()
-----------------------------------------*/
function draw() {
  if (running) {
    // background(teal.r, teal.g, teal.b);
    background(31, 80, 80);
    // add music - to activate later
    // music();
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
    star.update();
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
    star.update();
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
    star.update();
  }

  push();
  textSize(24);
  textFont(font);
  fill(aqua.r, aqua.g, aqua.b);
  text("Welcome Home !", windowWidth * 0.025, windowHeight * 0.95);
  pop();

  // if at home
  if (userPodX === visitPodX && userPodY == visitPodY) {
    homeIcon.display();
    homeIcon.overlap();
  } else {
    homeIcon.display();
    homeIcon.overlap();

    butterflyIcon.display();
    butterflyIcon.overlap();

    teleportIcon.display();
    teleportIcon.overlap();

    seedIcon.display();
    seedIcon.overlap();
  }

  //++++ To remove
  cactus.display();
  // display garden
  displayGarden.display();
}

function mousePressed() {
  for (let i = 0; i < pods.length; i++) {
    let pod = pods[i];
    pod.mousePressed(userInfo);
  }

  if (state === `inside-pod`) {
    homeIcon.mousePressed();
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

//Loop background music
function music() {
  if (!bkgMusic.isPlaying()) {
    bkgMusic.loop();
  }
}
