import Phaser from 'phaser';
import { Client } from 'boardgame.io/client';
// import TTTGame from './scenes/TTTGame';

const TTT = {
  setup: () => ({
    cells: Array(9).fill(null),
  }),
  moves: {
    clickCell: (G, ctx, id) => {
      G.cells[id] = ctx.currentPlayer;
      console.log('fired');
    }
  }
};

const bgClient = Client({
  game: TTT,
});

bgClient.start();

new Phaser.Game({
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: {
    preload,
    create
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  bgClient
});

function preload() {
  this.load.setBaseURL('http://labs.phaser.io');
  this.load.image('logo', 'assets/sprites/phaser3-logo.png');
}

function create() {
  const coord = [
    { x: 200, y: 100 },
    { x: 600, y: 100 },
    { x: 1000, y: 100 },
    { x: 200, y: 360 },
    { x: 600, y: 360 },
    { x: 1000, y: 360 },
    { x: 200, y: 620 },
    { x: 600, y: 620 },
    { x: 1000, y: 620 },
  ];
  for (let idx = 0; idx < 9; idx++) {
    const logo = this.add.image(coord[idx].x, coord[idx].y, 'logo');
    logo.setInteractive();
    logo.setAngle(30);
    logo.on('pointerup', (pointer) => {
      bgClient.moves.clickCell(idx);
      const state = bgClient.getState();
      console.log(state.G.cells);
    })
  }
}
