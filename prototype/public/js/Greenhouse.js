class Greenhouse {
  constructor(x, y, podImage, state, newState) {
    this.x = x;
    this.y = y;
    this.podImage = podImage;
    this.width = 50;
    this.height = this.width * 1.2;
    // this.state = state;
    // this.newState = newState;
  }

  display() {
    imageMode(CENTER);
    image(this.podImage, this.x, this.y, this.width, this.height);
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
