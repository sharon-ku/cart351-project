//window.onload=function(){

function startClientSocketConnection(userInfo) {
  console.log("client js for socket ex is loaded");
  //set up the client socket to connect to the socket.io server
  let clientSocket = io.connect("http://localhost:4200");
  let socketId = -1;
  //the user id FROM THE DB!!!!
  //let myUserId =  data[0].id;
  console.log(userInfo);
  clientSocket.on("connect", function (data) {
    console.log("connected");
    // put code here that should only execute once the client is connected
    /*********************************************************************************************/
    // NEW:: pass the userID from db so server can CONNECT the userID and socket id together ... */
    /********************************************************************************************/
    clientSocket.emit("join", userInfo);
    // handler for receiving client id
    clientSocket.on("joinedClientId", function (data) {
      socketId = data;
      console.log("myId " + socketId);
    });

    //when we have a submitted the form
    $("#fruitTest").submit(function (event) {
      //stop submit the form, we will post it manually. PREVENT THE DEFAULT behaviour ...
      event.preventDefault();
      console.log("button clicked");
      let data = $("#fruitTest").serializeArray();
      /*for console log */
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
      }

      //lazy :)
      let objToSend = {
        fruit_name: data[0].value,
        fruit_description: data[1].value,
        like_rating: data[2].value,
      };
      //send to server
      //option 1:
      // clientSocket.emit("dataFromClient", objToSend);
      //option 2:
      clientSocket.emit("dataFromClientToANOTHER", objToSend);
    });

    //button
    $("#buttonQ").on("click", function (event) {
      event.preventDefault();
      console.log("getting results");
      //send a request
      clientSocket.emit("requestData");
    });

    $("#buttonR").on("click", function (event) {
      event.preventDefault();
      console.log("getting results");
      //send a request
      clientSocket.emit("requestDataSingle", { parameter: "Banana" });
    });

    $("#buttonW").on("click", function (event) {
      event.preventDefault();
      console.log("getting results of other");
      //send a request with an existing user...
      clientSocket.emit("requestDataOther", { parameter: "skippy" });
    });

    //get data
    clientSocket.on("new_data", function (results) {
      $("#resultSet").html("");
      //console.log(results);
      for (let i = 0; i < results.length; i++) {
        let c = $("#resultSet").html();
        c = c + results[i].fruit_name + "<br>";
        $("#resultSet").html(c);
      }
    });

    //get data
    clientSocket.on("new_data_other", function (results) {
      $("#resultSetOther").html("");
      //console.log(results);
      for (let i = 0; i < results.length; i++) {
        let c = $("#resultSetOther").html();
        c = c + results[i].fruit_name + "<br>";
        $("#resultSetOther").html(c);
      }
    });
  }); //connect
} //function startclientSocketConenction -AFTER LOGIN
