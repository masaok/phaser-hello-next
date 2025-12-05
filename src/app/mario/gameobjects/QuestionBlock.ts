import * as Phaser from 'phaser'

export default class QuestionBlock extends Phaser.Physics.Arcade.Sprite {
  isHit: boolean = false
  containsCoin: boolean = true
  containsMushroom: boolean = false
  animFrame: number = 0
  animTimer: number = 0

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    contents: 'coin' | 'mushroom' = 'coin'
  ) {
    super(scene, x, y, 'question1')

    scene.add.existing(this)
    scene.physics.add.existing(this, true) // Static body

    this.setOrigin(0.5, 0.5)

    if (contents === 'mushroom') {
      this.containsCoin = false
      this.containsMushroom = true
    }
  }

  update() {
    if (this.isHit) return

    // Animate question mark
    this.animTimer++
    if (this.animTimer > 15) {
      this.animTimer = 0
      this.animFrame = (this.animFrame + 1) % 2
      this.setTexture(this.animFrame === 0 ? 'question1' : 'question2')
    }
  }

  hit(scene: Phaser.Scene, coinsGroup: Phaser.Physics.Arcade.Group, mushroomsGroup: Phaser.Physics.Arcade.Group) {
    if (this.isHit) return

    this.isHit = true
    this.setTexture('empty-block')

    // Bounce animation
    const originalY = this.y
    scene.tweens.add({
      targets: this,
      y: this.y - 8,
      duration: 80,
      yoyo: true,
      ease: 'Sine.easeOut',
      onComplete: () => {
        this.y = originalY
      },
    })

    if (this.containsCoin) {
      // Play coin sound
      scene.sound.play('coin')

      // Spawn coin animation
      const coin = scene.add.sprite(this.x, this.y - 32, 'coin1')
      coin.setScale(2)

      // Coin animation
      let coinFrame = 0
      const coinAnim = scene.time.addEvent({
        delay: 50,
        callback: () => {
          coinFrame = (coinFrame + 1) % 3
          coin.setTexture(`coin${coinFrame + 1}`)
        },
        repeat: 10,
      })

      scene.tweens.add({
        targets: coin,
        y: coin.y - 64,
        duration: 400,
        ease: 'Sine.easeOut',
        onComplete: () => {
          coinAnim.destroy()
          coin.destroy()
        },
      })

      // Add score
      scene.registry.set('coins', (scene.registry.get('coins') || 0) + 1)
      scene.registry.set('score', (scene.registry.get('score') || 0) + 200)
    }

    if (this.containsMushroom) {
      // Spawn mushroom - start inside the block
      const mushroom = mushroomsGroup.create(this.x, this.y, 'mushroom') as Phaser.Physics.Arcade.Sprite
      mushroom.setScale(1)
      mushroom.setOrigin(0.5, 0.5)

      const mushroomBody = mushroom.body as Phaser.Physics.Arcade.Body
      mushroomBody.setAllowGravity(false) // Disable gravity during rise animation
      mushroomBody.setVelocityX(0)

      // Rise up animation, then start moving
      scene.tweens.add({
        targets: mushroom,
        y: this.y - 40,
        duration: 600,
        ease: 'Sine.easeOut',
        onComplete: () => {
          mushroomBody.setAllowGravity(true)
          mushroomBody.setVelocityX(80)
          mushroomBody.setBounce(0)
        },
      })
    }
  }
}
