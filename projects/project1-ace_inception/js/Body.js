class Body extends ImgBase {
  constructor(x, y, image) {
    super(x, y, image);
    this.x = x;
    this.y = y + 92;
  }

  display() {
    super.display();
  }

}
