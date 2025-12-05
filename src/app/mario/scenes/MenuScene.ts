import * as Phaser from 'phaser'

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' })
  }

  create() {
    const { width, height } = this.scale

    // Sky background
    this.cameras.main.setBackgroundColor(0x5c94fc)

    // Ground decoration
    for (let i = 0; i < width / 32 + 1; i++) {
      this.add.image(i * 32 + 16, height - 16, 'ground')
      this.add.image(i * 32 + 16, height - 48, 'ground')
    }

    // Clouds
    this.add.image(100, 80, 'cloud')
    this.add.image(400, 60, 'cloud')
    this.add.image(650, 100, 'cloud')

    // Bush
    this.add.image(200, height - 80, 'bush')
    this.add.image(600, height - 80, 'bush')

    // Title
    const title = this.add.text(width / 2, 120, 'SUPER MARIO BROS', {
      fontSize: '48px',
      fontFamily: 'Arial',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 6,
    })
    title.setOrigin(0.5)

    // Subtitle
    const subtitle = this.add.text(width / 2, 180, 'Phaser Clone', {
      fontSize: '24px',
      fontFamily: 'Arial',
      color: '#ffcc00',
      stroke: '#000000',
      strokeThickness: 4,
    })
    subtitle.setOrigin(0.5)

    // Mario preview
    const mario = this.add.image(width / 2, 280, 'mario-stand')
    mario.setScale(3)

    // Animate Mario
    this.tweens.add({
      targets: mario,
      y: 270,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })

    // Start button
    const buttonBg = this.add.rectangle(width / 2, 400, 200, 60, 0xe52521)
    buttonBg.setStrokeStyle(4, 0xffffff)
    buttonBg.setInteractive({ useHandCursor: true })

    const buttonText = this.add.text(width / 2, 400, 'START GAME', {
      fontSize: '28px',
      fontFamily: 'Arial',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 3,
    })
    buttonText.setOrigin(0.5)

    // Button hover effects
    buttonBg.on('pointerover', () => {
      buttonBg.setFillStyle(0xff4444)
      buttonBg.setScale(1.05)
      buttonText.setScale(1.05)
    })

    buttonBg.on('pointerout', () => {
      buttonBg.setFillStyle(0xe52521)
      buttonBg.setScale(1)
      buttonText.setScale(1)
    })

    buttonBg.on('pointerdown', () => {
      this.cameras.main.fadeOut(500, 0, 0, 0)
      this.time.delayedCall(500, () => {
        this.scene.start('GameScene')
      })
    })

    // Controls info
    const controls = this.add.text(width / 2, 500, 'ARROW KEYS to move | SPACE to jump', {
      fontSize: '16px',
      fontFamily: 'Arial',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2,
    })
    controls.setOrigin(0.5)

    // Copyright
    const copyright = this.add.text(width / 2, 560, '© 2024 Phaser Clone', {
      fontSize: '14px',
      fontFamily: 'Arial',
      color: '#888888',
    })
    copyright.setOrigin(0.5)

    // Fade in
    this.cameras.main.fadeIn(500)
  }
}
