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
    // Create the large map
    this.createMap()

    // Create champion in center of map
    const startX = MAP_WIDTH / 2
    const startY = MAP_HEIGHT / 2
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
      // Convert screen coordinates to world coordinates
      const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y)
      this.moveTo(worldPoint.x, worldPoint.y)
      this.createClickIndicator(worldPoint.x, worldPoint.y)
    })

    // Prevent context menu
    this.game.canvas.addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })
  }

  createMap() {
    // Create ground layer with grass
    const tilesX = Math.ceil(MAP_WIDTH / TILE_SIZE)
    const tilesY = Math.ceil(MAP_HEIGHT / TILE_SIZE)

    for (let y = 0; y < tilesY; y++) {
      for (let x = 0; x < tilesX; x++) {
        const tileX = x * TILE_SIZE + TILE_SIZE / 2
        const tileY = y * TILE_SIZE + TILE_SIZE / 2

        // Default grass
        let texture = 'grass'

        // Create river through middle
        if (Math.abs(x - tilesX / 2) < 2 && y > 5 && y < tilesY - 5) {
          texture = 'water'
        }

        // Create lanes (paths)
        // Top lane
        if (y < 5 && (x < 8 || x > tilesX - 8)) {
          texture = 'lane'
        }
        // Bottom lane
        if (y > tilesY - 6 && (x < 8 || x > tilesX - 8)) {
          texture = 'lane'
        }
        // Side lanes connecting
        if ((x < 5 || x > tilesX - 6) && y >= 5 && y <= tilesY - 6) {
          texture = 'lane'
        }
        // Mid lane (diagonal-ish)
        const midStart = 8
        const midEnd = tilesX - 8
        if (x >= midStart && x <= midEnd) {
          const progress = (x - midStart) / (midEnd - midStart)
          const expectedY = 8 + progress * (tilesY - 16)
          if (Math.abs(y - expectedY) < 2) {
            texture = 'lane'
          }
        }

        this.add.image(tileX, tileY, texture).setDepth(0)
      }
    }

    // Add bases
    const blueBase = this.add.image(128, MAP_HEIGHT - 128, 'base')
    blueBase.setTint(0x4444ff)
    blueBase.setDepth(1)

    const redBase = this.add.image(MAP_WIDTH - 128, 128, 'base')
    redBase.setTint(0xff4444)
    redBase.setDepth(1)

    // Add towers along lanes
    const towerPositions = [
      // Blue side towers
      { x: 300, y: MAP_HEIGHT - 200, color: 0x4444ff },
      { x: 200, y: MAP_HEIGHT - 400, color: 0x4444ff },
      { x: 400, y: MAP_HEIGHT - 150, color: 0x4444ff },
      // Red side towers
      { x: MAP_WIDTH - 300, y: 200, color: 0xff4444 },
      { x: MAP_WIDTH - 200, y: 400, color: 0xff4444 },
      { x: MAP_WIDTH - 400, y: 150, color: 0xff4444 },
      // Mid towers
      { x: 1000, y: 2200, color: 0x4444ff },
      { x: 2200, y: 1000, color: 0xff4444 },
    ]

    towerPositions.forEach(pos => {
      const tower = this.add.image(pos.x, pos.y, 'tower')
      tower.setTint(pos.color)
      tower.setDepth(2)
    })

    // Add trees scattered around
    const treePositions = [
      { x: 500, y: 500 }, { x: 600, y: 700 }, { x: 800, y: 400 },
      { x: 2600, y: 500 }, { x: 2700, y: 700 }, { x: 2400, y: 400 },
      { x: 500, y: 2700 }, { x: 700, y: 2600 }, { x: 400, y: 2500 },
      { x: 2600, y: 2700 }, { x: 2700, y: 2500 }, { x: 2800, y: 2600 },
      // Jungle areas
      { x: 900, y: 1200 }, { x: 1000, y: 1400 }, { x: 1100, y: 1100 },
      { x: 2100, y: 1800 }, { x: 2200, y: 2000 }, { x: 2300, y: 1900 },
      { x: 1200, y: 2100 }, { x: 1400, y: 2200 }, { x: 1100, y: 2300 },
      { x: 1800, y: 900 }, { x: 2000, y: 1000 }, { x: 1900, y: 1100 },
    ]

    treePositions.forEach(pos => {
      const tree = this.add.image(pos.x, pos.y, 'tree')
      tree.setDepth(3)
    })

    // Add rocks near river
    for (let i = 0; i < 8; i++) {
      const rockY = 400 + i * 300
      this.add.image(MAP_WIDTH / 2 - 100, rockY, 'rock').setDepth(2)
      this.add.image(MAP_WIDTH / 2 + 100, rockY + 50, 'rock').setDepth(2)
    }
  }

  createMinimap() {
    const gameWidth = Number(this.game.config.width)
    const gameHeight = Number(this.game.config.height)

    // Add minimap background (fixed to camera)
    const minimapBg = this.add.image(
      gameWidth - MINIMAP_SIZE / 2 - MINIMAP_MARGIN,
      gameHeight - MINIMAP_SIZE / 2 - MINIMAP_MARGIN,
      'minimap-bg'
    )
    minimapBg.setScrollFactor(0)
    minimapBg.setDepth(100)

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
    this.minimapCamera.setBackgroundColor(0x1a1a2e)

    // Ignore the minimap background in the minimap camera
    this.minimapCamera.ignore(minimapBg)

    // Add champion marker that's visible on minimap
    this.championMarker = this.add.sprite(
      this.champion.x,
      this.champion.y,
      'champion-marker'
    )
    this.championMarker.setDepth(50)
    this.championMarker.setScale(8) // Scale up so it's visible on minimap

    // Hide marker from main camera (it would be too big)
    this.cameras.main.ignore(this.championMarker)

    // Add border frame (fixed to camera)
    const borderGraphics = this.add.graphics()
    borderGraphics.lineStyle(3, 0x6a6aaa, 1)
    borderGraphics.strokeRect(
      gameWidth - MINIMAP_SIZE - MINIMAP_MARGIN,
      gameHeight - MINIMAP_SIZE - MINIMAP_MARGIN,
      MINIMAP_SIZE,
      MINIMAP_SIZE
    )
    borderGraphics.setScrollFactor(0)
    borderGraphics.setDepth(101)

    // Ignore border from minimap
    this.minimapCamera.ignore(borderGraphics)

    // Add label
    const label = this.add.text(
      gameWidth - MINIMAP_SIZE / 2 - MINIMAP_MARGIN,
      gameHeight - MINIMAP_SIZE - MINIMAP_MARGIN - 20,
      'MINIMAP',
      {
        fontSize: '14px',
        color: '#8888aa',
        fontFamily: 'Arial',
      }
    ).setOrigin(0.5)
    label.setScrollFactor(0)
    label.setDepth(101)
    this.minimapCamera.ignore(label)
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
    // Clamp to map bounds
    this.targetX = Phaser.Math.Clamp(x, 50, MAP_WIDTH - 50)
    this.targetY = Phaser.Math.Clamp(y, 50, MAP_HEIGHT - 50)
    this.isMoving = true
  }

  update(_time: number, _delta: number) {
    this.updateMovement()
    this.updateAnimation()

    // Update minimap marker position
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

      // Face direction
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
