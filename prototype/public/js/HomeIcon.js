class HomeIcon extends Icon {
  constructor(x, y, iconImg, size) {
    super(x, y, iconImg, size);
  }

  display() {
    super.display();
  }

  overlap() {
    super.overlap();

    if (
      mouseX > this.x &&
      mouseX < this.x + this.size &&
      mouseY > this.y &&
      mouseY < this.y + this.size
    ) {
      push();
      textSize(10);
      textFont(this.font);
      fill(this.aqua.r, this.aqua.g, this.aqua.b);
      text("Go Back", this.x, this.textY);
      pop();
    }
  }

  mousePressed() {
    // if mouse touches icon
    if (
      mouseX > this.x - this.size / 2 &&
      mouseX < this.x + this.size / 2 &&
      mouseY > this.y - this.size / 2 &&
      mouseY < this.y + this.size / 2
    ) {
      state = `pod-navigation`;
      console.log("clicked on Home Icon");
    }
  }
}
