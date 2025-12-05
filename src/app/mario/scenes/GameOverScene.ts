import * as Phaser from 'phaser'

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' })
  }

  create() {
    const { width, height } = this.scale

    // Dark background
    this.cameras.main.setBackgroundColor(0x000000)

    // Game Over text
    const gameOver = this.add.text(width / 2, height / 2 - 80, 'GAME OVER', {
      fontSize: '64px',
      fontFamily: 'Arial',
      color: '#ff0000',
      stroke: '#ffffff',
      strokeThickness: 4,
    })
    gameOver.setOrigin(0.5)

    // Score display
    const finalScore = this.registry.get('score') || 0
    const scoreText = this.add.text(width / 2, height / 2, `FINAL SCORE: ${finalScore}`, {
      fontSize: '32px',
      fontFamily: 'Arial',
      color: '#ffffff',
    })
    scoreText.setOrigin(0.5)

    // Coins display
    const coins = this.registry.get('coins') || 0
    const coinsText = this.add.text(width / 2, height / 2 + 50, `COINS: ${coins}`, {
      fontSize: '24px',
      fontFamily: 'Arial',
      color: '#ffcc00',
    })
    coinsText.setOrigin(0.5)

    // Play Again button
    const buttonBg = this.add.rectangle(width / 2, height / 2 + 130, 200, 50, 0xe52521)
    buttonBg.setStrokeStyle(3, 0xffffff)
    buttonBg.setInteractive({ useHandCursor: true })

    const buttonText = this.add.text(width / 2, height / 2 + 130, 'PLAY AGAIN', {
      fontSize: '24px',
      fontFamily: 'Arial',
      color: '#ffffff',
    })
    buttonText.setOrigin(0.5)

    buttonBg.on('pointerover', () => {
      buttonBg.setFillStyle(0xff4444)
    })

    buttonBg.on('pointerout', () => {
      buttonBg.setFillStyle(0xe52521)
    })

    buttonBg.on('pointerdown', () => {
      this.scene.start('GameScene')
    })

    // Menu button
    const menuBg = this.add.rectangle(width / 2, height / 2 + 200, 200, 50, 0x444444)
    menuBg.setStrokeStyle(3, 0xffffff)
    menuBg.setInteractive({ useHandCursor: true })

    const menuText = this.add.text(width / 2, height / 2 + 200, 'MAIN MENU', {
      fontSize: '24px',
      fontFamily: 'Arial',
      color: '#ffffff',
    })
    menuText.setOrigin(0.5)

    menuBg.on('pointerover', () => {
      menuBg.setFillStyle(0x666666)
    })

    menuBg.on('pointerout', () => {
      menuBg.setFillStyle(0x444444)
    })

    menuBg.on('pointerdown', () => {
      this.scene.start('MenuScene')
    })

    // Fade in
    this.cameras.main.fadeIn(500)
  }
}
