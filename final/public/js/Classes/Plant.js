class Plant {
  constructor(
    id,
    plantImages,
    growthStage,
    numMessagesNeededToGrow,
    messages,
    position
  ) {
    this.id = id;
    this.x = position.x;
    this.y = position.y;
    this.scale = 0.5;
    this.aqua = {
      r: 45,
      g: 227,
      b: 240,
    };
    this.font = `quicksand,sans-serif`;
    this.plantImages = plantImages;
    this.growthStage = growthStage;
    this.numMessagesNeededToGrow = numMessagesNeededToGrow;

    // to add to constructor
    this.messages = messages;
    this.readState = true;

    this.imageWidth = this.plantImages[this.growthStage].width / 2;
    this.imageHeight = this.plantImages[this.growthStage].height / 2;
    this.messageIndex = 0;
  }

  display() {
    push();
    imageMode(CENTER);

    // shake and change color
    if (this.messages.length > 0) {
      tint(255, 240, 0);
      translate(random(-2, 2), random(-2, 2));
    }

    translate(this.x, this.y);
    scale(this.scale);
    image(this.plantImages[this.growthStage], 0, 0);

    pop();
  }

  overlap() {
    if (
      mouseX > this.x - this.imageWidth &&
      mouseX < this.x + this.imageWidth &&
      mouseY > this.y - this.imageHeight &&
      mouseY < this.y + this.imageHeight
    ) {
      return true;
    } else {
      return false;
    }
  }

  mousePressed() {
    if (this.overlap()) {
      // // get the visit plant's data
      // clientSocket.emit("getAllPlantData", {
      //   x: this.x,
      //   y: this.y,
      // });

      // if you are in your pod
      if (userPodX === visitPodData.x && userPodY == visitPodData.y) {
        console.log(`working`);
        console.log(this.messages);

        // if message has not been read, display message received on click
        if (this.messages.length > 0) {
          // if (this.messages[0])

          console.log(`you got messages`);
          document.getElementById("receivedMessageForm").style.display =
            "block";

          document.getElementById("senderName").innerHTML =
            "Sent by :" + this.messages[0].senderUsername;

          document.getElementById(
            "messageReceived"
          ).innerHTML = this.messages[0].message;

          // for (let i = 0; i < this.messages.length; i++) {
          // create a title
          // this.createTitle = document.createElement("h2");
          // // create title content
          // this.sender = document.createTextNode(
          //   this.messages[0].senderUsername + " : "
          // );
          // // append title content to h2
          // this.createTitle.appendChild(this.sender);
          // document.getElementById("messageBody").appendChild(this.createTitle);
          //
          // // create a paragraph for message body
          // this.createPara = document.createElement("p");
          // this.messageContent = document.createTextNode(
          //   this.messages[0].message
          // );
          // this.createTitle.appendChild(this.messageContent);
          // document.getElementById("messageBody").appendChild(this.createPara);
          // }
        }
      }
      // else, if you're in someone else's pod, you can only send messages
      else {
        console.log(`no spies`);
        console.log(`cannot see messages in someone else's pod`);
        // if message has been read, display send message form
        document.getElementById("MessagingForm").style.display = "block";
      }
    }
  }
}
