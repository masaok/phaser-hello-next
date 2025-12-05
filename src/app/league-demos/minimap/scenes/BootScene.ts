import * as Phaser from 'phaser'

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' })
  }

  preload() {
    // Generate textures programmatically
    this.createChampionSprites()
    this.createMapTextures()
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

    graphics.destroy()

    // Champion marker for minimap (cyan dot with white border)
    const markerGraphics = this.add.graphics()
    markerGraphics.fillStyle(0x00bfff, 1)
    markerGraphics.fillCircle(8, 8, 8)
    markerGraphics.lineStyle(2, 0xffffff, 1)
    markerGraphics.strokeCircle(8, 8, 8)
    markerGraphics.generateTexture('champion-marker', 16, 16)
    markerGraphics.destroy()
  }

  createMapTextures() {
    // Grass tile
    const grassGraphics = this.add.graphics()
    grassGraphics.fillStyle(0x2d5a27, 1)
    grassGraphics.fillRect(0, 0, 64, 64)
    // Add some variation
    grassGraphics.fillStyle(0x3d6a37, 1)
    grassGraphics.fillRect(10, 10, 8, 8)
    grassGraphics.fillRect(40, 30, 6, 6)
    grassGraphics.fillRect(20, 45, 10, 8)
    grassGraphics.generateTexture('grass', 64, 64)
    grassGraphics.destroy()

    // Water tile
    const waterGraphics = this.add.graphics()
    waterGraphics.fillStyle(0x1a4a6e, 1)
    waterGraphics.fillRect(0, 0, 64, 64)
    waterGraphics.fillStyle(0x2a5a7e, 1)
    waterGraphics.fillRect(5, 15, 54, 4)
    waterGraphics.fillRect(0, 40, 50, 3)
    waterGraphics.generateTexture('water', 64, 64)
    waterGraphics.destroy()

    // Rock/mountain tile
    const rockGraphics = this.add.graphics()
    rockGraphics.fillStyle(0x4a4a5a, 1)
    rockGraphics.fillRect(0, 0, 64, 64)
    rockGraphics.fillStyle(0x5a5a6a, 1)
    rockGraphics.fillTriangle(32, 5, 10, 60, 54, 60)
    rockGraphics.generateTexture('rock', 64, 64)
    rockGraphics.destroy()

    // Tree
    const treeGraphics = this.add.graphics()
    treeGraphics.fillStyle(0x5a3d2b, 1)
    treeGraphics.fillRect(26, 40, 12, 24)
    treeGraphics.fillStyle(0x2d7a27, 1)
    treeGraphics.fillCircle(32, 24, 24)
    treeGraphics.fillStyle(0x3d8a37, 1)
    treeGraphics.fillCircle(24, 30, 16)
    treeGraphics.fillCircle(40, 28, 18)
    treeGraphics.generateTexture('tree', 64, 64)
    treeGraphics.destroy()

    // Base/Nexus
    const baseGraphics = this.add.graphics()
    baseGraphics.fillStyle(0x3a3a4a, 1)
    baseGraphics.fillRect(0, 0, 128, 128)
    baseGraphics.fillStyle(0x6a6aaa, 1)
    baseGraphics.fillCircle(64, 64, 48)
    baseGraphics.fillStyle(0x8a8acc, 1)
    baseGraphics.fillCircle(64, 64, 32)
    baseGraphics.lineStyle(4, 0xaaaaff, 1)
    baseGraphics.strokeCircle(64, 64, 48)
    baseGraphics.generateTexture('base', 128, 128)
    baseGraphics.destroy()

    // Tower
    const towerGraphics = this.add.graphics()
    towerGraphics.fillStyle(0x5a5a6a, 1)
    towerGraphics.fillRect(16, 20, 32, 44)
    towerGraphics.fillStyle(0x6a6a7a, 1)
    towerGraphics.fillTriangle(32, 0, 8, 24, 56, 24)
    towerGraphics.fillStyle(0x7a7a8a, 1)
    towerGraphics.fillRect(20, 32, 8, 10)
    towerGraphics.fillRect(36, 32, 8, 10)
    towerGraphics.generateTexture('tower', 64, 64)
    towerGraphics.destroy()

    // Lane path
    const laneGraphics = this.add.graphics()
    laneGraphics.fillStyle(0x4a4a3a, 1)
    laneGraphics.fillRect(0, 0, 64, 64)
    laneGraphics.fillStyle(0x5a5a4a, 1)
    laneGraphics.fillRect(8, 0, 48, 64)
    laneGraphics.generateTexture('lane', 64, 64)
    laneGraphics.destroy()

    // Minimap background
    const minimapBgGraphics = this.add.graphics()
    minimapBgGraphics.fillStyle(0x1a1a2e, 0.9)
    minimapBgGraphics.fillRect(0, 0, 200, 200)
    minimapBgGraphics.lineStyle(3, 0x4a4a6a, 1)
    minimapBgGraphics.strokeRect(0, 0, 200, 200)
    minimapBgGraphics.generateTexture('minimap-bg', 200, 200)
    minimapBgGraphics.destroy()
  }
}
