/******************************
Implementing our http server
******************************/

// // Import the Express library
// let express = require("express");
//
// // Create an instance of the Express object to access its methods and properties
// const app = express();
//
// const portNumber = 3000;
//
// // Listen on port 2 (view on browser using "localhost:2")
// let server = app.listen(portNumber);
//
// // When user goes on website, they see what's in the "public" directory
// app.use(express.static("public"));
//
// console.log("My socket server is running");
//
// // --------------
// // SOCKET STUFF
// // Run socket.io in the server (also running it in client, see script.js)
// // --------------
//
// // Import socket library
// let socket = require(`socket.io`);
// // Store in this variable:
// let io = socket(server);
//
// // Event for when we have a new connection:
// // - connection is the name of the event
// // - newConnection is the callback function
// io.sockets.on("connection", newConnection);
//
// function newConnection(socket) {
//   console.log(socket);
//   console.log(`new connection: ` + socket.id);
// }

let express = require('express');
const portNumber =3000;
let app = express(); //make an insatnce of express
let httpServer = require('http').createServer(app);
// create a server (using the Express framework object)
// declare io which mounts to our httpServer object (runs on top ... )
let io = require('socket.io')(httpServer);
// serving static files
let static = require('node-static'); // for serving static files (i.e. css,js,html...)

// make server listen for incoming messages
httpServer.listen(portNumber, function(){
  console.log('listening on port:: '+portNumber);
})


io.on('connect', newConnection);
  function newConnection(socket) {
    console.log(socket);
    console.log(`new connection: ` + socket.id);
    socket.on('join', function (data) {
     socket.emit('joinedClientId','temp');
  });

  }


  // serve anything from this dir ...
  app.use(express.static(__dirname + '/public'));
  // for the client...
  app.use(express.static(__dirname + '/node_modules'));


  //make a route
  app.get('/', function(req, res) {
      res.sendFile(__dirname + '/public/index.html');
  });
