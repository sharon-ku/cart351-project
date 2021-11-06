/******************************
Implementing our http server
******************************/

// Import the Express library
let express = require("express");

// Create an instance of the Express object to access its methods and properties
let app = express();

// Listen on port 3000 (view on browser using "localhost:3000")
let server = app.listen(3000);

console.log("My socket server is running");
