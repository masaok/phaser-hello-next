// src/phaser/scene.ts
import { Scene } from 'phaser'

class PhaserLogoScene extends Scene {
  constructor() {
    super('hello-world')
  }

  preload() {
    this.load.setBaseURL('https://labs.phaser.io')

    this.load.image('sky', 'assets/skies/space3.png')
    this.load.image('logo', 'assets/sprites/phaser3-logo.png')
    this.load.image('red', 'assets/particles/red.png')
  }

  create() {
    // this.add.image(400, 300, 'sky')
    // this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'sky')

    const sky = this.physics.add.image(0, 0, 'sky').setOrigin(0, 0) as Phaser.Physics.Arcade.Image
    const scaleX = this.cameras.main.width / sky.width
    const scaleY = this.cameras.main.height / sky.height
    const scale = Math.max(scaleX, scaleY)
    sky.setScale(scale)
    // sky.setGravity(0, 0)

    const particles = this.add.particles(0, 0, 'red', {
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD',
    })

    const logo = this.physics.add.image(400, 100, 'logo')

    logo.setVelocity(100, 200)
    logo.setBounce(1, 1)
    logo.setCollideWorldBounds(true)

    particles.startFollow(logo)
  }
}

export default PhaserLogoScene
