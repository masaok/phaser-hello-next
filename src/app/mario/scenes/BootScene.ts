import * as Phaser from 'phaser'

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' })
  }

  preload() {
    // Create all sprites programmatically
    this.createMarioSprite()
    this.createGoombaSprite()
    this.createBlockSprites()
    this.createCoinSprite()
    this.createMushroomSprite()
    this.createFlagSprite()
    this.createCloudSprite()
    this.createBushSprite()
    this.createPipeSprite()
  }

  create() {
    this.scene.start('MenuScene')
  }

  createMarioSprite() {
    const graphics = this.make.graphics({ x: 0, y: 0 })

    // Mario standing - 16x16 scaled to 32x32
    // Red cap
    graphics.fillStyle(0xff0000)
    graphics.fillRect(4, 0, 8, 4)
    graphics.fillRect(2, 4, 14, 4)

    // Face (skin color)
    graphics.fillStyle(0xffcc99)
    graphics.fillRect(2, 8, 4, 4)
    graphics.fillRect(10, 8, 4, 4)
    graphics.fillRect(4, 12, 8, 4)

    // Hair/sideburns
    graphics.fillStyle(0x8b4513)
    graphics.fillRect(6, 8, 4, 4)

    // Eyes
    graphics.fillStyle(0x000000)
    graphics.fillRect(4, 10, 2, 2)
    graphics.fillRect(10, 10, 2, 2)

    // Body (red shirt)
    graphics.fillStyle(0xff0000)
    graphics.fillRect(2, 16, 12, 6)

    // Overalls (blue)
    graphics.fillStyle(0x0000ff)
    graphics.fillRect(2, 22, 4, 8)
    graphics.fillRect(10, 22, 4, 8)
    graphics.fillRect(4, 22, 8, 4)

    // Shoes (brown)
    graphics.fillStyle(0x8b4513)
    graphics.fillRect(0, 28, 6, 4)
    graphics.fillRect(10, 28, 6, 4)

    graphics.generateTexture('mario-stand', 16, 32)

    // Mario walking frame 1
    graphics.clear()
    graphics.fillStyle(0xff0000)
    graphics.fillRect(4, 0, 8, 4)
    graphics.fillRect(2, 4, 14, 4)
    graphics.fillStyle(0xffcc99)
    graphics.fillRect(2, 8, 4, 4)
    graphics.fillRect(10, 8, 4, 4)
    graphics.fillRect(4, 12, 8, 4)
    graphics.fillStyle(0x8b4513)
    graphics.fillRect(6, 8, 4, 4)
    graphics.fillStyle(0x000000)
    graphics.fillRect(4, 10, 2, 2)
    graphics.fillRect(10, 10, 2, 2)
    graphics.fillStyle(0xff0000)
    graphics.fillRect(2, 16, 12, 6)
    graphics.fillStyle(0x0000ff)
    graphics.fillRect(0, 22, 6, 8)
    graphics.fillRect(10, 22, 6, 8)
    graphics.fillRect(4, 22, 8, 4)
    graphics.fillStyle(0x8b4513)
    graphics.fillRect(-2, 28, 6, 4)
    graphics.fillRect(12, 28, 6, 4)

    graphics.generateTexture('mario-walk1', 16, 32)

    // Mario walking frame 2
    graphics.clear()
    graphics.fillStyle(0xff0000)
    graphics.fillRect(4, 0, 8, 4)
    graphics.fillRect(2, 4, 14, 4)
    graphics.fillStyle(0xffcc99)
    graphics.fillRect(2, 8, 4, 4)
    graphics.fillRect(10, 8, 4, 4)
    graphics.fillRect(4, 12, 8, 4)
    graphics.fillStyle(0x8b4513)
    graphics.fillRect(6, 8, 4, 4)
    graphics.fillStyle(0x000000)
    graphics.fillRect(4, 10, 2, 2)
    graphics.fillRect(10, 10, 2, 2)
    graphics.fillStyle(0xff0000)
    graphics.fillRect(2, 16, 12, 6)
    graphics.fillStyle(0x0000ff)
    graphics.fillRect(2, 22, 4, 8)
    graphics.fillRect(10, 22, 4, 8)
    graphics.fillRect(4, 22, 8, 4)
    graphics.fillStyle(0x8b4513)
    graphics.fillRect(2, 28, 6, 4)
    graphics.fillRect(8, 28, 6, 4)

    graphics.generateTexture('mario-walk2', 16, 32)

    // Mario jumping
    graphics.clear()
    graphics.fillStyle(0xff0000)
    graphics.fillRect(4, 0, 8, 4)
    graphics.fillRect(2, 4, 14, 4)
    graphics.fillStyle(0xffcc99)
    graphics.fillRect(2, 8, 4, 4)
    graphics.fillRect(10, 8, 4, 4)
    graphics.fillRect(4, 12, 8, 4)
    graphics.fillStyle(0x8b4513)
    graphics.fillRect(6, 8, 4, 4)
    graphics.fillStyle(0x000000)
    graphics.fillRect(4, 10, 2, 2)
    graphics.fillRect(10, 10, 2, 2)
    graphics.fillStyle(0xff0000)
    graphics.fillRect(0, 16, 16, 6)
    graphics.fillStyle(0x0000ff)
    graphics.fillRect(0, 22, 6, 6)
    graphics.fillRect(10, 22, 6, 6)
    graphics.fillRect(4, 22, 8, 4)
    graphics.fillStyle(0x8b4513)
    graphics.fillRect(-2, 26, 6, 4)
    graphics.fillRect(12, 26, 6, 4)

    graphics.generateTexture('mario-jump', 16, 32)

    // Mario dead (flipped upside down look)
    graphics.clear()
    graphics.fillStyle(0xff0000)
    graphics.fillRect(4, 0, 8, 4)
    graphics.fillRect(2, 4, 14, 4)
    graphics.fillStyle(0xffcc99)
    graphics.fillRect(2, 8, 4, 4)
    graphics.fillRect(10, 8, 4, 4)
    graphics.fillRect(4, 12, 8, 4)
    graphics.fillStyle(0x8b4513)
    graphics.fillRect(6, 8, 4, 4)
    // X eyes for dead
    graphics.fillStyle(0x000000)
    graphics.fillRect(3, 9, 2, 2)
    graphics.fillRect(5, 11, 2, 2)
    graphics.fillRect(9, 9, 2, 2)
    graphics.fillRect(11, 11, 2, 2)
    graphics.fillStyle(0xff0000)
    graphics.fillRect(2, 16, 12, 6)
    graphics.fillStyle(0x0000ff)
    graphics.fillRect(2, 22, 4, 8)
    graphics.fillRect(10, 22, 4, 8)
    graphics.fillStyle(0x8b4513)
    graphics.fillRect(0, 28, 6, 4)
    graphics.fillRect(10, 28, 6, 4)

    graphics.generateTexture('mario-dead', 16, 32)

    graphics.destroy()
  }

  createGoombaSprite() {
    const graphics = this.make.graphics({ x: 0, y: 0 })

    // Goomba frame 1
    // Brown mushroom head
    graphics.fillStyle(0x8b4513)
    graphics.fillRect(4, 0, 8, 4)
    graphics.fillRect(2, 4, 12, 4)
    graphics.fillRect(0, 8, 16, 4)

    // Face area (lighter brown)
    graphics.fillStyle(0xdeb887)
    graphics.fillRect(2, 12, 12, 6)

    // Eyes (angry)
    graphics.fillStyle(0x000000)
    graphics.fillRect(3, 12, 3, 3)
    graphics.fillRect(10, 12, 3, 3)
    graphics.fillStyle(0xffffff)
    graphics.fillRect(4, 13, 2, 2)
    graphics.fillRect(11, 13, 2, 2)

    // Feet
    graphics.fillStyle(0x000000)
    graphics.fillRect(0, 18, 6, 6)
    graphics.fillRect(10, 18, 6, 6)

    graphics.generateTexture('goomba1', 16, 24)

    // Goomba frame 2 (feet switched)
    graphics.clear()
    graphics.fillStyle(0x8b4513)
    graphics.fillRect(4, 0, 8, 4)
    graphics.fillRect(2, 4, 12, 4)
    graphics.fillRect(0, 8, 16, 4)
    graphics.fillStyle(0xdeb887)
    graphics.fillRect(2, 12, 12, 6)
    graphics.fillStyle(0x000000)
    graphics.fillRect(3, 12, 3, 3)
    graphics.fillRect(10, 12, 3, 3)
    graphics.fillStyle(0xffffff)
    graphics.fillRect(4, 13, 2, 2)
    graphics.fillRect(11, 13, 2, 2)
    graphics.fillStyle(0x000000)
    graphics.fillRect(2, 18, 6, 6)
    graphics.fillRect(8, 18, 6, 6)

    graphics.generateTexture('goomba2', 16, 24)

    // Goomba squished
    graphics.clear()
    graphics.fillStyle(0x8b4513)
    graphics.fillRect(0, 0, 16, 8)
    graphics.fillStyle(0xdeb887)
    graphics.fillRect(2, 2, 4, 4)
    graphics.fillRect(10, 2, 4, 4)
    graphics.fillStyle(0x000000)
    graphics.fillRect(3, 3, 2, 2)
    graphics.fillRect(11, 3, 2, 2)

    graphics.generateTexture('goomba-squish', 16, 8)

    graphics.destroy()
  }

  createBlockSprites() {
    const graphics = this.make.graphics({ x: 0, y: 0 })

    // Ground block
    graphics.fillStyle(0xc84c0c)
    graphics.fillRect(0, 0, 32, 32)
    graphics.fillStyle(0xe09050)
    graphics.fillRect(2, 2, 28, 28)
    graphics.fillStyle(0xc84c0c)
    graphics.fillRect(4, 4, 24, 24)
    graphics.fillStyle(0x000000)
    graphics.fillRect(0, 30, 32, 2)
    graphics.fillRect(30, 0, 2, 32)

    graphics.generateTexture('ground', 32, 32)

    // Brick block
    graphics.clear()
    graphics.fillStyle(0xc84c0c)
    graphics.fillRect(0, 0, 32, 32)
    // Brick pattern
    graphics.fillStyle(0x000000)
    graphics.fillRect(0, 7, 32, 2)
    graphics.fillRect(0, 15, 32, 2)
    graphics.fillRect(0, 23, 32, 2)
    graphics.fillRect(15, 0, 2, 8)
    graphics.fillRect(7, 8, 2, 8)
    graphics.fillRect(23, 8, 2, 8)
    graphics.fillRect(15, 16, 2, 8)
    graphics.fillRect(7, 24, 2, 8)
    graphics.fillRect(23, 24, 2, 8)

    graphics.generateTexture('brick', 32, 32)

    // Question block frame 1
    graphics.clear()
    graphics.fillStyle(0xffa500)
    graphics.fillRect(0, 0, 32, 32)
    graphics.fillStyle(0xffcc00)
    graphics.fillRect(2, 2, 28, 28)
    graphics.fillStyle(0x000000)
    graphics.fillRect(0, 30, 32, 2)
    graphics.fillRect(30, 0, 2, 32)
    // Question mark
    graphics.fillRect(10, 6, 12, 4)
    graphics.fillRect(18, 10, 4, 6)
    graphics.fillRect(12, 14, 8, 4)
    graphics.fillRect(12, 18, 4, 4)
    graphics.fillRect(12, 24, 4, 4)

    graphics.generateTexture('question1', 32, 32)

    // Question block frame 2 (slightly brighter)
    graphics.clear()
    graphics.fillStyle(0xffb830)
    graphics.fillRect(0, 0, 32, 32)
    graphics.fillStyle(0xffdd44)
    graphics.fillRect(2, 2, 28, 28)
    graphics.fillStyle(0x000000)
    graphics.fillRect(0, 30, 32, 2)
    graphics.fillRect(30, 0, 2, 32)
    graphics.fillRect(10, 6, 12, 4)
    graphics.fillRect(18, 10, 4, 6)
    graphics.fillRect(12, 14, 8, 4)
    graphics.fillRect(12, 18, 4, 4)
    graphics.fillRect(12, 24, 4, 4)

    graphics.generateTexture('question2', 32, 32)

    // Empty block (after hitting question block)
    graphics.clear()
    graphics.fillStyle(0x886644)
    graphics.fillRect(0, 0, 32, 32)
    graphics.fillStyle(0x664422)
    graphics.fillRect(2, 2, 28, 28)
    graphics.fillStyle(0x000000)
    graphics.fillRect(0, 30, 32, 2)
    graphics.fillRect(30, 0, 2, 32)

    graphics.generateTexture('empty-block', 32, 32)

    graphics.destroy()
  }

  createCoinSprite() {
    const graphics = this.make.graphics({ x: 0, y: 0 })

    // Coin frame 1
    graphics.fillStyle(0xffd700)
    graphics.fillRect(4, 0, 8, 16)
    graphics.fillRect(2, 2, 12, 12)
    graphics.fillStyle(0xffec8b)
    graphics.fillRect(4, 4, 8, 8)

    graphics.generateTexture('coin1', 16, 16)

    // Coin frame 2 (thinner)
    graphics.clear()
    graphics.fillStyle(0xffd700)
    graphics.fillRect(6, 0, 4, 16)
    graphics.fillRect(5, 2, 6, 12)

    graphics.generateTexture('coin2', 16, 16)

    // Coin frame 3 (edge)
    graphics.clear()
    graphics.fillStyle(0xffd700)
    graphics.fillRect(7, 0, 2, 16)

    graphics.generateTexture('coin3', 16, 16)

    graphics.destroy()
  }

  createMushroomSprite() {
    const graphics = this.make.graphics({ x: 0, y: 0 })

    // Super mushroom (red)
    graphics.fillStyle(0xff0000)
    graphics.fillRect(4, 0, 24, 8)
    graphics.fillRect(0, 8, 32, 8)
    // White spots
    graphics.fillStyle(0xffffff)
    graphics.fillRect(6, 2, 6, 6)
    graphics.fillRect(20, 2, 6, 6)
    graphics.fillRect(12, 8, 8, 6)
    // Stem
    graphics.fillStyle(0xffcc99)
    graphics.fillRect(8, 16, 16, 12)
    graphics.fillStyle(0x000000)
    graphics.fillRect(10, 20, 4, 4)
    graphics.fillRect(18, 20, 4, 4)

    graphics.generateTexture('mushroom', 32, 28)

    graphics.destroy()
  }

  createFlagSprite() {
    const graphics = this.make.graphics({ x: 0, y: 0 })

    // Flag pole
    graphics.fillStyle(0x00aa00)
    graphics.fillRect(28, 0, 8, 320)

    // Flag
    graphics.fillStyle(0x00ff00)
    graphics.fillRect(0, 16, 28, 32)

    // Pole ball top
    graphics.fillStyle(0xffff00)
    graphics.fillRect(26, 0, 12, 16)

    graphics.generateTexture('flag', 38, 320)

    graphics.destroy()
  }

  createCloudSprite() {
    const graphics = this.make.graphics({ x: 0, y: 0 })

    graphics.fillStyle(0xffffff)
    graphics.fillRect(16, 0, 32, 24)
    graphics.fillRect(0, 8, 64, 24)
    graphics.fillRect(8, 4, 48, 28)

    graphics.generateTexture('cloud', 64, 32)

    graphics.destroy()
  }

  createBushSprite() {
    const graphics = this.make.graphics({ x: 0, y: 0 })

    graphics.fillStyle(0x00aa00)
    graphics.fillRect(16, 0, 32, 24)
    graphics.fillRect(0, 8, 64, 24)
    graphics.fillRect(8, 4, 48, 28)

    graphics.generateTexture('bush', 64, 32)

    graphics.destroy()
  }

  createPipeSprite() {
    const graphics = this.make.graphics({ x: 0, y: 0 })

    // Pipe body
    graphics.fillStyle(0x00aa00)
    graphics.fillRect(0, 0, 64, 64)

    // Pipe rim (top)
    graphics.fillStyle(0x00cc00)
    graphics.fillRect(-4, 0, 72, 16)

    // Highlights
    graphics.fillStyle(0x00ff00)
    graphics.fillRect(4, 16, 8, 48)
    graphics.fillRect(0, 4, 8, 8)

    // Dark side
    graphics.fillStyle(0x008800)
    graphics.fillRect(52, 16, 8, 48)
    graphics.fillRect(56, 4, 8, 8)

    graphics.generateTexture('pipe', 68, 64)

    graphics.destroy()
  }
}
