/****************************************
MongoDB set up
*****************************************/

// for parsing
let bodyParser = require("body-parser");

//new get user module
const User = require("./user");

// //new get fruit node_module
// const Fruit = require("./fruit");

// new greenhouse module
const Greenhouse = require("./greenhouse");

//5: add the connection code:
const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

//good idea to put in the password when running from the terminal (for testing and PLEASE do not share :: (mine is XML2asp))
//database name is myFirstDatabase (creates)

// const url = `mongodb+srv://sab-comp:${password}@cluster0.7p8bo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const url = `mongodb+srv://ben:${password}@cluster0.kdjyl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url);
let db = mongoose.connection;

//bind to error event
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

/****************************************
Node set up
*****************************************/

let express = require("express");
const portNumber = 3000;
let app = express(); //make an insatnce of express
let httpServer = require("http").createServer(app);
// create a server (using the Express framework object)
// declare io which mounts to our httpServer object (runs on top ... )
let io = require("socket.io")(httpServer);
// serving static files
let static = require("node-static"); // for serving static files (i.e. css,js,html...)

let clientIdIncrementing = 0;
let clientIds = [];

//https://www.npmjs.com/package/body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//default route
app.get("/", function (req, res) {
  res.send("<h1>Hello world</h1>");
});

// new when user posts data register

app.post("/registerIn", async (request, response) => {
  const body = request.body;
  console.log(body);
  const saltRounds = 10;
  // const passwordHash = await bcrypt.hash(body.password, saltRounds);

  //is user already in?
  User.find({ username: body.username }).then((result) => {
    //result.forEach(fruit => {
    // console.log(fruit)
    console.log(result);

    if (result.length == 0) {
      //response.json("no user");

      const user = new User({
        username: body.username,
        // name: body.name,
        passwordHash: body.password,
      });
      //save to db
      user.save().then((result) => {
        response.json(result);
      });
    } //not in
    else {
      response.json("ALREADY IN");
    }
    //find
  });
  //done
});

//when user posts data -logIn:
app.post("/logIn", async (request, response) => {
  const body = request.body;
  console.log(body);
  // for now just do opposite of register ... do not worry about testing for password
  //is user already in?
  User.find({ username: body.username }).then((result) => {
    if (result.length == 1) {
      response.json(result);
    } else {
      response.json("WRONG INFO");
    }
  });
});

//for user register page
app.get("/userRegister", function (req, res) {
  response.sendFile(__dirname + "/public/newUser.html");
});

//for user login page
app.get("/userLogin", function (req, res) {
  response.sendFile(__dirname + "/public/index.html");
});

// make server listen for incoming messages
httpServer.listen(portNumber, function () {
  console.log("listening on port:: " + portNumber);
});

/*** THIS ONLY HAPPENS ONCE A CLIENT HAS SUCCESSFULLY LOGGED IN *****/
io.on("connect", newConnection);

function newConnection(socket) {
  let userDB = null;

  console.log(socket);
  console.log(`new connection: ` + socket.id);

  socket.on("join", function (data) {
    socket.emit("joinedClientId", "temp");
    console.log(data);
    userDB = data;
  });

  // request Greenhouses from MongoDB into server
  socket.on("requestGreenhouses", function (data) {
    Greenhouse.find({}).then((result) => {
      result.forEach((greenhouse) => {
        console.log(greenhouse);
      });
      socket.emit("newGreenhouses", result);
    });
  });

  // update Greenhouse's taken value in MongoDB
  socket.on("updateTakenGreenhouse", function (data) {
    let tempUser = data.userInfo;
    let x = data.x;
    let y = data.y;
    console.log(userDB);
    Greenhouse.updateOne({ x: x, y: y }, { taken: true }).then((result) => {
      console.log(`greenhouse updated`);
      console.log(x, y);
      console.log(result);

      Greenhouse.findOne({ x: x, y: y }).then((result) => {
        console.log(`hello new`);
        // console.log(result[0].toJSON());
        console.log(tempUser);
        console.log(tempUser.username);

        User.findOne({ username: tempUser.username }).then((resultUser) => {
          resultUser.podId = resultUser.podId.concat(result._id);
          console.log(resultUser);

          resultUser.save().then((result) => {
            console.log("done");
          });
        });
      });
    });

    // User.find({ user: tempUser }).then((result) => {
    //   console.log("teststtstsgt");
    //   console.log(result[0].toJSON());
    //
    //   Fruit.find({ user: result[0].id }).then((fruitResult) => {
    //     fruitResult.forEach((fruit) => {
    //       console.log(fruit);
    //     });
    //     socket.emit("new_data_other", fruitResult);
    //   });
    //   //back to client
    //   // socket.emit('new_data', result);
    //
    //   //now get the fruits that match another user
    // });

    console.log("hello");
    console.log(userDB);
  });

  socket.on("getUserPodPositions", function () {
    // console.log(`visiting`);
    // let x = data.x;
    // let y = data.y;

    // BAD ATTEMPT NUMBER 1
    // Greenhouse.findOne({ x: x, y: y }).then((greenhouseResult) => {
    //   // console.log(greenhouseResult.id);
    //   // greenhouse id that we're inside: greenhouseResult._id
    //
    //   User.findOne({ username: userDB.username }).then((userResult) => {
    //     console.log(greenhouseResult._id);
    //     if (greenhouseResult._id === userResult.podId[0]) {
    //       console.log(`match!`);
    //       socket.emit("changeTintOfUserGreenhouse", result);
    //     } else {
    //       console.log(`no match`);
    //     }
    //
    //     // resultUser.podId = resultUser.podId.concat(result._id);
    //     // console.log(resultUser);
    //   });
    //
    // });

    User.findOne({ username: userDB.username }).then((userResult) => {
      console.log(`user's pod id`);
      console.log(userResult.podId[0]);
      // console.log(greenhouseResult.id);
      // greenhouse id that we're inside: greenhouseResult._id

      Greenhouse.findOne({ _id: userResult.podId[0] }).then(
        (greenhouseResult) => {
          console.log(greenhouseResult._id);
          console.log(greenhouseResult.x);
          console.log(greenhouseResult.y);

          socket.emit("foundUserGreenhousePositions", greenhouseResult);

          // // underneath code still does not work
          // if (greenhouseResult._id === userResult.podId[0]) {
          //   console.log(`match!`);
          //   // socket.emit("changeTintOfUserGreenhouse", result);
          // } else {
          //   console.log(`no match`);
          // }
        }
      ); // greenhouse find one
    }); // user find one
  }); // socket on

  socket.on("visitPod", function (data) {
    let x = data.x;
    let y = data.y;
    let userInfo = userDB.podID;
    Greenhouse.findOne({ x: x, y: y }).then((visitPodResult) => {
      console.log("visiting a pod:" + visitPodResult);

      console.log("id of visited pod :" + visitPodResult.id);

      // if (visitPodResult.id != userInfo) {
      socket.emit("foundPodVisited", visitPodResult);
      //
      // console.log("my home" + userDB.podID);
      // console.log("this is not my home");
      // }
    });
  });
} //io.on

// serve anything from this dir ...
app.use(express.static(__dirname + "/public"));
// for the client...
app.use(express.static(__dirname + "/node_modules"));

//make a route
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
