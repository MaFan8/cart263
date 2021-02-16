class Body extends ImgBase {
  constructor(x, y, image) {
    super(x, y, image);
    this.y = y + 180;
  }

  display() {
    super.display();
  }

}
