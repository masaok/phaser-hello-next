// src/phaser/scene.ts
import { Scene } from 'phaser'

class HelloWorldScene extends Scene {
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
