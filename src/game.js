var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
  },
};

var game = new Phaser.Game(config);

function preload() {
  // Aquí puedes pre-cargar recursos si es necesario
}

let markedLines = 0;

function create() {
  const line1 = _createLine.call(this, 100, 100, 0, 0, 100, 0);
  const line2 = _createLine.call(this, 100, 200, 0, 0, 100, 0);
  const line3 = _createLine.call(this, 100, 100, 0, 0, 0, 100);
  const line4 = _createLine.call(this, 200, 100, 0, 0, 0, 100);
}

function _createLine(x, y, xStart, yStart, xEnd, yEnd) {
  const line = this.add.line(x, y, xStart, yStart, xEnd, yEnd);

  line.setStrokeStyle(50, 0xff0000);
  line.setLineWidth(10);
  line.setInteractive();

  line.setOrigin(0, 0);

  line.on("pointerdown", _markLine);
}

function _markLine() {
  this.setStrokeStyle(5, 0x00ff00);

  markedLines = markedLines + 1;

  console.log({markedLines})

  if (markedLines >= 4) {
    _paintSquare.call();
  }
}

function _paintSquare() {
  const graphics = this.add.graphics();

  const square = new Phaser.Geom.Rectangle(105, 105, 90, 90);

  graphics.fillStyle(0x00ff00);
  graphics.fillRectShape(square);
}
