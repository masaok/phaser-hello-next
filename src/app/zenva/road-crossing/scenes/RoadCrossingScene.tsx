// src/phaser/scene.ts
import { Scene, VERSION } from 'phaser'

class RoadCrossingScene extends Scene {
  enemy1: Phaser.GameObjects.Sprite | undefined
  physicsEnemy: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined

  goal: Phaser.GameObjects.Sprite | undefined
  player: Phaser.GameObjects.Sprite | undefined
  playerSpeed: number

  cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined

  enemyMinSpeed: number
  enemyMaxSpeed: number

  enemyMinPctY: number
  enemyMaxPctY: number

  enemyMinY: number
  enemyMaxY: number

  // Enemy X
  enemyMinPctX: number
  enemyMaxPctX: number
  enemyMinX: number
  enemyMaxX: number

  constructor() {
    super('hello-world')
  }

  init() {
    this.playerSpeed = 3

    // 06 - Enemy
    // enemy speed
    this.enemyMinSpeed = 2
    this.enemyMaxSpeed = 4.5

    // Y boundaries (percentage)
    this.enemyMinPctY = 0.25
    this.enemyMaxPctY = 0.75

    // Y boundaries (absolute)
    this.enemyMinY = 0.25
    this.enemyMaxY = 0.75

    // X boundaries (percentage)
    this.enemyMinPctX = 0.25
    this.enemyMaxPctX = 0.25

    // X boundaries (absolute)
    this.enemyMinX = 0.25
    this.enemyMaxX = 0.75
  }

  preload() {
    // 02 - Rendering Sprites
    this.load.image('background', '/zenva/assets/background.png')
    this.load.image('player', '/zenva/assets/player.png')

    // 03 - Scaling and Flipping
    this.load.image('enemy', 'assets/dragon.png')

    // 05 - Player
    this.load.image('goal', 'assets/treasure.png')
  }

  create() {
    this.add.text(100, 100, 'Hello, World! Phaser v' + VERSION, { color: '#0f0' })

    // Get the viewport dimensions
    const viewportWidth = this.sys.game.config.width as number
    const viewportHeight = this.sys.game.config.height as number

    // create bg sprite
    let bg = this.add.sprite(0, 0, 'background')

    // Get the sprite's original dimensions
    const spriteWidth = bg.width
    const spriteHeight = bg.height

    // Calculate the scale factor to maintain aspect ratio
    const scaleX = viewportWidth / spriteWidth
    const scaleY = viewportHeight / spriteHeight
    const scale = Math.min(scaleX, scaleY)

    // Apply the scale to the sprite
    bg.setScale(scale)

    // Center the sprite in the viewport
    bg.setPosition(viewportWidth / 2, viewportHeight / 2)

    let gameW = this.sys.game.config.width
    let gameH = this.sys.game.config.height

    console.log(gameW, gameH)

    console.log(bg)
    console.log(this)

    // 03 - Scaling and Flipping
    // change the origin to the top-left corner (nope, shifts the bg to the bottom right)
    // bg.setOrigin(0, 0)

    // create the player
    this.player = this.add.sprite(70, 180, 'player')

    // set the origin of the player to its center
    this.player.setOrigin(0.5, 0.5)

    // we are reducing the width by 50%, and we are doubling the height
    this.player.setScale(0.5)

    // ensure the player is within the visible area
    this.player.setPosition(viewportWidth * 0.1, viewportHeight / 2)

    // 03 - Scaling and Flipping
    // create an enemy
    let enemy1 = this.add.sprite(250, 180, 'enemy')

    // set the origin of the enemy to its center
    enemy1.setOrigin(0.5, 0.5)

    // ensure the enemy is within the visible area
    enemy1.setPosition(viewportWidth / 2 + 100, viewportHeight / 2)

    // set the depth of the enemy to ensure it is rendered on top of other elements
    enemy1.setDepth(1)

    // create a second enemy
    let enemy2 = this.add.sprite(450, 180, 'enemy')
    enemy2.setPosition(viewportWidth / 2 + 200, viewportHeight / 2)
    // enemy2.displayWidth = 300

    // flip
    enemy1.flipX = true
    enemy2.flipX = true

    // create an enemy
    this.enemy1 = this.add.sprite(250, 180, 'enemy')
    this.enemy1.setPosition(viewportWidth / 2 + 100, viewportHeight / 2 + 100)
    // this.enemy1.setScale(3)

    //this.enemy1.angle = 45;
    //this.enemy1.setAngle(45);

    //this.enemy1.setOrigin(0, 0);
    this.enemy1.setRotation(Math.PI / 4)

    console.log(this.enemy1)

    // 05 - Player
    this.goal = this.add.sprite(viewportWidth * 0.8, viewportHeight / 2, 'goal')
    this.goal.setScale(0.5)

    // Create cursor keys for arrow key input
    if (!this.input.keyboard) throw new Error('input.keyboard is undefined')
    this.cursors = this.input.keyboard.createCursorKeys()

    // 06 - Enemy
    // this.physics.add.existing(this.enemy1)
    // this.enemy1

    // Add a physics sprite
    // this.physicsEnemy = this.physics.add.sprite(viewportWidth * 0.2, viewportHeight * 0.3, 'enemy')
    const bgTopLeftX = bg.x - bg.displayWidth / 2
    const bgTopLeftY = bg.y - bg.displayHeight / 2

    this.enemyMinY = bgTopLeftY + bg.displayHeight * this.enemyMinPctY
    this.enemyMaxY = bgTopLeftY + bg.displayHeight * this.enemyMaxPctY

    this.enemyMinX = bgTopLeftX + bg.displayWidth * this.enemyMaxPctX

    console.log({
      viewportHeight,
      viewportWidth,
      bgTopLeftY,
      bgTopLeftX,
      bgHeight: bg.displayHeight,
      bgWidth: bg.displayWidth,
      bgX: bg.x,
      bgY: bg.y,
      enemyMinY: this.enemyMinY,
      enemyMaxY: this.enemyMaxY,
    })

    this.physicsEnemy = this.physics.add.sprite(this.enemyMinX, this.enemyMinY, 'enemy')

    this.physicsEnemy.setVelocity(this.enemyMinSpeed)
  }

  // this is called up to 60 times per second
  update() {
    //this.enemy1.x += 1;

    if (!this.enemy1) throw new Error('enemy1 is undefined')
    if (!this.player) throw new Error('player is undefined')
    if (!this.goal) throw new Error('goal is undefined')
    if (!this.cursors) throw new Error('cursors is undefined')
    if (!this.physicsEnemy) throw new Error('physicsEnemy undefined')

    // move the enemy

    this.enemy1.setAngle(this.enemy1.angle + 1)

    // // enemy movement
    this.physicsEnemy.y += this.physicsEnemy.body.velocity.y

    // // check we haven't passed min or max Y
    let conditionUp = this.physicsEnemy.body.velocity.y < 0 && this.physicsEnemy.y <= this.enemyMinY
    let conditionDown = this.physicsEnemy.body.velocity.y > 0 && this.physicsEnemy.y >= this.enemyMaxY

    // // if we passed the upper or lower limit, reverse
    if (conditionUp || conditionDown) {
      this.physicsEnemy.setVelocityY(this.physicsEnemy.body.velocity.y * -1)
    }

    // check if we've reached scale of 2
    if (this.player.scaleX < 2) {
      // make the player grow
      // this.player.scaleX += 0.01
      // this.player.scaleY += 0.01
    }

    // check for active input (left click / touch)
    if (this.input.activePointer.isDown) {
      // player walks
      this.player.x += this.playerSpeed
    }

    // Check for arrow key presses and move the player accordingly
    if (this.cursors.left.isDown) {
      this.player.x -= this.playerSpeed
    } else if (this.cursors.right.isDown) {
      this.player.x += this.playerSpeed
    }

    if (this.cursors.up.isDown) {
      this.player.y -= this.playerSpeed
    } else if (this.cursors.down.isDown) {
      this.player.y += this.playerSpeed
    }

    // treasure overlap check
    let playerRect = this.player.getBounds()
    let treasureRect = this.goal.getBounds()

    if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)) {
      console.log('reached goal!')

      // restart the Scene
      this.scene.restart()

      // make sure we leave this method
      return
    }
  }
}

export default RoadCrossingScene
