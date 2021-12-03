class ButterflyIcon extends Icon {
  constructor(x, y, iconImg, size, jqueryModal) {
    super(x, y, iconImg, size);
    this.modal = jqueryModal;
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
      textSize(15);
      textFont(this.font);
      fill(this.aqua.r, this.aqua.g, this.aqua.b);
      text("Send butterflies", this.x, this.textY);
      pop();

      push();
      textSize(30);
      textFont(this.font);
      fill(255);
      text("Nothing here yet!", width / 2, 100);
      pop();
    }
  }

  mouseReleased() {
    // if mouse touches icon
    if (
      mouseX > this.x &&
      mouseX < this.x + this.size &&
      mouseY > this.y &&
      mouseY < this.y + this.size
    ) {
      console.log("send butterflies");
      console.log(this.modal);

      //  this.modal.toggle();
      document.getElementById("MessagingForm").style.display = "block";
    }
  }
}
