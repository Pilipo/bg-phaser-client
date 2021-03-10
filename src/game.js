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

new Phaser.Game({
  type: Phaser.AUTO,
  width: 500,
  height: 500,
  scene: {
    preload,
    create
  },
  backgroundColor: '#ffffff',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
});

function preload() {
  this.load.image('board', 'assets/board.png');
  this.load.image('x', 'assets/x.png');
  this.load.image('o', 'assets/o.png');
}

function create() {
  const bg = this.add.image(250, 250, 'board');
}
