class Plant {
  constructor(x, y, babyPlant, youngPlant, bloomPlant, growthStage) {
    this.x = x;
    this.y = y;
    this.babyPlant = babyPlant;
    this.youngPlant = youngPlant;
    this.bloomPlant = bloomPlant;

    this.height = random(50, 100);
    this.width = random(40, 60);

    this.growthStage = growthStage; //baby seedling - young plant - blooming plant
  }

  display() {
    push();
    imageMode(CENTER);

    // image appearing depends on growth stage
    if (this.growthStage < 10) {
      image(this.babyPlant, this.x, this.y);
    } else if (this.growthStage >= 10 && this.growthStage < 20) {
      image(this.youngPlant, this.x, this.y);
    } else {
      image(this.bloomPlant, this.x, this.y);
    }
    pop();
  }

  mousePressed() {
    // if mouse touches pod image
    if (
      mouseX > this.x - this.podImage.width / 2 &&
      mouseX < this.x + this.podImage.width / 2 &&
      mouseY > this.y - this.podImage.height / 2 &&
      mouseY < this.y + this.podImage.height / 2
    ) {
      // this.state = this.newState;
      state = `plant-view`;
      console.log("touched");
    }
  }
}
