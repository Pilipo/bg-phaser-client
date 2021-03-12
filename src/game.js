import Phaser from 'phaser';
import { Client, LobbyClient } from 'boardgame.io/client';
import { SocketIO } from 'boardgame.io/multiplayer';
import { INVALID_MOVE } from 'boardgame.io/core';

const TTT = {
  name: 'TicTacToe',
  setup: () => ({
    cells: Array(9).fill(null),
  }),
  turn: {
    moveLimit: 1,
  },
  moves: {
    clickCell: (G, ctx, id) => {
      if (G.cells[id] !== null) {
        return INVALID_MOVE;
      }
      G.cells[id] = ctx.currentPlayer;
    }
  },
  endIf: (G, ctx) => {
    if (IsVictory(G.cells)) {
      return { winner: ctx.currentPlayer };
    }
    if (IsDraw(G.cells)) {
      return { draw: true };
    }
  }
};

const bgClient = Client({
  game: TTT,
  multiplayer: SocketIO({ server: 'localhost:8000' }),
});

const play = new Phaser.Scene('Play');
let text;
let pointer;
let markers = Array(9).fill(null);

play.preload = function () {
  this.load.image('board', 'assets/board.png');
  this.load.image('x', 'assets/x.png');
  this.load.image('o', 'assets/o.png');
}

play.create = function () {
  this.add.image(250, 250, 'board');
  text = this.add.text(600, 10, 'Move the mouse', { font: '16px Courier', fill: '#00ff00' });
  this.input.on('pointerup', function () {
    const idx = convertPointToIndex({ x: pointer.x, y: pointer.y });
    bgClient.moves.clickCell(idx);
  })
}

play.update = function () {
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

export const kickoffClient = (playerID) => {
  bgClient.playerID = playerID;
  bgClient.start();

  new Phaser.Game({
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    scene: play,
    backgroundColor: '#ffffff',
  });
}

function convertIndexToPoint(idx) {
  let returnValue = { x: null, y: null };
  switch (idx) {
    case 0: {
      returnValue.x = 65;
      returnValue.y = 65;
      break;
    }
    case 1: {
      returnValue.x = 250;
      returnValue.y = 65;
      break;
    }
    case 2: {
      returnValue.x = 400;
      returnValue.y = 65;
      break;
    }
    case 3: {
      returnValue.x = 65;
      returnValue.y = 250;
      break;
    }
    case 4: {
      returnValue.x = 250;
      returnValue.y = 250;
      break;
    }
    case 5: {
      returnValue.x = 400;
      returnValue.y = 250;
      break;
    }
    case 6: {
      returnValue.x = 65;
      returnValue.y = 420;
      break;
    }
    case 7: {
      returnValue.x = 250;
      returnValue.y = 420;
      break;
    }
    case 8: {
      returnValue.x = 400;
      returnValue.y = 420;
      break;
    }
    default:
      return null;
      break;
  }
  return returnValue;
}

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

const subscribe = bgClient.subscribe((state) => {
  if (!state) return;
  markers.forEach((marker) => {
    if (marker === null) return;
    marker.destroy();
  }) 
  state.G.cells.forEach((cell, idx) => {
    if (cell === null) return;
    if (cell === '0') {
      const point = convertIndexToPoint(idx);
      let marker = play.add.image(point.x, point.y, 'x');
      marker.angle = Math.random() * 20
      markers[idx] = marker;
    } else {
      const point = convertIndexToPoint(idx);
      let marker = play.add.image(point.x, point.y, 'o');
      marker.angle = Math.random() * 20
      markers[idx] = marker;
    }
    // console.log(`cell ${idx} equals ${cell}`);
  })
})

function IsVictory(cells) {
  const positions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
  ];

  const isRowComplete = row => {
    const symbols = row.map(i => cells[i]);
    return symbols.every(i => i !== null && i === symbols[0]);
  };

  return positions.map(isRowComplete).some(i => i === true);
}

// Return true if all `cells` are occupied.
function IsDraw(cells) {
  return cells.filter(c => c === null).length === 0;
}
