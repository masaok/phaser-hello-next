import * as Phaser from 'phaser'

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' })
  }

  preload() {
    this.createChampionSprites()
    this.createProjectileSprites()
    this.createEffectSprites()
    this.createDummySprite()
    this.createUISprites()
  }

  create() {
    this.scene.start('GameScene')
  }

  createChampionSprites() {
    const graphics = this.make.graphics({ x: 0, y: 0 })

    // Jinx-like character - idle stance (facing right)
    // Long blue braids, pink outfit, carrying weapons

    // Body
    graphics.fillStyle(0xff69b4) // Pink top
    graphics.fillRect(12, 16, 8, 12)

    // Legs
    graphics.fillStyle(0x4a4a8a) // Dark purple pants
    graphics.fillRect(12, 28, 4, 10)
    graphics.fillRect(18, 28, 4, 10)

    // Boots
    graphics.fillStyle(0x2a2a4a)
    graphics.fillRect(11, 36, 5, 4)
    graphics.fillRect(17, 36, 5, 4)

    // Head
    graphics.fillStyle(0xffdbac) // Skin
    graphics.fillRect(13, 8, 6, 8)

    // Blue hair/braids
    graphics.fillStyle(0x00bfff)
    graphics.fillRect(10, 4, 12, 6)
    graphics.fillRect(8, 8, 4, 20) // Left braid
    graphics.fillRect(20, 8, 4, 20) // Right braid
    graphics.fillRect(7, 26, 4, 8) // Left braid end
    graphics.fillRect(21, 26, 4, 8) // Right braid end

    // Eyes (big expressive)
    graphics.fillStyle(0xff1493) // Pink eyes
    graphics.fillRect(14, 10, 2, 3)
    graphics.fillRect(17, 10, 2, 3)

    // Minigun (Pow-Pow style) - on right side
    graphics.fillStyle(0x666666)
    graphics.fillRect(22, 18, 10, 4)
    graphics.fillStyle(0x888888)
    graphics.fillRect(24, 16, 6, 2)
    graphics.fillRect(24, 22, 6, 2)

    graphics.generateTexture('champion-idle', 40, 44)

    // Walking frame 1
    graphics.clear()
    graphics.fillStyle(0xff69b4)
    graphics.fillRect(12, 16, 8, 12)
    graphics.fillStyle(0x4a4a8a)
    graphics.fillRect(10, 28, 4, 10)
    graphics.fillRect(18, 28, 4, 10)
    graphics.fillStyle(0x2a2a4a)
    graphics.fillRect(9, 36, 5, 4)
    graphics.fillRect(17, 36, 5, 4)
    graphics.fillStyle(0xffdbac)
    graphics.fillRect(13, 8, 6, 8)
    graphics.fillStyle(0x00bfff)
    graphics.fillRect(10, 4, 12, 6)
    graphics.fillRect(6, 8, 4, 20)
    graphics.fillRect(22, 8, 4, 20)
    graphics.fillRect(5, 26, 4, 8)
    graphics.fillRect(23, 26, 4, 8)
    graphics.fillStyle(0xff1493)
    graphics.fillRect(14, 10, 2, 3)
    graphics.fillRect(17, 10, 2, 3)
    graphics.fillStyle(0x666666)
    graphics.fillRect(22, 18, 10, 4)

    graphics.generateTexture('champion-walk1', 40, 44)

    // Walking frame 2
    graphics.clear()
    graphics.fillStyle(0xff69b4)
    graphics.fillRect(12, 16, 8, 12)
    graphics.fillStyle(0x4a4a8a)
    graphics.fillRect(14, 28, 4, 10)
    graphics.fillRect(16, 28, 4, 10)
    graphics.fillStyle(0x2a2a4a)
    graphics.fillRect(13, 36, 5, 4)
    graphics.fillRect(15, 36, 5, 4)
    graphics.fillStyle(0xffdbac)
    graphics.fillRect(13, 8, 6, 8)
    graphics.fillStyle(0x00bfff)
    graphics.fillRect(10, 4, 12, 6)
    graphics.fillRect(8, 8, 4, 20)
    graphics.fillRect(20, 8, 4, 20)
    graphics.fillRect(7, 26, 4, 8)
    graphics.fillRect(21, 26, 4, 8)
    graphics.fillStyle(0xff1493)
    graphics.fillRect(14, 10, 2, 3)
    graphics.fillRect(17, 10, 2, 3)
    graphics.fillStyle(0x666666)
    graphics.fillRect(22, 18, 10, 4)

    graphics.generateTexture('champion-walk2', 40, 44)

    // Rocket launcher mode (Fishbones style)
    graphics.clear()
    graphics.fillStyle(0xff69b4)
    graphics.fillRect(12, 16, 8, 12)
    graphics.fillStyle(0x4a4a8a)
    graphics.fillRect(12, 28, 4, 10)
    graphics.fillRect(18, 28, 4, 10)
    graphics.fillStyle(0x2a2a4a)
    graphics.fillRect(11, 36, 5, 4)
    graphics.fillRect(17, 36, 5, 4)
    graphics.fillStyle(0xffdbac)
    graphics.fillRect(13, 8, 6, 8)
    graphics.fillStyle(0x00bfff)
    graphics.fillRect(10, 4, 12, 6)
    graphics.fillRect(8, 8, 4, 20)
    graphics.fillRect(20, 8, 4, 20)
    graphics.fillRect(7, 26, 4, 8)
    graphics.fillRect(21, 26, 4, 8)
    graphics.fillStyle(0xff1493)
    graphics.fillRect(14, 10, 2, 3)
    graphics.fillRect(17, 10, 2, 3)
    // Rocket launcher - bigger weapon
    graphics.fillStyle(0x8b0000) // Dark red
    graphics.fillRect(22, 14, 14, 8)
    graphics.fillStyle(0xff4444)
    graphics.fillRect(34, 15, 4, 6) // Rocket tip
    graphics.fillStyle(0x444444)
    graphics.fillRect(22, 12, 4, 4) // Handle

    graphics.generateTexture('champion-rocket', 40, 44)

    graphics.destroy()
  }

  createProjectileSprites() {
    const graphics = this.make.graphics({ x: 0, y: 0 })

    // Minigun bullet
    graphics.fillStyle(0xffff00)
    graphics.fillRect(0, 2, 8, 4)
    graphics.fillStyle(0xffa500)
    graphics.fillRect(6, 2, 4, 4)

    graphics.generateTexture('bullet', 10, 8)

    // Rocket
    graphics.clear()
    graphics.fillStyle(0xff4444)
    graphics.fillRect(0, 4, 16, 8)
    graphics.fillStyle(0xffaa00)
    graphics.fillRect(14, 5, 4, 6)
    graphics.fillStyle(0xff8800)
    graphics.fillRect(0, 6, 4, 4) // Fins
    graphics.fillRect(0, 2, 2, 4)
    graphics.fillRect(0, 10, 2, 4)

    graphics.generateTexture('rocket', 20, 16)

    // Zap (W ability) - electric shock
    graphics.clear()
    graphics.fillStyle(0x00ffff)
    graphics.fillRect(0, 4, 20, 2)
    graphics.fillRect(4, 2, 2, 6)
    graphics.fillRect(10, 0, 2, 10)
    graphics.fillRect(16, 2, 2, 6)

    graphics.generateTexture('zap', 20, 10)

    // Chompers (E ability) - trap
    graphics.clear()
    graphics.fillStyle(0x9932cc) // Purple
    graphics.fillRect(4, 4, 24, 24)
    graphics.fillStyle(0xff00ff)
    graphics.fillRect(8, 8, 16, 16)
    // Teeth
    graphics.fillStyle(0xffffff)
    graphics.fillRect(10, 6, 4, 6)
    graphics.fillRect(18, 6, 4, 6)
    graphics.fillRect(10, 20, 4, 6)
    graphics.fillRect(18, 20, 4, 6)

    graphics.generateTexture('trap', 32, 32)

    // Super Mega Death Rocket (R ability)
    graphics.clear()
    graphics.fillStyle(0xff0000)
    graphics.fillRect(0, 8, 40, 16)
    graphics.fillStyle(0xffcc00)
    graphics.fillRect(36, 10, 8, 12)
    // Shark face design
    graphics.fillStyle(0xffffff)
    graphics.fillRect(30, 12, 4, 4) // Eye
    graphics.fillRect(24, 18, 10, 4) // Teeth
    graphics.fillStyle(0x000000)
    graphics.fillRect(31, 13, 2, 2) // Pupil
    // Fins
    graphics.fillStyle(0xcc0000)
    graphics.fillRect(4, 4, 8, 6)
    graphics.fillRect(4, 22, 8, 6)

    graphics.generateTexture('mega-rocket', 48, 32)

    graphics.destroy()
  }

  createEffectSprites() {
    const graphics = this.make.graphics({ x: 0, y: 0 })

    // Explosion
    graphics.fillStyle(0xff6600)
    graphics.fillCircle(24, 24, 20)
    graphics.fillStyle(0xffcc00)
    graphics.fillCircle(24, 24, 14)
    graphics.fillStyle(0xffffff)
    graphics.fillCircle(24, 24, 6)

    graphics.generateTexture('explosion', 48, 48)

    // Big explosion for ultimate
    graphics.clear()
    graphics.fillStyle(0xff0000)
    graphics.fillCircle(48, 48, 44)
    graphics.fillStyle(0xff6600)
    graphics.fillCircle(48, 48, 34)
    graphics.fillStyle(0xffcc00)
    graphics.fillCircle(48, 48, 22)
    graphics.fillStyle(0xffffff)
    graphics.fillCircle(48, 48, 10)

    graphics.generateTexture('big-explosion', 96, 96)

    // Excited passive indicator
    graphics.clear()
    graphics.fillStyle(0xff69b4)
    graphics.fillCircle(8, 8, 6)
    graphics.fillStyle(0xffffff)
    graphics.fillCircle(8, 8, 3)

    graphics.generateTexture('excited', 16, 16)

    graphics.destroy()
  }

  createDummySprite() {
    const graphics = this.make.graphics({ x: 0, y: 0 })

    // Training dummy
    graphics.fillStyle(0x8b4513) // Brown wood
    graphics.fillRect(12, 8, 16, 32)
    // Head
    graphics.fillCircle(20, 8, 10)
    // Arms
    graphics.fillRect(4, 14, 10, 6)
    graphics.fillRect(26, 14, 10, 6)
    // Stand
    graphics.fillStyle(0x654321)
    graphics.fillRect(8, 38, 24, 6)
    graphics.fillRect(14, 42, 12, 6)
    // Target
    graphics.fillStyle(0xff0000)
    graphics.fillCircle(20, 20, 6)
    graphics.fillStyle(0xffffff)
    graphics.fillCircle(20, 20, 3)

    graphics.generateTexture('dummy', 40, 48)

    graphics.destroy()
  }

  createUISprites() {
    const graphics = this.make.graphics({ x: 0, y: 0 })

    // Health bar background
    graphics.fillStyle(0x333333)
    graphics.fillRect(0, 0, 104, 14)
    graphics.fillStyle(0x000000)
    graphics.fillRect(2, 2, 100, 10)

    graphics.generateTexture('health-bar-bg', 104, 14)

    // Mana bar background
    graphics.fillStyle(0x333333)
    graphics.fillRect(0, 0, 104, 10)
    graphics.fillStyle(0x000000)
    graphics.fillRect(2, 2, 100, 6)

    graphics.generateTexture('mana-bar-bg', 104, 10)

    // Ability icon background
    graphics.clear()
    graphics.fillStyle(0x444444)
    graphics.fillRect(0, 0, 48, 48)
    graphics.fillStyle(0x222222)
    graphics.fillRect(2, 2, 44, 44)

    graphics.generateTexture('ability-bg', 48, 48)

    // Q icon - weapon swap
    graphics.clear()
    graphics.fillStyle(0x666666)
    graphics.fillRect(8, 20, 16, 6)
    graphics.fillStyle(0x888888)
    graphics.fillRect(22, 18, 12, 10)
    graphics.fillStyle(0xffcc00)
    graphics.fillRect(6, 22, 4, 2)

    graphics.generateTexture('icon-q', 40, 40)

    // W icon - zap
    graphics.clear()
    graphics.fillStyle(0x00ffff)
    graphics.fillRect(8, 18, 24, 4)
    graphics.fillRect(14, 10, 4, 20)

    graphics.generateTexture('icon-w', 40, 40)

    // E icon - trap
    graphics.clear()
    graphics.fillStyle(0x9932cc)
    graphics.fillRect(10, 10, 20, 20)
    graphics.fillStyle(0xffffff)
    graphics.fillRect(14, 8, 4, 6)
    graphics.fillRect(22, 8, 4, 6)

    graphics.generateTexture('icon-e', 40, 40)

    // R icon - mega rocket
    graphics.clear()
    graphics.fillStyle(0xff0000)
    graphics.fillRect(6, 14, 28, 12)
    graphics.fillStyle(0xffcc00)
    graphics.fillRect(30, 16, 6, 8)

    graphics.generateTexture('icon-r', 40, 40)

    graphics.destroy()
  }
}
