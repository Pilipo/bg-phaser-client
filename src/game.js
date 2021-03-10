import Phaser from 'phaser';
import { Client } from 'boardgame.io/client';
import { SocketIO } from 'boardgame.io/multiplayer';

const playerID = 0;

const TTT = {
  setup: () => ({
    cells: Array(9).fill(null),
  }),
  turn: {
    moveLimit: 1,
  },
  moves: {
    clickCell: (G, ctx, id) => {
      G.cells[id] = ctx.currentPlayer;
    }
  }
};

const bgClient = Client({
  game: TTT,
  multiplayer: SocketIO({ server: 'localhost:8000' }),
  playerID,
});

bgClient.start();

const play = new Phaser.Scene('Play');
let text;
let pointer;

play.preload = function () {
  this.load.image('board', 'assets/board.png');
  this.load.image('x', 'assets/x.png');
  this.load.image('o', 'assets/o.png');
}

play.create = function () {
  this.add.image(250, 250, 'board');
  text = this.add.text(600, 10, 'Move the mouse', { font: '16px Courier', fill: '#00ff00' });
  this.input.on('pointerup', function () {
    console.log({ x: pointer.x, y: pointer.y });
    const idx = convertPointToIndex({ x: pointer.x, y: pointer.y });
    console.log(`You click ${idx}`);
    bgClient.moves.clickCell(idx);
  })
}

play.update = function() {
  pointer = this.input.activePointer;

  text.setText([
    'x: ' + pointer.x,
    'y: ' + pointer.y,
    'mid x: ' + pointer.midPoint.x,
    'mid y: ' + pointer.midPoint.y,
    'velocity x: ' + pointer.velocity.x,
    'velocity y: ' + pointer.velocity.y,
    'movementX: ' + pointer.movementX,
    'movementY: ' + pointer.movementY
  ]);
}

new Phaser.Game({
  type: Phaser.AUTO,
  width: 1000,
  height: 500,
  scene: play,
  backgroundColor: '#ffffff',
});

function convertPointToIndex(point) {
  let x = null;
  let y = null;
  if (point.x < 145) {
    x = 0;
  } else if (point.x >= 145 && point.x < 320) {
    x = 1;
  } else if (point.x >= 320 && point.x < 500) {
    x = 2;
  }
  if (point.y < 145) {
    y = 0;
  } else if (point.y >= 145 && point.y < 355) {
    y = 1;
  } else if (point.y >= 355 && point.y < 500) {
    y = 2;
  }
  return (x % 3) + (y * 3);
}
