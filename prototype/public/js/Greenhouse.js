class Greenhouse {
  constructor(x, y, podImage, newCanvasWidth, newCanvasHeight) {
    this.x = x;
    this.y = y;
    this.podImage = podImage;
    this.width = 50;
    this.height = this.width * 1.2;

    this.newCanvasWidth = newCanvasWidth;
    this.newCanvasHeight = newCanvasHeight;
  }

  display() {
    push();
    imageMode(CENTER);
    image(this.podImage, this.x, this.y, this.width, this.height);
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
      state = `inside-pod`;
      console.log("touched");

      // resize canvas to windowWidth and windowHeight on click
      resizeCanvas(this.newCanvasWidth, this.newCanvasHeight);
    }
  }
}
