class Greenhouse {
  constructor(x, y, podImage, newCanvasWidth, newCanvasHeight, taken) {
    this.x = x;
    this.y = y;
    this.podImage = podImage;
    this.width = 50;
    this.height = this.width * 1.2;
    this.alpha = undefined; // image transparency
    this.taken = taken;

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
    // If new user, we want unoccupied to be full opacity and occupied to be transparent
    if (state === `new-user`) {
      // if taken = false
      if (!this.taken) {
        // full opacity
        this.alpha = 95;
      } else {
        // if taken = true
        // transparent
        this.alpha = 255;
      }
    }
    // Else if pod-navigation, occupied is full opacity and unoccupied is transparent
    else if (state === `pod-navigation`) {
      // if taken = false
      if (!this.taken) {
        // full opacity
        this.alpha = 255;
      } else {
        // if taken = true
        // transparent
        this.alpha = 95;
      }
    }

    tint(255, this.alpha);
    image(this.podImage, this.x, this.y, this.width, this.height);

    pop();
  }

  // Check if mouse overlaps pod
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
    if (this.overlap()) {
      if (state === `new-user`) {
        console.log(`new home`);
        // assign this pod to new user
        push();
        textSize(25);
        textAlign(CENTER);
        textFont(font);
        fill(aqua.r, aqua.g, aqua.b);
        text(
          "Welcome, this is now your new home!",
          windowWidth / 2,
          windowHeight / 2
        );
        pop();
      } else if (state === `pod-navigation`) {
        state = `inside-pod`;
        // console.log("clicked pod");

        // resize canvas to windowWidth and windowHeight on click
        resizeCanvas(this.newCanvasWidth, this.newCanvasHeight);
      } // if pod-navigation
    } // if overlap
  }
}
