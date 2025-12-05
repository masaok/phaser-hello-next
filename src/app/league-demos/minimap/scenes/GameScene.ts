import * as Phaser from 'phaser'

const MAP_WIDTH = 3200
const MAP_HEIGHT = 3200
const TILE_SIZE = 64
const MINIMAP_SIZE = 200
const MINIMAP_MARGIN = 16

export default class GameScene extends Phaser.Scene {
  champion!: Phaser.Physics.Arcade.Sprite
  minimapCamera!: Phaser.Cameras.Scene2D.Camera
  championMarker!: Phaser.GameObjects.Sprite

  // UI elements that need repositioning on resize
  minimapBg!: Phaser.GameObjects.Image
  minimapBorder!: Phaser.GameObjects.Graphics
  minimapLabel!: Phaser.GameObjects.Text

  // Movement
  targetX: number = 0
  targetY: number = 0
  isMoving: boolean = false
  moveSpeed: number = 300

  // Animation
  walkFrame: number = 0
  walkTimer: number = 0

  constructor() {
    super({ key: 'GameScene' })
  }

  create() {
    // Create the Summoner's Rift style map
    this.createMap()

    // Create champion at blue side fountain (bottom-left)
    const startX = 250
    const startY = MAP_HEIGHT - 250
    this.champion = this.physics.add.sprite(startX, startY, 'champion-idle')
    this.champion.setScale(1.5)
    this.champion.setDepth(10)

    this.targetX = startX
    this.targetY = startY

    // Set up main camera to follow champion
    this.cameras.main.setBounds(0, 0, MAP_WIDTH, MAP_HEIGHT)
    this.cameras.main.startFollow(this.champion, true, 0.1, 0.1)
    this.cameras.main.setZoom(1)

    // Create minimap
    this.createMinimap()

    // Input - left click or right click to move
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y)
      this.moveTo(worldPoint.x, worldPoint.y)
      this.createClickIndicator(worldPoint.x, worldPoint.y)
    })

    // Prevent context menu
    this.game.canvas.addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })

    // Handle resize
    this.scale.on('resize', this.handleResize, this)
  }

  handleResize(gameSize: Phaser.Structs.Size) {
    const width = gameSize.width
    const height = gameSize.height

    // Update minimap position
    if (this.minimapCamera) {
      this.minimapCamera.setPosition(
        width - MINIMAP_SIZE - MINIMAP_MARGIN,
        height - MINIMAP_SIZE - MINIMAP_MARGIN
      )
    }

    if (this.minimapBg) {
      this.minimapBg.setPosition(
        width - MINIMAP_SIZE / 2 - MINIMAP_MARGIN,
        height - MINIMAP_SIZE / 2 - MINIMAP_MARGIN
      )
    }

    if (this.minimapBorder) {
      this.minimapBorder.clear()
      this.minimapBorder.lineStyle(2, 0xc9aa71, 1)
      this.minimapBorder.strokeRect(
        width - MINIMAP_SIZE - MINIMAP_MARGIN,
        height - MINIMAP_SIZE - MINIMAP_MARGIN,
        MINIMAP_SIZE,
        MINIMAP_SIZE
      )
    }

    if (this.minimapLabel) {
      this.minimapLabel.setPosition(
        width - MINIMAP_SIZE / 2 - MINIMAP_MARGIN,
        height - MINIMAP_SIZE - MINIMAP_MARGIN - 18
      )
    }
  }

  createMap() {
    const tilesX = Math.ceil(MAP_WIDTH / TILE_SIZE)
    const tilesY = Math.ceil(MAP_HEIGHT / TILE_SIZE)

    // Create base terrain
    for (let y = 0; y < tilesY; y++) {
      for (let x = 0; x < tilesX; x++) {
        const tileX = x * TILE_SIZE + TILE_SIZE / 2
        const tileY = y * TILE_SIZE + TILE_SIZE / 2

        let texture = 'void' // Default dark background

        // Check if within playable diamond shape
        if (this.isInPlayableArea(x, y, tilesX, tilesY)) {
          texture = 'jungle' // Olive/tan jungle

          // River - diagonal from top-left to bottom-right
          if (this.isRiver(x, y, tilesX, tilesY)) {
            texture = 'water'
          }

          // Lanes
          if (this.isLane(x, y, tilesX, tilesY)) {
            texture = 'lane'
          }

          // Blue base area (bottom-left corner)
          if (this.isBlueBase(x, y, tilesX, tilesY)) {
            texture = 'base-blue'
          }

          // Red base area (top-right corner)
          if (this.isRedBase(x, y, tilesX, tilesY)) {
            texture = 'base-red'
          }
        }

        this.add.image(tileX, tileY, texture).setDepth(0)
      }
    }

    // Add structures
    this.createStructures()

    // Add objectives (dragon/baron pits)
    this.createObjectives()
  }

  isInPlayableArea(x: number, y: number, tilesX: number, tilesY: number): boolean {
    // Create a rounded square/diamond shape for the playable area
    const centerX = tilesX / 2
    const centerY = tilesY / 2
    const margin = 4

    // Distance from edges
    const fromLeft = x
    const fromRight = tilesX - x - 1
    const fromTop = y
    const fromBottom = tilesY - y - 1

    // Cut corners to create the shape
    const cornerCut = 8

    // Top-left corner (near red base approach)
    if (fromLeft + fromTop < cornerCut) return false
    // Top-right corner
    if (fromRight + fromTop < cornerCut - 2) return false
    // Bottom-left corner
    if (fromLeft + fromBottom < cornerCut - 2) return false
    // Bottom-right corner (near blue base approach)
    if (fromRight + fromBottom < cornerCut) return false

    // Basic bounds
    if (x < margin || x > tilesX - margin - 1) return false
    if (y < margin || y > tilesY - margin - 1) return false

    return true
  }

  isRiver(x: number, y: number, tilesX: number, tilesY: number): boolean {
    // River runs diagonally from top-left area to bottom-right area
    // In the reference, it goes from around (0.2, 0.4) to (0.6, 0.8) of the map

    const normalizedX = x / tilesX
    const normalizedY = y / tilesY

    // The river follows a diagonal line
    // y = x shifted and constrained to middle area
    const riverCenterY = normalizedX + 0.15
    const distFromRiver = Math.abs(normalizedY - riverCenterY)

    // River width varies - wider in the middle
    const riverWidth = 0.06

    // Only in the middle section of the map (not near bases)
    const inMiddle = normalizedX > 0.2 && normalizedX < 0.8 &&
                     normalizedY > 0.2 && normalizedY < 0.8

    return distFromRiver < riverWidth && inMiddle
  }

  isLane(x: number, y: number, tilesX: number, tilesY: number): boolean {
    const laneWidth = 4
    const margin = 6

    // Top lane - runs along top edge, then down the left side
    // Horizontal part along top
    const topLaneHorizontal = y >= margin && y < margin + laneWidth && x > margin + 6
    // Vertical part along left
    const topLaneVertical = x >= margin && x < margin + laneWidth && y < tilesY - margin - 6

    // Bottom lane - runs along right side, then along bottom
    // Vertical part along right
    const botLaneVertical = x >= tilesX - margin - laneWidth && x < tilesX - margin && y > margin + 6
    // Horizontal part along bottom
    const botLaneHorizontal = y >= tilesY - margin - laneWidth && y < tilesY - margin && x < tilesX - margin - 6

    // Mid lane - diagonal from bottom-left to top-right
    const normalizedX = x / tilesX
    const normalizedY = y / tilesY
    const midLaneY = 1.0 - normalizedX // Diagonal line
    const distFromMid = Math.abs(normalizedY - midLaneY)
    const midLane = distFromMid < 0.05 && normalizedX > 0.15 && normalizedX < 0.85

    return topLaneHorizontal || topLaneVertical || botLaneHorizontal || botLaneVertical || midLane
  }

  isBlueBase(x: number, y: number, tilesX: number, tilesY: number): boolean {
    // Bottom-left corner
    const baseSize = 8
    return x < baseSize + 4 && y > tilesY - baseSize - 4
  }

  isRedBase(x: number, y: number, tilesX: number, tilesY: number): boolean {
    // Top-right corner
    const baseSize = 8
    return x > tilesX - baseSize - 4 && y < baseSize + 4
  }

  createStructures() {
    // Blue Nexus (bottom-left)
    this.add.image(200, MAP_HEIGHT - 200, 'nexus-blue').setDepth(2)

    // Red Nexus (top-right)
    this.add.image(MAP_WIDTH - 200, 200, 'nexus-red').setDepth(2)

    // Blue towers
    const blueTowers = [
      // Nexus towers
      { x: 320, y: MAP_HEIGHT - 280 },
      { x: 280, y: MAP_HEIGHT - 320 },
      // Top lane (left side going up)
      { x: 280, y: MAP_HEIGHT - 550 },
      { x: 280, y: MAP_HEIGHT - 900 },
      { x: 280, y: MAP_HEIGHT - 1300 },
      // Mid lane
      { x: 550, y: MAP_HEIGHT - 550 },
      { x: 900, y: MAP_HEIGHT - 900 },
      { x: 1250, y: MAP_HEIGHT - 1250 },
      // Bot lane (bottom going right)
      { x: 550, y: MAP_HEIGHT - 280 },
      { x: 900, y: MAP_HEIGHT - 280 },
      { x: 1300, y: MAP_HEIGHT - 280 },
    ]

    blueTowers.forEach(pos => {
      this.add.image(pos.x, pos.y, 'tower-blue').setDepth(3)
    })

    // Red towers
    const redTowers = [
      // Nexus towers
      { x: MAP_WIDTH - 320, y: 280 },
      { x: MAP_WIDTH - 280, y: 320 },
      // Top lane (top going left)
      { x: MAP_WIDTH - 550, y: 280 },
      { x: MAP_WIDTH - 900, y: 280 },
      { x: MAP_WIDTH - 1300, y: 280 },
      // Mid lane
      { x: MAP_WIDTH - 550, y: 550 },
      { x: MAP_WIDTH - 900, y: 900 },
      { x: MAP_WIDTH - 1250, y: 1250 },
      // Bot lane (right side going down)
      { x: MAP_WIDTH - 280, y: 550 },
      { x: MAP_WIDTH - 280, y: 900 },
      { x: MAP_WIDTH - 280, y: 1300 },
    ]

    redTowers.forEach(pos => {
      this.add.image(pos.x, pos.y, 'tower-red').setDepth(3)
    })

    // Blue inhibitors
    const blueInhibitors = [
      { x: 380, y: MAP_HEIGHT - 420 }, // Top
      { x: 450, y: MAP_HEIGHT - 450 }, // Mid
      { x: 420, y: MAP_HEIGHT - 380 }, // Bot
    ]

    blueInhibitors.forEach(pos => {
      this.add.image(pos.x, pos.y, 'inhibitor-blue').setDepth(3)
    })

    // Red inhibitors
    const redInhibitors = [
      { x: MAP_WIDTH - 420, y: 380 }, // Top
      { x: MAP_WIDTH - 450, y: 450 }, // Mid
      { x: MAP_WIDTH - 380, y: 420 }, // Bot
    ]

    redInhibitors.forEach(pos => {
      this.add.image(pos.x, pos.y, 'inhibitor-red').setDepth(3)
    })
  }

  createObjectives() {
    // Dragon pit - on the river, bottom-left side of center
    // In the reference, it's around (0.35, 0.55) of the map
    const dragonX = MAP_WIDTH * 0.35
    const dragonY = MAP_HEIGHT * 0.55
    this.add.image(dragonX, dragonY, 'pit').setDepth(1)
    this.add.image(dragonX, dragonY, 'dragon').setDepth(2)

    // Baron pit - on the river, top-right side of center
    // In the reference, it's around (0.65, 0.45) of the map
    const baronX = MAP_WIDTH * 0.65
    const baronY = MAP_HEIGHT * 0.45
    this.add.image(baronX, baronY, 'pit').setDepth(1)
    this.add.image(baronX, baronY, 'baron').setDepth(2)
  }

  createMinimap() {
    const gameWidth = this.scale.width
    const gameHeight = this.scale.height

    // Add minimap background (fixed to camera)
    this.minimapBg = this.add.image(
      gameWidth - MINIMAP_SIZE / 2 - MINIMAP_MARGIN,
      gameHeight - MINIMAP_SIZE / 2 - MINIMAP_MARGIN,
      'minimap-bg'
    )
    this.minimapBg.setScrollFactor(0)
    this.minimapBg.setDepth(100)

    // Create minimap camera
    this.minimapCamera = this.cameras.add(
      gameWidth - MINIMAP_SIZE - MINIMAP_MARGIN,
      gameHeight - MINIMAP_SIZE - MINIMAP_MARGIN,
      MINIMAP_SIZE,
      MINIMAP_SIZE
    )

    // Configure minimap camera to show entire map
    this.minimapCamera.setBounds(0, 0, MAP_WIDTH, MAP_HEIGHT)
    this.minimapCamera.setZoom(MINIMAP_SIZE / MAP_WIDTH)
    this.minimapCamera.setScroll(0, 0)
    this.minimapCamera.setBackgroundColor(0x1a2a3a)

    // Ignore the minimap background in the minimap camera
    this.minimapCamera.ignore(this.minimapBg)

    // Add champion marker that's visible on minimap
    this.championMarker = this.add.sprite(
      this.champion.x,
      this.champion.y,
      'champion-marker'
    )
    this.championMarker.setDepth(50)
    this.championMarker.setScale(8)

    // Hide marker from main camera
    this.cameras.main.ignore(this.championMarker)

    // Add border frame (fixed to camera)
    this.minimapBorder = this.add.graphics()
    this.minimapBorder.lineStyle(2, 0xc9aa71, 1)
    this.minimapBorder.strokeRect(
      gameWidth - MINIMAP_SIZE - MINIMAP_MARGIN,
      gameHeight - MINIMAP_SIZE - MINIMAP_MARGIN,
      MINIMAP_SIZE,
      MINIMAP_SIZE
    )
    this.minimapBorder.setScrollFactor(0)
    this.minimapBorder.setDepth(101)

    this.minimapCamera.ignore(this.minimapBorder)

    // Add label
    this.minimapLabel = this.add.text(
      gameWidth - MINIMAP_SIZE / 2 - MINIMAP_MARGIN,
      gameHeight - MINIMAP_SIZE - MINIMAP_MARGIN - 18,
      'MINIMAP',
      {
        fontSize: '12px',
        color: '#c9aa71',
        fontFamily: 'Arial',
      }
    ).setOrigin(0.5)
    this.minimapLabel.setScrollFactor(0)
    this.minimapLabel.setDepth(101)
    this.minimapCamera.ignore(this.minimapLabel)
  }

  createClickIndicator(x: number, y: number) {
    const indicator = this.add.graphics()
    indicator.lineStyle(2, 0x00ff00, 1)
    indicator.strokeCircle(0, 0, 20)
    indicator.setPosition(x, y)
    indicator.setDepth(5)

    this.tweens.add({
      targets: indicator,
      alpha: 0,
      scale: 1.5,
      duration: 400,
      onComplete: () => indicator.destroy(),
    })
  }

  moveTo(x: number, y: number) {
    this.targetX = Phaser.Math.Clamp(x, 50, MAP_WIDTH - 50)
    this.targetY = Phaser.Math.Clamp(y, 50, MAP_HEIGHT - 50)
    this.isMoving = true
  }

  update(_time: number, _delta: number) {
    this.updateMovement()
    this.updateAnimation()

    if (this.championMarker) {
      this.championMarker.setPosition(this.champion.x, this.champion.y)
    }
  }

  updateMovement() {
    const body = this.champion.body as Phaser.Physics.Arcade.Body
    const dx = this.targetX - this.champion.x
    const dy = this.targetY - this.champion.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance > 5) {
      this.isMoving = true
      body.setVelocity(
        (dx / distance) * this.moveSpeed,
        (dy / distance) * this.moveSpeed
      )

      if (dx < 0) {
        this.champion.setFlipX(true)
      } else {
        this.champion.setFlipX(false)
      }
    } else {
      this.isMoving = false
      body.setVelocity(0, 0)
    }
  }

  updateAnimation() {
    if (this.isMoving) {
      this.walkTimer++
      if (this.walkTimer > 8) {
        this.walkTimer = 0
        this.walkFrame = (this.walkFrame + 1) % 2
        this.champion.setTexture(
          this.walkFrame === 0 ? 'champion-walk1' : 'champion-walk2'
        )
      }
    } else {
      this.champion.setTexture('champion-idle')
    }
  }
}
