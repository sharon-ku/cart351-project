class HomeIcon extends Icon {
  constructor(x, y, iconImg, size) {
    super(x, y, iconImg, size);
  }

  display() {
    super.display();
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
