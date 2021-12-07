class Plant {
  constructor(plantImages, growthStage, numMessagesNeededToGrow, position) {
    this.x = position.x;
    this.y = position.y;
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
    this.message = true;
  }

  display() {
    // looking for reference point
    push();
    stroke(0);
    strokeWeight(8);
    point(this.x, this.y);
    pop();

    push();
    imageMode(CENTER);

    // shake and change color
    if (this.message) {
      tint(255, 240, 0);
      translate(random(-2, 2), random(-2, 2));
    }

    image(this.plantImages[this.growthStage], this.x, this.y);

    pop();
  }

  mousePressed() {
    this.imageWidth = this.plantImages[this.growthStage].width / 2;
    this.imageHeight = this.plantImages[this.growthStage].height / 2;
    if (
      mouseX > this.x - this.imageWidth &&
      mouseX < this.x + this.imageWidth &&
      mouseY > this.y - this.imageHeight &&
      mouseY < this.y + this.imageHeight
    ) {
      document.getElementById("MessagingForm").style.display = "block";
    }
  }
}
