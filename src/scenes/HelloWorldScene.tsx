// src/phaser/scene.ts
import Phaser from 'phaser'

class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super('hello-world')
  }

  preload() {
    // Load any assets here
  }

  create() {
    this.add.text(100, 100, 'Hello, World!', { color: '#0f0' })
  }
}

export default HelloWorldScene
