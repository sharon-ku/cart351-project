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
    imageMode(CENTER);

    // image appearing depends on growth stage
    if (this.growthStage < 10) {
      image(this.babyPlant, this.x, this.y);
    } else if (this.growthStage >= 10 && this.growthStage < 20) {
      image(this.youngPlant, this.x, this.y);
    } else {
      image(this.bloomPlant, this.x, this.y);
    }
  }
}
