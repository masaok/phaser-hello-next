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
  levelWidth: number = 3200
  isLevelComplete: boolean = false

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

    // First pipe
    this.createPipe(450, 2)

    // First Goomba
    this.createGoomba(350, 500)

    // === Section 2: Platforms ===

    // Brick platform
    for (let i = 0; i < 5; i++) {
      this.createBrick(550 + i * 32, 400)
    }
    this.createQuestionBlock(614, 400, 'coin')

    // Goombas
    this.createGoomba(580, 500)
    this.createGoomba(650, 500)

    // Second pipe (taller)
    this.createPipe(720, 3)

    // === Section 3: Gap section ===

    // Platform over first pit
    for (let i = 0; i < 3; i++) {
      this.createBrick(832 + i * 32, 368)
    }

    // Goombas after pit
    this.createGoomba(950, 500)
    this.createGoomba(1000, 500)

    // Stair blocks
    this.createStairs(1050, 520, 4, 'up')

    // === Section 4: More challenges ===

    // Question block row
    this.createBrick(1200, 400)
    this.createQuestionBlock(1232, 400, 'coin')
    this.createQuestionBlock(1264, 400, 'mushroom')
    this.createBrick(1296, 400)

    // Elevated platform
    for (let i = 0; i < 6; i++) {
      this.createBrick(1350 + i * 32, 336)
    }

    // Goombas on platform
    this.createGoomba(1400, 300)
    this.createGoomba(1480, 300)

    // Third pipe
    this.createPipe(1550, 3)

    // === Section 5: Second pit area ===

    // Platform over second pit
    for (let i = 0; i < 4; i++) {
      this.createBrick(1632 + i * 32, 400)
    }
    this.createQuestionBlock(1696, 400, 'coin')

    // === Section 6: Staircase to flag ===

    // Stair up
    this.createStairs(1900, 520, 4, 'up')

    // Flat top
    for (let i = 0; i < 3; i++) {
      this.platforms.create(2028 + i * 32 + 16, 392, 'ground')
    }

    // Stair down
    this.createStairs(2100, 520, 4, 'down')

    // Final stretch
    this.createGoomba(2200, 500)
    this.createGoomba(2280, 500)
    this.createGoomba(2360, 500)

    // More question blocks
    this.createQuestionBlock(2500, 400, 'coin')
    this.createBrick(2532, 400)
    this.createQuestionBlock(2564, 400, 'coin')

    // Large staircase to flag
    this.createStairs(2700, 520, 8, 'up')

    // Final pipe before flag
    this.createPipe(2950, 3)

    // Flag pole
    this.flag = this.physics.add.sprite(3100, 360, 'flag')
    this.flag.setOrigin(0.5, 1)
    this.flag.setImmovable(true)
    const flagBody = this.flag.body as Phaser.Physics.Arcade.Body
    flagBody.setAllowGravity(false)
    flagBody.setSize(20, 300)

    // Castle (simple representation)
    this.add.rectangle(3150, 470, 80, 100, 0x8b4513)
    this.add.rectangle(3150, 400, 40, 40, 0x8b4513)
    this.add.rectangle(3150, 440, 20, 20, 0x000000) // Door
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

    // Create a single pipe rectangle
    const pipe = this.add.rectangle(x, groundY, 64, pipeHeight, 0x00aa00)
    pipe.setOrigin(0.5, 1)
    this.physics.add.existing(pipe, true)
    this.platforms.add(pipe)

    // Pipe rim (top part, slightly wider)
    const rim = this.add.rectangle(x, groundY - pipeHeight, 72, 16, 0x00cc00)
    rim.setOrigin(0.5, 1)
    this.physics.add.existing(rim, true)
    this.platforms.add(rim)

    // Highlight
    const highlight = this.add.rectangle(x - 24, groundY - pipeHeight / 2, 8, pipeHeight - 16, 0x00ff00)
    highlight.setOrigin(0.5, 0.5)

    // Dark side
    const darkSide = this.add.rectangle(x + 24, groundY - pipeHeight / 2, 8, pipeHeight - 16, 0x008800)
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
  }

  handleLevelComplete(
    mario: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile,
  ) {
    if (this.isLevelComplete) return

    this.isLevelComplete = true
    const m = mario as Mario

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
