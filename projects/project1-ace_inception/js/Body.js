class Body extends ImgBase {
  constructor(x, y, image, scale) {
    super(x, y, image, scale);
    this.x = x;
    this.y = y + 105;
  }

  display() {
    super.display();
  }

}
