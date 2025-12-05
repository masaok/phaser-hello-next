import * as Phaser from 'phaser'
import Mario from '../gameobjects/Mario'
import Goomba from '../gameobjects/Goomba'
import QuestionBlock from '../gameobjects/QuestionBlock'
import Brick from '../gameobjects/Brick'

export default class GameScene extends Phaser.Scene {
  mario!: Mario
  platforms!: Phaser.Physics.Arcade.StaticGroup
  goombas!: Phaser.Physics.Arcade.Group
  questionBlocks: QuestionBlock[] = []
  bricks: Brick[] = []
  coins!: Phaser.Physics.Arcade.Group
  mushrooms!: Phaser.Physics.Arcade.Group
  flag!: Phaser.Physics.Arcade.Sprite
  scoreText!: Phaser.GameObjects.Text
  coinsText!: Phaser.GameObjects.Text
  levelWidth: number = 3800
  isLevelComplete: boolean = false

  // Sounds
  jumpSound!: Phaser.Sound.BaseSound
  coinSound!: Phaser.Sound.BaseSound
  deadSound!: Phaser.Sound.BaseSound
  themeMusic!: Phaser.Sound.BaseSound

  constructor() {
    super({ key: 'GameScene' })
  }

  create() {
    // Initialize registry
    this.registry.set('score', 0)
    this.registry.set('coins', 0)

    // Reset state
    this.questionBlocks = []
    this.bricks = []
    this.isLevelComplete = false

    // Load sounds
    this.jumpSound = this.sound.add('jump')
    this.coinSound = this.sound.add('coin')
    this.deadSound = this.sound.add('dead')
    this.themeMusic = this.sound.add('theme', { loop: true, volume: 0.5 })

    // Set world bounds
    this.physics.world.setBounds(0, 0, this.levelWidth, 600)

    // Sky background
    this.cameras.main.setBackgroundColor(0x5c94fc)

    // Create groups
    this.platforms = this.physics.add.staticGroup()
    this.goombas = this.physics.add.group()
    this.coins = this.physics.add.group()
    this.mushrooms = this.physics.add.group()

    // Build the level
    this.buildLevel()

    // Create Mario
    this.mario = new Mario(this, 100, 500)

    // Camera follows Mario
    this.cameras.main.setBounds(0, 0, this.levelWidth, 600)
    this.cameras.main.startFollow(this.mario, true, 0.1, 0.1)

    // Collisions
    this.physics.add.collider(this.mario, this.platforms)
    this.physics.add.collider(this.goombas, this.platforms)
    this.physics.add.collider(this.mushrooms, this.platforms)

    // Mario vs Goombas
    this.physics.add.overlap(
      this.mario,
      this.goombas,
      this.handleMarioGoombaCollision as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this
    )

    // Mario vs Mushrooms
    this.physics.add.overlap(
      this.mario,
      this.mushrooms,
      this.handleMarioMushroomCollision as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this
    )

    // Mario vs Flag
    this.physics.add.overlap(
      this.mario,
      this.flag,
      this.handleLevelComplete as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this
    )

    // UI
    this.createUI()

    // Start music
    this.themeMusic.play()

    // Fade in
    this.cameras.main.fadeIn(500)
  }

  buildLevel() {
    // Ground - full level width
    for (let x = 0; x < this.levelWidth; x += 32) {
      // Gap in ground (pit)
      if ((x >= 800 && x < 896) || (x >= 1600 && x < 1728)) {
        continue
      }
      this.platforms.create(x + 16, 584, 'ground')
      this.platforms.create(x + 16, 552, 'ground')
    }

    // Decorative clouds
    this.add.image(200, 80, 'cloud')
    this.add.image(600, 60, 'cloud')
    this.add.image(1000, 90, 'cloud')
    this.add.image(1500, 70, 'cloud')
    this.add.image(2000, 80, 'cloud')
    this.add.image(2500, 60, 'cloud')
    this.add.image(3000, 90, 'cloud')

    // Decorative bushes
    this.add.image(300, 520, 'bush')
    this.add.image(700, 520, 'bush')
    this.add.image(1200, 520, 'bush')
    this.add.image(1900, 520, 'bush')
    this.add.image(2400, 520, 'bush')

    // === Section 1: Start area ===

    // Question blocks with coin
    this.createQuestionBlock(256, 400, 'coin')
    this.createBrick(288, 400)
    this.createQuestionBlock(320, 400, 'mushroom')
    this.createBrick(352, 400)
    this.createQuestionBlock(384, 400, 'coin')

    // Hidden question block higher up
    this.createQuestionBlock(320, 272, 'coin')

    // First pipe (more space after blocks)
    this.createPipe(520, 2)

    // First Goomba
    this.createGoomba(350, 500)

    // === Section 2: Platforms ===

    // Brick platform (more space after pipe)
    for (let i = 0; i < 5; i++) {
      this.createBrick(650 + i * 32, 400)
    }
    this.createQuestionBlock(714, 400, 'coin')

    // Goombas
    this.createGoomba(680, 500)
    this.createGoomba(750, 500)

    // Second pipe (taller, more space)
    this.createPipe(880, 3)

    // === Section 3: Gap section ===

    // Platform over first pit (adjusted for new spacing)
    for (let i = 0; i < 3; i++) {
      this.createBrick(1000 + i * 32, 368)
    }

    // Goombas after pit
    this.createGoomba(1120, 500)
    this.createGoomba(1180, 500)

    // Stair blocks
    this.createStairs(1250, 520, 4, 'up')

    // === Section 4: More challenges ===

    // Question block row (with more space)
    this.createBrick(1450, 400)
    this.createQuestionBlock(1482, 400, 'coin')
    this.createQuestionBlock(1514, 400, 'mushroom')
    this.createBrick(1546, 400)

    // Elevated platform
    for (let i = 0; i < 6; i++) {
      this.createBrick(1650 + i * 32, 336)
    }

    // Goombas on platform
    this.createGoomba(1700, 300)
    this.createGoomba(1780, 300)

    // Third pipe (more space)
    this.createPipe(1950, 3)

    // === Section 5: Second pit area ===

    // Platform over second pit
    for (let i = 0; i < 4; i++) {
      this.createBrick(2100 + i * 32, 400)
    }
    this.createQuestionBlock(2164, 400, 'coin')

    // === Section 6: Staircase to flag ===

    // Stair up
    this.createStairs(2350, 520, 4, 'up')

    // Flat top
    for (let i = 0; i < 3; i++) {
      this.platforms.create(2478 + i * 32 + 16, 392, 'ground')
    }

    // Stair down
    this.createStairs(2550, 520, 4, 'down')

    // Final stretch
    this.createGoomba(2650, 500)
    this.createGoomba(2730, 500)
    this.createGoomba(2810, 500)

    // More question blocks
    this.createQuestionBlock(2900, 400, 'coin')
    this.createBrick(2932, 400)
    this.createQuestionBlock(2964, 400, 'coin')

    // Large staircase to flag
    this.createStairs(3100, 520, 8, 'up')

    // Final pipe before flag
    this.createPipe(3400, 3)

    // Flag pole
    this.flag = this.physics.add.sprite(3550, 360, 'flag')
    this.flag.setOrigin(0.5, 1)
    this.flag.setImmovable(true)
    const flagBody = this.flag.body as Phaser.Physics.Arcade.Body
    flagBody.setAllowGravity(false)
    flagBody.setSize(20, 300)

    // Castle (simple representation)
    this.add.rectangle(3600, 470, 80, 100, 0x8b4513)
    this.add.rectangle(3600, 400, 40, 40, 0x8b4513)
    this.add.rectangle(3600, 440, 20, 20, 0x000000) // Door
  }

  createQuestionBlock(x: number, y: number, contents: 'coin' | 'mushroom') {
    const block = new QuestionBlock(this, x, y, contents)
    this.questionBlocks.push(block)
    this.platforms.add(block)
  }

  createBrick(x: number, y: number) {
    const brick = new Brick(this, x, y)
    this.bricks.push(brick)
    this.platforms.add(brick)
  }

  createGoomba(x: number, y: number) {
    const goomba = new Goomba(this, x, y)
    this.goombas.add(goomba)
  }

  createPipe(x: number, height: number) {
    // Ground top is at y=536 (ground blocks at 552 and 584)
    const groundY = 536
    const pipeHeight = height * 32

    // Create a single pipe rectangle (main collision body)
    const pipe = this.add.rectangle(x, groundY, 56, pipeHeight, 0x00aa00)
    pipe.setOrigin(0.5, 1)
    this.physics.add.existing(pipe, true)
    this.platforms.add(pipe)

    // Pipe rim (top part, slightly wider) - visual only, no collision
    const rim = this.add.rectangle(x, groundY - pipeHeight, 64, 12, 0x00cc00)
    rim.setOrigin(0.5, 1)

    // Highlight
    const highlight = this.add.rectangle(x - 20, groundY - pipeHeight / 2, 6, pipeHeight - 12, 0x00ff00)
    highlight.setOrigin(0.5, 0.5)

    // Dark side
    const darkSide = this.add.rectangle(x + 20, groundY - pipeHeight / 2, 6, pipeHeight - 12, 0x008800)
    darkSide.setOrigin(0.5, 0.5)
  }

  createStairs(startX: number, startY: number, height: number, direction: 'up' | 'down') {
    for (let row = 0; row < height; row++) {
      const blocksInRow = row + 1
      for (let col = 0; col < blocksInRow; col++) {
        const x = direction === 'up'
          ? startX + row * 32
          : startX + (height - 1 - row) * 32
        const y = startY - col * 32
        this.platforms.create(x + 16, y - 16, 'ground')
      }
    }
  }

  createUI() {
    // Score display
    this.scoreText = this.add.text(16, 16, 'SCORE: 0', {
      fontSize: '20px',
      fontFamily: 'Arial',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 3,
    })
    this.scoreText.setScrollFactor(0)

    // Coins display
    this.coinsText = this.add.text(16, 44, 'COINS: 0', {
      fontSize: '20px',
      fontFamily: 'Arial',
      color: '#ffcc00',
      stroke: '#000000',
      strokeThickness: 3,
    })
    this.coinsText.setScrollFactor(0)
  }

  update() {
    if (this.isLevelComplete) return

    // Update Mario
    this.mario.update()

    // Update Goombas
    this.goombas.children.iterate((goomba) => {
      if (goomba) {
        (goomba as Goomba).update()
      }
      return true
    })

    // Update Question Blocks
    this.questionBlocks.forEach((block) => block.update())

    // Check for block hits from below
    this.checkBlockHits()

    // Update UI
    this.scoreText.setText('SCORE: ' + this.registry.get('score'))
    this.coinsText.setText('COINS: ' + this.registry.get('coins'))

    // Check if Mario fell into pit
    if (this.mario.y > 650) {
      this.mario.die()
    }

    // Check mushroom collection
    this.mushrooms.children.iterate((mushroom) => {
      if (mushroom && (mushroom as Phaser.Physics.Arcade.Sprite).y > 650) {
        mushroom.destroy()
      }
      return true
    })
  }

  checkBlockHits() {
    const marioBody = this.mario.body as Phaser.Physics.Arcade.Body

    // Check if Mario is hitting blocks from below
    if (marioBody.velocity.y < 0) {
      // Question blocks
      this.questionBlocks.forEach((block) => {
        if (!block.isHit && this.checkHeadCollision(this.mario, block)) {
          block.hit(this, this.coins, this.mushrooms)
          this.addScore(200)
        }
      })

      // Bricks
      this.bricks.forEach((brick) => {
        if (!brick.isDestroyed && this.checkHeadCollision(this.mario, brick)) {
          brick.hit(this, this.mario.isBig)

          // Check if any goombas are on top of the brick
          this.goombas.children.iterate((goomba) => {
            if (goomba) {
              const g = goomba as Goomba
              if (
                Math.abs(g.x - brick.x) < 40 &&
                g.y < brick.y &&
                g.y > brick.y - 60
              ) {
                g.hitFromBelow()
                this.addScore(100)
              }
            }
            return true
          })
        }
      })
    }
  }

  checkHeadCollision(mario: Mario, block: Phaser.Physics.Arcade.Sprite): boolean {
    const marioTop = mario.y - mario.displayHeight
    const blockBottom = block.y + block.displayHeight / 2

    return (
      Math.abs(mario.x - block.x) < 20 &&
      marioTop <= blockBottom &&
      marioTop >= blockBottom - 10
    )
  }

  handleMarioGoombaCollision(
    mario: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile,
    goomba: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
  ) {
    const m = mario as Mario
    const g = goomba as Goomba

    if (g.isDead) return

    const marioBody = m.body as Phaser.Physics.Arcade.Body

    // Check if Mario is stomping the goomba
    if (marioBody.velocity.y > 0 && m.y < g.y - 10) {
      g.stomp()
      m.bounce()
      this.addScore(100)
      this.coinSound.play() // Use coin sound for stomp
    } else {
      // Mario takes damage
      m.takeDamage()
    }
  }

  handleMarioMushroomCollision(
    mario: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile,
    mushroom: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
  ) {
    const m = mario as Mario
    const mush = mushroom as Phaser.Physics.Arcade.Sprite

    m.powerUp()
    mush.destroy()
    this.addScore(1000)
    this.coinSound.play() // Power-up sound
  }

  handleLevelComplete(
    mario: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile,
  ) {
    if (this.isLevelComplete) return

    this.isLevelComplete = true
    const m = mario as Mario

    // Stop music
    this.themeMusic.stop()

    // Stop Mario
    const marioBody = m.body as Phaser.Physics.Arcade.Body
    marioBody.setVelocity(0, 0)
    marioBody.setAcceleration(0, 0)

    // Victory animation
    this.add
      .text(this.cameras.main.scrollX + 400, 200, 'LEVEL COMPLETE!', {
        fontSize: '48px',
        fontFamily: 'Arial',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 6,
      })
      .setOrigin(0.5)

    // Calculate bonus
    const bonus = 5000
    this.addScore(bonus)

    this.add
      .text(this.cameras.main.scrollX + 400, 280, `BONUS: ${bonus}`, {
        fontSize: '32px',
        fontFamily: 'Arial',
        color: '#ffcc00',
        stroke: '#000000',
        strokeThickness: 4,
      })
      .setOrigin(0.5)

    // Return to menu after delay
    this.time.delayedCall(3000, () => {
      this.scene.start('MenuScene')
    })
  }

  addScore(points: number) {
    const currentScore = this.registry.get('score') || 0
    this.registry.set('score', currentScore + points)
  }
}
