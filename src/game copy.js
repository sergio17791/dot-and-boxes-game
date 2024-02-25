// const config = {
//     type: Phaser.AUTO,
//     scale: {
//         mode: Phaser.Scale.RESIZE,
//         parent: 'game-container', // Nombre del elemento contenedor
//         width: '100%',
//         height: '100%'
//     },
//     audio: {
//         noAudio: true
//     },
//     scene: {
//         create: create
//     }
// };

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 1000,
  backgroundColor: "#000000",
  parent: "game-container",
  scene: {
    preload: preload,
    create: create,
  },
  audio: {
    noAudio: true,
  },
};

const game = new Phaser.Game(config);

function preload() {}

function create() {
  const rows = 5;
  const cols = 5;
  const lineWidth = 5;
  const lineColor = 0xff0000; // Color blanco
  const dotSize = 10;
  const dotColor = 0xff0000; // Color blanco

  drawLines(this, rows, cols, lineWidth, lineColor, dotSize, dotColor);
}
function drawLines(scene, rows, cols, lineWidth, lineColor, dotSize, dotColor) {
  // Calcula el espacio entre las líneas
  const spacingX = scene.sys.game.config.width / cols;
  const spacingY = scene.sys.game.config.height / rows;

  // Grupo para almacenar las líneas y los puntos
  const graphics = scene.add.graphics();

  // Dibujar líneas horizontales
  for (let y = 0; y <= rows; y++) {
    graphics.lineStyle(lineWidth, lineColor);
    graphics.beginPath();
    graphics.moveTo(0, y * spacingY);
    graphics.lineTo(cols * spacingX, y * spacingY);
    graphics.closePath();
    graphics.strokePath();

    // Agregar eventos de interacción a la línea horizontal
    const lineHitArea = new Phaser.Geom.Rectangle(
      0,
      y * spacingY - lineWidth / 2,
      cols * spacingX,
      lineWidth,
    );
    graphics.setInteractive(lineHitArea, Phaser.Geom.Rectangle.Contains);
    graphics.on(
      Phaser.Input.Events.POINTER_DOWN,
      function (pointer, localX, localY, event) {
        graphics.clear();
        drawLines(scene, rows, cols, lineWidth, 0x00ff00, dotSize, dotColor);
      },
    );
  }

  // Dibujar líneas verticales
  for (let x = 0; x <= cols; x++) {
    graphics.lineStyle(lineWidth, lineColor);
    graphics.beginPath();
    graphics.moveTo(x * spacingX, 0);
    graphics.lineTo(x * spacingX, rows * spacingY);
    graphics.closePath();
    graphics.strokePath();

    // Agregar eventos de interacción a la línea vertical
    const lineHitArea = new Phaser.Geom.Rectangle(
      x * spacingX - lineWidth / 2,
      0,
      lineWidth,
      rows * spacingY,
    );
    graphics.setInteractive(lineHitArea, Phaser.Geom.Rectangle.Contains);
    graphics.on(
      Phaser.Input.Events.POINTER_DOWN,
      function (pointer, localX, localY, event) {
        graphics.clear();
        drawLines(scene, rows, cols, lineWidth, 0x00ff00, dotSize, dotColor);
      },
    );
  }

  // Dibujar puntos en las intersecciones
  for (let y = 0; y <= rows; y++) {
    for (let x = 0; x <= cols; x++) {
      graphics.fillStyle(dotColor, 1);
      graphics.fillCircle(x * spacingX, y * spacingY, dotSize);
    }
  }
}
