import Phaser from 'phaser';

class TTTGame extends Phaser.Scene {
  constructor() {
    super();
    this.logos;
  }

  preload() {
    this.load.setBaseURL('http://labs.phaser.io');

    // this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    // this.load.image('red', 'assets/particles/red.png');
  }

  create() {
    const coord = [
      { x: 200, y: 100},
      { x: 600, y: 100},
      { x: 1000, y: 100},
      { x: 200, y: 360},
      { x: 600, y: 360},
      { x: 1000, y: 360},
      { x: 200, y: 620},
      { x: 600, y: 620},
      { x: 1000, y: 620},
    ];
    for (let idx = 0; idx < 9; idx++) {
      const logo = this.add.image(coord[idx].x, coord[idx].y, 'logo');
      logo.setInteractive();
      logo.setAngle(30);
      logo.on('pointerup', (pointer) => {
        console.log(bgClient);
      })
    }
  }

  update() {
  }
}

export default TTTGame;