class Greenhouse {
  constructor(x, y, podImage) {
    this.x = x;
    this.y = y;
    this.podImage = podImage;
    this.width = 50;
    this.height = this.width * 1.2;
  }

  display() {
    imageMode(CENTER);
    image(this.podImage, this.x, this.y, this.width, this.height);
  }
}
