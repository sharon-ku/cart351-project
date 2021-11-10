class Plant {
  constructor(x, y, plantImg) {
    this.x = x;
    this.y = y;
    this.aqua = {
      r: 45,
      g: 227,
      b: 240,
    };
    this.font = `quicksand,sans-serif`;
    this.plantImg = plantImg;
  }

  display() {
    push();
    imageMode(CENTER);
    image(this.plantImg, this.x, this.y);
    pop();
  }

  text() {
    push();
    textSize(34);
    textFont(this.font);
    fill(this.aqua.r, this.aqua.g, this.aqua.b);
    text("Eugene was sent to you by uwu", 100, 100);
    pop();
  }

  mousePressed() {
    text();
    console.log("clicked plant");
  }
}
