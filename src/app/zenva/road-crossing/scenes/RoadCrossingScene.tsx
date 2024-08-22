// src/phaser/scene.ts
import { Scene } from 'phaser'

class RoadCrossingScene extends Scene {
  constructor() {
    super('hello-world')
  }

  preload() {
    this.load.image('background', '/zenva/assets/background.png')
    this.load.image('player', '/zenva/assets/player.png')
  }

  create() {
    this.add.text(100, 100, 'Hello, World!', { color: '#0f0' })

    // Get the viewport dimensions
    const viewportWidth = this.sys.game.config.width as number
    const viewportHeight = this.sys.game.config.height as number

    // create bg sprite
    let bg = this.add.sprite(0, 0, 'background')

    // Get the sprite's original dimensions
    const spriteWidth = bg.width
    const spriteHeight = bg.height

    // Calculate the scale factor to maintain aspect ratio
    const scaleX = viewportWidth / spriteWidth
    const scaleY = viewportHeight / spriteHeight
    const scale = Math.min(scaleX, scaleY)

    // Apply the scale to the sprite
    bg.setScale(scale)

    // Center the sprite in the viewport
    bg.setPosition(viewportWidth / 2, viewportHeight / 2)

    // let gameW = this.sys.game.config.width
    // let gameH = this.sys.game.config.height

    // console.log(gameW, gameH)

    // console.log(bg)
    // console.log(this)
  }
}

export default RoadCrossingScene
