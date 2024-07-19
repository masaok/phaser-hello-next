export default class Block extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, name: string = 'block_blue', velocity: number = 100) {
    super(scene, x, y, name)
    this.setOrigin(0, 0)
    this.scene = scene
    this.name = name
  }
}
