class Plant {
  constructor(plantImages) {
    this.x = random(windowWidth / 8, (windowWidth / 8) * 7);
    this.y = random(windowHeight / 8, (windowHeight / 8) * 7);
    this.aqua = {
      r: 45,
      g: 227,
      b: 240,
    };
    this.font = `quicksand,sans-serif`;
    this.plantImages = plantImages;
    this.imageIndex = 1;
  }

  display() {
    push();
    imageMode(CENTER);
    image(this.plantImages[this.imageIndex], this.x, this.y);
    pop();
  }

  mousePressed() {
    push();
    textSize(34);
    textFont(this.font);
    fill(this.aqua.r, this.aqua.g, this.aqua.b);
    text("Eugene was sent to you by uwu", 100, 100);
    pop();
    // console.log("clicked plant");
  }
}
