// src/phaser/scene.ts
import { Scene } from 'phaser'

class TheScene extends Scene {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined
  player: Phaser.Physics.Arcade.Image | undefined

  constructor() {
    super('spacebar')

    this.player = undefined
    this.cursors = undefined
  }

  preload() {
    this.load.setBaseURL('https://labs.phaser.io')
    this.load.image('block', 'assets/sprites/block.png')
  }

  create() {
    this.cursors = this.input.keyboard?.createCursorKeys()

    this.player = this.physics.add.image(400, 300, 'block')

    this.player.setCollideWorldBounds(true)

    this.add.text(10, 10, 'Press the ARROW KEYS', { font: '16px Courier', color: '#ffffff' }).setShadow(1, 1)
  }

  update() {
    this.player?.setVelocity(0)

    if (this.cursors?.left.isDown) {
      this.player?.setVelocityX(-300)
    } else if (this.cursors?.right.isDown) {
      this.player?.setVelocityX(300)
    }

    if (this.cursors?.up.isDown) {
      this.player?.setVelocityY(-300)
    } else if (this.cursors?.down.isDown) {
      this.player?.setVelocityY(300)
    }
  }
}

export default TheScene
