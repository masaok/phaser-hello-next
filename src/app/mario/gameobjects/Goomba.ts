import * as Phaser from 'phaser'

export default class Goomba extends Phaser.Physics.Arcade.Sprite {
  moveSpeed: number = 50
  direction: number = -1
  isDead: boolean = false
  walkFrame: number = 0
  walkTimer: number = 0

  hasStartedMoving: boolean = false

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'goomba1')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setScale(2)
    this.setOrigin(0.5, 1)

    const body = this.body as Phaser.Physics.Arcade.Body
    body.setSize(14, 22)
    body.setOffset(1, 2)
  }

  update() {
    if (this.isDead) return

    const body = this.body as Phaser.Physics.Arcade.Body

    // Start moving once on the ground
    if (!this.hasStartedMoving && body.blocked.down) {
      this.hasStartedMoving = true
      body.setVelocityX(this.moveSpeed * this.direction)
    }

    // Keep moving if already started
    if (this.hasStartedMoving) {
      // Reverse direction when hitting a wall
      if (body.blocked.left) {
        this.direction = 1
        body.setVelocityX(this.moveSpeed)
      } else if (body.blocked.right) {
        this.direction = -1
        body.setVelocityX(-this.moveSpeed)
      }

      // Maintain velocity (in case it gets reset)
      if (body.velocity.x === 0 && body.blocked.down) {
        body.setVelocityX(this.moveSpeed * this.direction)
      }
    }

    // Walking animation
    this.walkTimer++
    if (this.walkTimer > 10) {
      this.walkTimer = 0
      this.walkFrame = (this.walkFrame + 1) % 2
      this.setTexture(this.walkFrame === 0 ? 'goomba1' : 'goomba2')
    }

    // Remove if off screen to the left
    if (this.x < -50) {
      this.destroy()
    }
  }

  stomp() {
    if (this.isDead) return

    this.isDead = true
    this.setTexture('goomba-squish')

    const body = this.body as Phaser.Physics.Arcade.Body
    body.setVelocity(0, 0)
    body.setAcceleration(0, 0)
    body.setImmovable(true)
    body.checkCollision.none = true

    this.scene.time.delayedCall(500, () => {
      this.destroy()
    })
  }

  hitFromBelow() {
    if (this.isDead) return

    this.isDead = true

    const body = this.body as Phaser.Physics.Arcade.Body
    body.setVelocity(100 * -this.direction, -300)
    body.checkCollision.none = true

    this.setFlipY(true)

    this.scene.time.delayedCall(2000, () => {
      this.destroy()
    })
  }
}
