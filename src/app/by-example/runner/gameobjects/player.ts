class Player extends Phaser.Physics.Arcade.Sprite {
  // class Player extends Phaser.GameObjects.Rectangle {
  jumping: boolean
  invincible: boolean
  health: number

  constructor(scene: Phaser.Scene, x: number, y: number) {
    // super(scene, x, y, texture, frame)
    super(scene, x, y, 'player')
    this.setOrigin(0.5)
    scene.add.existing(this)
    scene.physics.add.existing(this)

    const body = this.body as Phaser.Physics.Arcade.Body
    body.collideWorldBounds = true
    body.mass = 10
    body.setDrag(0, 10)

    this.setScale(1)
    this.jumping = false
    this.invincible = false
    this.health = 10
  }
}

export default Player
