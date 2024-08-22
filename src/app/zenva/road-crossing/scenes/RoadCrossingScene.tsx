// src/phaser/scene.ts
import { Scene } from 'phaser'

class RoadCrossingScene extends Scene {
  constructor() {
    super('hello-world')
  }

  preload() {
    // 02 - Rendering Sprites
    this.load.image('background', '/zenva/assets/background.png')
    this.load.image('player', '/zenva/assets/player.png')

    // 03 - Scaling and Flipping
    this.load.image('enemy', 'assets/dragon.png')
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

    let gameW = this.sys.game.config.width
    let gameH = this.sys.game.config.height

    console.log(gameW, gameH)

    console.log(bg)
    console.log(this)

    // 03 - Scaling and Flipping
    // change the origin to the top-left corner (nope, shifts the bg to the bottom right)
    // bg.setOrigin(0, 0)

    // create the player
    let player = this.add.sprite(70, 180, 'player')

    // set the origin of the player to its center
    player.setOrigin(0.5, 0.5)

    // we are reducing the width by 50%, and we are doubling the height
    player.setScale(0.5)

    // ensure the player is within the visible area
    player.setPosition(viewportWidth / 2, viewportHeight / 2)

    // 03 - Scaling and Flipping
    // create an enemy
    let enemy1 = this.add.sprite(250, 180, 'enemy')

    // set the origin of the enemy to its center
    enemy1.setOrigin(0.5, 0.5)

    // ensure the enemy is within the visible area
    enemy1.setPosition(viewportWidth / 2 + 100, viewportHeight / 2)

    // set the depth of the enemy to ensure it is rendered on top of other elements
    enemy1.setDepth(1)

    // create a second enemy
    let enemy2 = this.add.sprite(450, 180, 'enemy')
    enemy2.setPosition(viewportWidth / 2 + 200, viewportHeight / 2)
    // enemy2.displayWidth = 300

    // flip
    enemy1.flipX = true
    enemy2.flipX = true
  }
}

export default RoadCrossingScene
