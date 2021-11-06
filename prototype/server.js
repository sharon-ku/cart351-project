/******************************
Implementing our http server
******************************/

// Import the Express library
let express = require("express");

// Create an instance of the Express object to access its methods and properties
const app = express();

const portNumber = 2;

// Listen on port 2 (view on browser using "localhost:2")
let server = app.listen(portNumber);

// When user goes on website, they see what's in the "public" directory
app.use(express.static("public"));

console.log("My socket server is running");
