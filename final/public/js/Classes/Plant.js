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
    this.move = random(-10, 10);

    // to add to constructor
    this.message = true;
  }

  display() {
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

  grow() {
    // if messages received, emit data to growthStage in Plant collection
  }

  mousePressed() {
    push();
    textSize(34);
    textFont(this.font);
    fill(this.aqua.r, this.aqua.g, this.aqua.b);
    text("Eugene was sent to you by uwu", 100, 100);
    pop();
  }
}
