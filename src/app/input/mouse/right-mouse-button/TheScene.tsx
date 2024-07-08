// src/phaser/scene.ts
import { Scene } from 'phaser'

class TheScene extends Scene {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined
  player: Phaser.Physics.Arcade.Image | undefined
  text: Phaser.GameObjects.Text | undefined

  constructor() {
    super('spacebar')

    this.player = undefined
    this.cursors = undefined
    this.text = undefined
  }

  preload() {
    this.load.setBaseURL('https://labs.phaser.io')
    this.load.image('logo', 'assets/sprites/phaser.png')
    this.load.image('asuna', 'assets/sprites/asuna_by_vali233.png')
    this.load.image('disk', 'assets/sprites/oz_pov_melting_disk.png')
    this.load.image('tree', 'assets/sprites/palm-tree-left.png')
  }

  create() {
    this.text = this.add.text(10, 10, '', { color: '#00ff00' }).setDepth(1)

    this.input.mouse?.disableContextMenu()

    this.input.on(
      'pointerdown',
      (pointer: any) => {
        if (pointer.rightButtonDown()) {
          if (pointer.getDuration() > 500) {
            this.add.image(pointer.x, pointer.y, 'disk')
          } else {
            this.add.image(pointer.x, pointer.y, 'asuna')
          }
        } else if (pointer.getDuration() > 500) {
          this.add.image(pointer.x, pointer.y, 'tree')
        } else {
          this.add.image(pointer.x, pointer.y, 'logo')
        }
      },
      this
    )
  }

  update() {
    const pointer = this.input.activePointer

    this.text?.setText([
      `x: ${pointer.worldX}`,
      `y: ${pointer.worldY}`,
      `isDown: ${pointer.isDown}`,
      `rightButtonDown: ${pointer.rightButtonDown()}`,
    ])
  }
}

export default TheScene
