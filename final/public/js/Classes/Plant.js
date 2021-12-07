class Plant {
  constructor(plantImages, growthStage, numMessagesNeededToGrow, position) {
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
    this.readState = true;
  }

  display() {
    push();
    imageMode(CENTER);

    // shake and change color
    if (!this.readState) {
      tint(255, 240, 0);
      translate(random(-2, 2), random(-2, 2));
    }

    translate(this.x, this.y);
    scale(this.scale);
    image(this.plantImages[this.growthStage], 0, 0);

    pop();
  }

  mousePressed() {
    this.imageWidth =
      (this.plantImages[this.growthStage].width / 2) * this.scale;
    this.imageHeight =
      (this.plantImages[this.growthStage].height / 2) * this.scale;

    if (
      mouseX > this.x - this.imageWidth &&
      mouseX < this.x + this.imageWidth &&
      mouseY > this.y - this.imageHeight &&
      mouseY < this.y + this.imageHeight
    ) {
      // if message has not been read, display message received on click
      if (!this.readState) {
        document.getElementById("receivedMessageForm").style.display = "block";
      } else if (this.readState) {
        // if message has been read, display send message form
        document.getElementById("MessagingForm").style.display = "block";
      }
    }
  }
}
