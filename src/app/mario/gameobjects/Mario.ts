import * as Phaser from 'phaser'

export default class Mario extends Phaser.Physics.Arcade.Sprite {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined
  spaceKey: Phaser.Input.Keyboard.Key | undefined
  isJumping: boolean = false
  isDead: boolean = false
  isInvincible: boolean = false
  isBig: boolean = false
  walkFrame: number = 0
  walkTimer: number = 0

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'mario-stand')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setScale(2)
    this.setOrigin(0.5, 1)

    const body = this.body as Phaser.Physics.Arcade.Body
    body.setSize(14, 30)
    body.setOffset(1, 2)
    body.setCollideWorldBounds(true)
    body.setMaxVelocity(200, 600)

    this.cursors = scene.input.keyboard?.createCursorKeys()
    this.spaceKey = scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
  }

  update() {
    if (this.isDead) return

    const body = this.body as Phaser.Physics.Arcade.Body
    const onGround = body.blocked.down

    // Horizontal movement
    if (this.cursors?.left.isDown) {
      body.setVelocityX(-150)
      this.setFlipX(true)
    } else if (this.cursors?.right.isDown) {
      body.setVelocityX(150)
      this.setFlipX(false)
    } else {
      body.setVelocityX(0)
    }

    // Jumping
    if ((this.cursors?.up.isDown || this.spaceKey?.isDown) && onGround) {
      body.setVelocityY(-580)
      this.isJumping = true
    }

    // Variable jump height
    if (this.isJumping && !(this.cursors?.up.isDown || this.spaceKey?.isDown)) {
      if (body.velocity.y < -200) {
        body.setVelocityY(-200)
      }
    }

    if (onGround) {
      this.isJumping = false
    }

    // Animation
    this.updateAnimation(onGround)
  }

  updateAnimation(onGround: boolean) {
    const body = this.body as Phaser.Physics.Arcade.Body

    if (!onGround) {
      this.setTexture('mario-jump')
    } else if (Math.abs(body.velocity.x) > 10) {
      // Walking animation
      this.walkTimer++
      if (this.walkTimer > 8) {
        this.walkTimer = 0
        this.walkFrame = (this.walkFrame + 1) % 2
        this.setTexture(this.walkFrame === 0 ? 'mario-walk1' : 'mario-walk2')
      }
    } else {
      this.setTexture('mario-stand')
      this.walkTimer = 0
    }
  }

  die() {
    if (this.isDead || this.isInvincible) return

    this.isDead = true
    this.setTexture('mario-dead')

    const body = this.body as Phaser.Physics.Arcade.Body
    body.setVelocity(0, -400)
    body.setAccelerationX(0)
    body.checkCollision.none = true

    this.scene.time.delayedCall(2000, () => {
      this.scene.scene.start('GameOverScene')
    })
  }

  powerUp() {
    if (this.isBig) return

    this.isBig = true
    this.isInvincible = true

    // Grow animation
    this.scene.tweens.add({
      targets: this,
      scaleX: 2.5,
      scaleY: 2.5,
      duration: 500,
      ease: 'Bounce.easeOut',
    })

    // Update hitbox for big Mario
    const body = this.body as Phaser.Physics.Arcade.Body
    body.setSize(14, 30)

    // Flash effect
    this.scene.tweens.add({
      targets: this,
      alpha: 0.5,
      duration: 100,
      yoyo: true,
      repeat: 5,
      onComplete: () => {
        this.alpha = 1
        this.isInvincible = false
      },
    })
  }

  takeDamage() {
    if (this.isInvincible) return

    if (this.isBig) {
      this.isBig = false
      this.setScale(2)
      this.isInvincible = true

      this.scene.tweens.add({
        targets: this,
        alpha: 0.5,
        duration: 100,
        yoyo: true,
        repeat: 10,
        onComplete: () => {
          this.alpha = 1
          this.isInvincible = false
        },
      })
    } else {
      this.die()
    }
  }

  bounce() {
    const body = this.body as Phaser.Physics.Arcade.Body
    body.setVelocityY(-300)
  }
}
