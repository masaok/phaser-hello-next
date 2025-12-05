import * as Phaser from 'phaser'

export default class Dummy extends Phaser.Physics.Arcade.Sprite {
  health: number = 500
  maxHealth: number = 500
  healthBar: Phaser.GameObjects.Rectangle | null = null
  healthBarBg: Phaser.GameObjects.Rectangle | null = null
  isSlowed: boolean = false
  slowTimer: number = 0

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'dummy')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setScale(2)
    this.setOrigin(0.5, 0.5)

    const body = this.body as Phaser.Physics.Arcade.Body
    body.setImmovable(true)
    body.setSize(30, 44)

    // Create health bar
    this.healthBarBg = scene.add.rectangle(x, y - 50, 60, 8, 0x333333)
    this.healthBar = scene.add.rectangle(x, y - 50, 56, 4, 0x00ff00)
  }

  update(delta: number) {
    // Update slow
    if (this.isSlowed) {
      this.slowTimer -= delta
      if (this.slowTimer <= 0) {
        this.isSlowed = false
        this.setTint(0xffffff)
      }
    }

    // Update health bar position
    if (this.healthBar && this.healthBarBg) {
      this.healthBarBg.setPosition(this.x, this.y - 50)
      this.healthBar.setPosition(this.x, this.y - 50)

      const healthPercent = this.health / this.maxHealth
      this.healthBar.setSize(56 * healthPercent, 4)

      // Color based on health
      if (healthPercent > 0.5) {
        this.healthBar.setFillStyle(0x00ff00)
      } else if (healthPercent > 0.25) {
        this.healthBar.setFillStyle(0xffff00)
      } else {
        this.healthBar.setFillStyle(0xff0000)
      }
    }
  }

  takeDamage(amount: number, slow: boolean = false): boolean {
    this.health -= amount

    // Flash red
    this.setTint(0xff0000)
    this.scene.time.delayedCall(100, () => {
      if (this.active) {
        this.setTint(this.isSlowed ? 0x8888ff : 0xffffff)
      }
    })

    // Apply slow
    if (slow) {
      this.isSlowed = true
      this.slowTimer = 2000
      this.setTint(0x8888ff)
    }

    // Show damage number
    const damageText = this.scene.add.text(this.x, this.y - 30, `-${amount}`, {
      fontSize: '16px',
      color: '#ff4444',
      fontFamily: 'Arial',
      stroke: '#000000',
      strokeThickness: 2,
    })
    damageText.setOrigin(0.5)

    this.scene.tweens.add({
      targets: damageText,
      y: damageText.y - 30,
      alpha: 0,
      duration: 800,
      onComplete: () => damageText.destroy(),
    })

    // Check death
    if (this.health <= 0) {
      this.die()
      return true // Killed
    }

    return false
  }

  die() {
    // Destroy health bars
    this.healthBar?.destroy()
    this.healthBarBg?.destroy()

    // Respawn after delay
    const respawnX = this.x
    const respawnY = this.y

    this.scene.time.delayedCall(3000, () => {
      this.health = this.maxHealth
      this.setPosition(respawnX, respawnY)
      this.setActive(true)
      this.setVisible(true)

      // Recreate health bars
      this.healthBarBg = this.scene.add.rectangle(respawnX, respawnY - 50, 60, 8, 0x333333)
      this.healthBar = this.scene.add.rectangle(respawnX, respawnY - 50, 56, 4, 0x00ff00)
    })

    this.setActive(false)
    this.setVisible(false)
  }

  reset() {
    this.health = this.maxHealth
    this.isSlowed = false
    this.setTint(0xffffff)
  }
}
