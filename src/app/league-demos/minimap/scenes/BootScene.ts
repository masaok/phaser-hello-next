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
    graphics.fillStyle(0xff69b4) // Pink top
    graphics.fillRect(12, 16, 8, 12)
    graphics.fillStyle(0x4a4a8a) // Dark purple pants
    graphics.fillRect(12, 28, 4, 10)
    graphics.fillRect(18, 28, 4, 10)
    graphics.fillStyle(0x2a2a4a)
    graphics.fillRect(11, 36, 5, 4)
    graphics.fillRect(17, 36, 5, 4)
    graphics.fillStyle(0xffdbac) // Skin
    graphics.fillRect(13, 8, 6, 8)
    graphics.fillStyle(0x00bfff) // Blue hair
    graphics.fillRect(10, 4, 12, 6)
    graphics.fillRect(8, 8, 4, 20)
    graphics.fillRect(20, 8, 4, 20)
    graphics.fillRect(7, 26, 4, 8)
    graphics.fillRect(21, 26, 4, 8)
    graphics.fillStyle(0xff1493) // Pink eyes
    graphics.fillRect(14, 10, 2, 3)
    graphics.fillRect(17, 10, 2, 3)
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

    // Champion marker for minimap
    const markerGraphics = this.add.graphics()
    markerGraphics.fillStyle(0x00bfff, 1)
    markerGraphics.fillCircle(8, 8, 8)
    markerGraphics.lineStyle(2, 0xffffff, 1)
    markerGraphics.strokeCircle(8, 8, 8)
    markerGraphics.generateTexture('champion-marker', 16, 16)
    markerGraphics.destroy()
  }

  createMapTextures() {
    // Dark background/void (outside playable area)
    const voidGraphics = this.add.graphics()
    voidGraphics.fillStyle(0x1a2a3a, 1)
    voidGraphics.fillRect(0, 0, 64, 64)
    voidGraphics.generateTexture('void', 64, 64)
    voidGraphics.destroy()

    // Jungle/terrain - olive/tan color like the reference
    const jungleGraphics = this.add.graphics()
    jungleGraphics.fillStyle(0x8a9a6a, 1) // Olive/tan base
    jungleGraphics.fillRect(0, 0, 64, 64)
    // Add organic pattern variation
    jungleGraphics.fillStyle(0x7a8a5a, 1)
    jungleGraphics.fillCircle(16, 20, 12)
    jungleGraphics.fillCircle(48, 44, 14)
    jungleGraphics.fillStyle(0x9aaa7a, 1)
    jungleGraphics.fillCircle(40, 16, 10)
    jungleGraphics.fillCircle(24, 48, 11)
    jungleGraphics.generateTexture('jungle', 64, 64)
    jungleGraphics.destroy()

    // River water - cyan/teal color
    const waterGraphics = this.add.graphics()
    waterGraphics.fillStyle(0x4a9aba, 1) // Teal base
    waterGraphics.fillRect(0, 0, 64, 64)
    // Water highlights
    waterGraphics.fillStyle(0x5aaacc, 1)
    waterGraphics.fillRect(8, 20, 48, 6)
    waterGraphics.fillRect(4, 42, 56, 5)
    waterGraphics.fillStyle(0x6abade, 0.6)
    waterGraphics.fillRect(16, 12, 32, 4)
    waterGraphics.fillRect(20, 50, 28, 4)
    waterGraphics.generateTexture('water', 64, 64)
    waterGraphics.destroy()

    // Lane path - slightly lighter than jungle
    const laneGraphics = this.add.graphics()
    laneGraphics.fillStyle(0x9aaa7a, 1) // Lighter olive
    laneGraphics.fillRect(0, 0, 64, 64)
    laneGraphics.fillStyle(0xaaba8a, 1)
    laneGraphics.fillRect(4, 4, 56, 56)
    laneGraphics.generateTexture('lane', 64, 64)
    laneGraphics.destroy()

    // Blue base - dark blue/teal
    const blueBaseGraphics = this.add.graphics()
    blueBaseGraphics.fillStyle(0x3a5a6a, 1)
    blueBaseGraphics.fillRect(0, 0, 64, 64)
    blueBaseGraphics.fillStyle(0x4a6a7a, 1)
    blueBaseGraphics.fillCircle(32, 32, 24)
    blueBaseGraphics.fillStyle(0x5a7a8a, 1)
    blueBaseGraphics.fillCircle(32, 32, 16)
    blueBaseGraphics.generateTexture('base-blue', 64, 64)
    blueBaseGraphics.destroy()

    // Red base - gray/dark
    const redBaseGraphics = this.add.graphics()
    redBaseGraphics.fillStyle(0x5a5a6a, 1)
    redBaseGraphics.fillRect(0, 0, 64, 64)
    redBaseGraphics.fillStyle(0x6a6a7a, 1)
    redBaseGraphics.fillCircle(32, 32, 24)
    redBaseGraphics.fillStyle(0x7a7a8a, 1)
    redBaseGraphics.fillCircle(32, 32, 16)
    redBaseGraphics.generateTexture('base-red', 64, 64)
    redBaseGraphics.destroy()

    // Blue Nexus
    const blueNexusGraphics = this.add.graphics()
    blueNexusGraphics.fillStyle(0x3a5a6a, 1)
    blueNexusGraphics.fillCircle(64, 64, 60)
    blueNexusGraphics.fillStyle(0x4a7a9a, 1)
    blueNexusGraphics.fillCircle(64, 64, 45)
    blueNexusGraphics.fillStyle(0x5a9aba, 1)
    blueNexusGraphics.fillCircle(64, 64, 30)
    blueNexusGraphics.lineStyle(4, 0x6abadc, 1)
    blueNexusGraphics.strokeCircle(64, 64, 50)
    blueNexusGraphics.generateTexture('nexus-blue', 128, 128)
    blueNexusGraphics.destroy()

    // Red Nexus
    const redNexusGraphics = this.add.graphics()
    redNexusGraphics.fillStyle(0x5a5a6a, 1)
    redNexusGraphics.fillCircle(64, 64, 60)
    redNexusGraphics.fillStyle(0x6a6a7a, 1)
    redNexusGraphics.fillCircle(64, 64, 45)
    redNexusGraphics.fillStyle(0x7a7a8a, 1)
    redNexusGraphics.fillCircle(64, 64, 30)
    redNexusGraphics.lineStyle(4, 0x8a8a9a, 1)
    redNexusGraphics.strokeCircle(64, 64, 50)
    redNexusGraphics.generateTexture('nexus-red', 128, 128)
    redNexusGraphics.destroy()

    // Objective pit (dragon/baron)
    const pitGraphics = this.add.graphics()
    pitGraphics.fillStyle(0x3a6a8a, 1)
    pitGraphics.fillCircle(48, 48, 44)
    pitGraphics.fillStyle(0x2a5a7a, 1)
    pitGraphics.fillCircle(48, 48, 36)
    pitGraphics.lineStyle(3, 0x4a8aaa, 1)
    pitGraphics.strokeCircle(48, 48, 40)
    pitGraphics.generateTexture('pit', 96, 96)
    pitGraphics.destroy()

    // Dragon marker
    const dragonGraphics = this.add.graphics()
    dragonGraphics.fillStyle(0x4a8aba, 1)
    dragonGraphics.fillCircle(16, 16, 14)
    dragonGraphics.fillStyle(0x5a9aca, 1)
    dragonGraphics.fillCircle(16, 16, 10)
    dragonGraphics.generateTexture('dragon', 32, 32)
    dragonGraphics.destroy()

    // Baron marker
    const baronGraphics = this.add.graphics()
    baronGraphics.fillStyle(0x4a8aba, 1)
    baronGraphics.fillCircle(16, 16, 14)
    baronGraphics.fillStyle(0x5a9aca, 1)
    baronGraphics.fillCircle(16, 16, 10)
    baronGraphics.generateTexture('baron', 32, 32)
    baronGraphics.destroy()

    // Tower - blue
    const blueTowerGraphics = this.add.graphics()
    blueTowerGraphics.fillStyle(0x4a7a9a, 1)
    blueTowerGraphics.fillCircle(24, 24, 20)
    blueTowerGraphics.fillStyle(0x5a9aba, 1)
    blueTowerGraphics.fillCircle(24, 24, 14)
    blueTowerGraphics.fillStyle(0x6abadc, 1)
    blueTowerGraphics.fillCircle(24, 24, 8)
    blueTowerGraphics.generateTexture('tower-blue', 48, 48)
    blueTowerGraphics.destroy()

    // Tower - red
    const redTowerGraphics = this.add.graphics()
    redTowerGraphics.fillStyle(0x6a6a7a, 1)
    redTowerGraphics.fillCircle(24, 24, 20)
    redTowerGraphics.fillStyle(0x7a7a8a, 1)
    redTowerGraphics.fillCircle(24, 24, 14)
    redTowerGraphics.fillStyle(0x8a8a9a, 1)
    redTowerGraphics.fillCircle(24, 24, 8)
    redTowerGraphics.generateTexture('tower-red', 48, 48)
    redTowerGraphics.destroy()

    // Inhibitor - blue
    const blueInhibGraphics = this.add.graphics()
    blueInhibGraphics.fillStyle(0x4a7a9a, 1)
    blueInhibGraphics.fillCircle(20, 20, 18)
    blueInhibGraphics.fillStyle(0x5a9aba, 1)
    blueInhibGraphics.fillCircle(20, 20, 12)
    blueInhibGraphics.generateTexture('inhibitor-blue', 40, 40)
    blueInhibGraphics.destroy()

    // Inhibitor - red
    const redInhibGraphics = this.add.graphics()
    redInhibGraphics.fillStyle(0x6a6a7a, 1)
    redInhibGraphics.fillCircle(20, 20, 18)
    redInhibGraphics.fillStyle(0x7a7a8a, 1)
    redInhibGraphics.fillCircle(20, 20, 12)
    redInhibGraphics.generateTexture('inhibitor-red', 40, 40)
    redInhibGraphics.destroy()

    // Minimap background
    const minimapBgGraphics = this.add.graphics()
    minimapBgGraphics.fillStyle(0x1a2a3a, 0.95)
    minimapBgGraphics.fillRect(0, 0, 200, 200)
    minimapBgGraphics.lineStyle(2, 0xc9aa71, 1)
    minimapBgGraphics.strokeRect(0, 0, 200, 200)
    minimapBgGraphics.generateTexture('minimap-bg', 200, 200)
    minimapBgGraphics.destroy()
  }
}
