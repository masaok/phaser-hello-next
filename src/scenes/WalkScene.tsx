// src/phaser/scene.ts
import { Scene } from 'phaser'

// public/game.js

// import Phaser from 'phaser'

export class WalkScene extends Scene {
  private square: Phaser.GameObjects.Rectangle | undefined
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined

  private wKey: Phaser.Input.Keyboard.Key | undefined
  private aKey: Phaser.Input.Keyboard.Key | undefined
  private sKey: Phaser.Input.Keyboard.Key | undefined
  private dKey: Phaser.Input.Keyboard.Key | undefined

  constructor() {
    super()

    // Initialize square to something other than undefined
    // this.square = this.add.rectangle(400, 300, 50, 50, 0xff0000)
  }

  preload() {
    // Load any assets if needed
  }

  create() {
    // Create a square
    this.square = this.add.rectangle(400, 300, 50, 50, 0xff0000)

    // Enable keyboard input
    this.cursors = this.input.keyboard?.createCursorKeys()
    this.wKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.aKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.sKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.dKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D)
  }

  update() {
    const speed = 200
    const dt = this.game.loop.delta / 1000

    if (!this.square) throw new Error('Square is undefined')

    if (this.wKey !== undefined && this.wKey.isDown) {
      this.square.y -= speed * dt
    }
    if (this.aKey?.isDown) {
      this.square.x -= speed * dt
    }
    if (this.sKey?.isDown) {
      this.square.y += speed * dt
    }
    if (this.dKey?.isDown) {
      this.square.x += speed * dt
    }
  }
}
