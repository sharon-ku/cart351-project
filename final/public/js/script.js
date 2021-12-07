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

// stores data related to pod we're visiting
let visitPodData = {
  // id
  _id: undefined,
  // visitor pod coordinates
  x: undefined,
  y: undefined,
};

// stores all data on user we're visiting
let visitUserData = {
  _id: undefined,
  username: undefined,
  podId: [],
};

// stores all data on plants inside visiting pod
let visitPlantsData = [];

// stores all plants in current visited pod
let visitGarden = [];

// stores the id of plant who has a "send message" modal opened
let currentSendMessagePlant = undefined;

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

      // Request the user greenhouse positions to be found
      clientSocket.emit("getUserPodPositions");
    }
  });

  // Once the user's pod has been found, change its tint
  clientSocket.on("foundUserGreenhousePositions", function (result) {
    userPodX = result.x;
    userPodY = result.y;

    console.log(`user pod positions:${userPodX}, ${userPodY}`);

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
    visitPodData.x = result.x;
    visitPodData.y = result.y;
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

  let iconX_L = windowWidth - iconSize * 1.1 - 30;
  let iconY_L = windowHeight * 0.02;

  let seedIcon_Y = iconX_R + iconSize * 1.4;
  seedIcon = new SeedIcon(
    iconX_L,
    iconY_L,
    seedIconImg,
    iconSize,
    visitGarden.length
  );

  // Create sparkling stars!
  for (let i = 0; i < NUM_STARS; i++) {
    let star = new Star();
    stars.push(star);
  }

  // display user visited from database
  clientSocket.on("foundUserVisited", function (result) {
    visitUserData = result;
    console.log(`currently visiting:` + visitUserData.username);
  });

  // display plants from database
  clientSocket.on("foundPlants", function (results) {
    for (let i = 0; i < results.length; i++) {
      console.log(results[i]);

      // Store all plant results inside visitPlantsData array
      visitPlantsData.push(results[i]);

      let plant = {
        name: results[i].name,
        images: undefined,
        growthStage: results[i].growthStage,
        numMessagesNeededToGrow: results[i].numMessagesNeededToGrow,
        position: {
          x: results[i].position.x,
          y: results[i].position.y,
        },
      };

      // set images based on plant type
      if (plant.name === "cherry") {
        plant.images = cherryImages;
      } else if (plant.name === "dragon") {
        plant.images = dragonImages;
      } else if (plant.name === "cactus") {
        plant.images = cactusImages;
      }

      // create a new plant
      let newPlant = new Plant(
        plant.images,
        plant.growthStage,
        plant.numMessagesNeededToGrow,
        plant.position
      );

      // add this plant to visitGarden
      visitGarden.push(newPlant);
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
  if (userPodX === visitPodData.x && userPodY == visitPodData.y) {
    homeIcon.display();
    homeIcon.overlap();

    // EMIT USER MESSAGES HERE
  } else {
    homeIcon.display();
    homeIcon.overlap();

    seedIcon.display();
    seedIcon.overlap();
  }

  // display garden
  for (let i = 0; i < visitGarden.length; i++) {
    let plant = visitGarden[i];
    plant.display();
  }
}

function mousePressed() {
  for (let i = 0; i < pods.length; i++) {
    let pod = pods[i];
    pod.mousePressed(userInfo);
  }

  if (state === `inside-pod`) {
    homeIcon.mousePressed();

    seedIcon.mousePressed();

    for (let i = 0; i < visitGarden.length; i++) {
      let plant = visitGarden[i];
      plant.mousePressed();

      // Store currentSendMessagePlant info so we can find this plant in DB
      currentSendMessagePlant = visitPlantsData[i];
    }
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

// submit message
$("#submitMsg").click(function () {
  event.preventDefault();
  let closeMessageForm = new FormData($("#messageForm")[0]);

  let message = {};

  // Display the key/value pairs
  for (var pair of closeMessageForm.entries()) {
    console.log(pair[0] + ", " + pair[1]);
    message[pair[0]] = pair[1];
  }

  console.log(message);

  clientSocket.emit(`sendMessage`, {
    message: message,
    plant: currentSendMessagePlant,
  });

  // deletes text in search bar
  // $("#messageBox").empty();
});

// submit seed choice
$("#submitSeedChoice").click(function () {
  event.preventDefault();
  let closeMessageForm = new FormData($("#selectSeed")[0]);

  let seed = {};

  // Display the key/value pairs
  for (var pair of closeMessageForm.entries()) {
    console.log(pair[0] + ", " + pair[1]);
    seed[pair[0]] = pair[1];
  }
  let seedX = 200 + Math.floor(Math.random() * (windowWidth - 200));
  let seedY = 200 + Math.floor(Math.random() * (windowHeight - 200));

  console.log(seed);

  clientSocket.emit(`selectSeed`, {
    seed: seed,
    visitUser: visitUserData,
    seedX: seedX,
    seedY: seedY,
  });

  clientSocket.emit("getAllVisitPodData", {
    x: visitPodData.x,
    y: visitPodData.y,
  });
});
