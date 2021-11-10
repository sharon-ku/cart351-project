class Icon {
  constructor(x, y, iconImg, size) {
    this.x = x;
    this.y = y;
    this.img = iconImg;
    this.size = size;
  }

  display() {
    push();
    imageMode(CENTER);

    image(this.img, this.x, this.y, this.size, this.size);
    pop();
  }
}
