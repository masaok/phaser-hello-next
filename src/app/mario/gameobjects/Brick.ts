import * as Phaser from 'phaser'

export default class Brick extends Phaser.Physics.Arcade.Sprite {
  isDestroyed: boolean = false

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'brick')

    scene.add.existing(this)
    scene.physics.add.existing(this, true) // Static body

    this.setOrigin(0.5, 0.5)
  }

  hit(scene: Phaser.Scene, isBigMario: boolean) {
    if (this.isDestroyed) return

    if (isBigMario) {
      // Break the brick
      this.isDestroyed = true
      this.setVisible(false)

      const body = this.body as Phaser.Physics.Arcade.StaticBody
      body.enable = false

      // Create brick debris
      this.createDebris(scene)

      // Add score
      scene.registry.set('score', (scene.registry.get('score') || 0) + 50)
    } else {
      // Just bump it
      const originalY = this.y
      scene.tweens.add({
        targets: this,
        y: this.y - 8,
        duration: 80,
        yoyo: true,
        ease: 'Sine.easeOut',
        onComplete: () => {
          this.y = originalY
          // Refresh static body position
          const staticBody = this.body as Phaser.Physics.Arcade.StaticBody
          staticBody.updateFromGameObject()
        },
      })
    }
  }

  createDebris(scene: Phaser.Scene) {
    const positions = [
      { x: -8, y: -8, vx: -100, vy: -300 },
      { x: 8, y: -8, vx: 100, vy: -300 },
      { x: -8, y: 8, vx: -80, vy: -200 },
      { x: 8, y: 8, vx: 80, vy: -200 },
    ]

    positions.forEach((pos) => {
      const debris = scene.add.rectangle(
        this.x + pos.x,
        this.y + pos.y,
        8,
        8,
        0xc84c0c
      )

      scene.physics.add.existing(debris)
      const debrisBody = debris.body as Phaser.Physics.Arcade.Body
      debrisBody.setVelocity(pos.vx, pos.vy)
      debrisBody.setAngularVelocity(Phaser.Math.Between(-500, 500))
      debrisBody.setCollideWorldBounds(false)

      scene.time.delayedCall(1000, () => {
        debris.destroy()
      })
    })
  }
}
