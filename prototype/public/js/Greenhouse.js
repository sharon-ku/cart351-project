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

  update() {
    this.display();

    if (this.overlap()) {
      this.width = 60;
      this.height = this.width * 1.2;
    } else {
      this.width = 50;
      this.height = this.width * 1.2;
    }
  }

  display() {
    // looking for reference point
    // push();
    // stroke(0);
    // strokeWeight(8);
    // point(this.x, this.y);
    // pop();

    push();
    // imageMode(CENTER);
    imageMode(CORNER);
    image(this.podImage, this.x, this.y, this.width, this.height);
    pop();
  }

  overlap() {
    if (
      mouseX > this.x &&
      mouseX < this.x + this.podImage.width / 8 &&
      mouseY > this.y &&
      mouseY < this.y + this.podImage.height / 8
    ) {
      return true;
    } else {
      return false;
    }
  }

  mousePressed() {
    // if mouse touches pod image
    if (
      mouseX > this.x &&
      mouseX < this.x + this.podImage.width / 8 &&
      mouseY > this.y &&
      mouseY < this.y + this.podImage.height / 8
    ) {
      state = `inside-pod`;
      console.log("clicked pod");

      // resize canvas to windowWidth and windowHeight on click
      resizeCanvas(this.newCanvasWidth, this.newCanvasHeight);
    }
  }
}
