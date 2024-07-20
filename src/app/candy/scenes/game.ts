import BlockGroup from '../gameobjects/block_group'
import Exit from '../gameobjects/exit'

export default class Game extends Phaser.Scene {
  player: Phaser.GameObjects.Container | undefined
  score: number
  scoreText: string

  name: string
  number: number
  limitedTime: number

  width: number
  height: number
  center_width: number
  center_height: number

  solved: boolean
  totalMoves: number

  R: Phaser.Input.Keyboard.Key | undefined

  texts: Phaser.GameObjects.BitmapText[] | undefined
  movesText: Phaser.GameObjects.BitmapText | undefined
  winText: Phaser.GameObjects.BitmapText | undefined
  timerText: Phaser.GameObjects.BitmapText | undefined

  tileMap: Phaser.Tilemaps.Tilemap | undefined
  tileSetBg: Phaser.Tilemaps.Tileset | undefined | null
  tileSet: Phaser.Tilemaps.Tileset | undefined | null
  platform: Phaser.Tilemaps.TilemapLayer | undefined | null
  objectsLayer: Phaser.Tilemaps.ObjectLayer | undefined | null

  exits: Phaser.GameObjects.Group | undefined
  blocks: Phaser.GameObjects.Group | undefined

  activeBlock: Phaser.GameObjects.Container | undefined

  pointer: Phaser.Input.Pointer | undefined

  audios: Record<string, Phaser.Sound.BaseSound> | undefined

  constructor() {
    super({ key: 'game' })
    this.score = 0
    this.scoreText = ''

    this.name = ''
    this.number = 0
    this.limitedTime = 10

    this.width = 0
    this.height = 0
    this.center_width = 0
    this.center_height = 0

    this.solved = false

    this.totalMoves = 0
  }

  init(data: any) {
    this.name = data.name
    this.number = data.number || 0
    this.limitedTime = data.limitedTime || 10
  }

  preload() {}

  /*
  This method is called when the scene starts. We set the width and height of the scene, the center width and height, and the background color, and we disable the context menu of the mouse. And then we add the elements we need: maps with blocks, audio files, texts, and the pointer.
  */
  create() {
    this.width = Number(this.sys.game.config.width)
    this.height = Number(this.sys.game.config.height)
    this.center_width = this.width / 2
    this.center_height = this.height / 2
    this.cameras.main.setBackgroundColor(0x000000)
    this.input.mouse?.disableContextMenu()
    this.addPointer()

    this.addMap()
    this.addMoves()
    this.addRetry()

    this.loadAudios()
    this.showTexts()
    this.solved = false
  }

  /*
    We add the retry key to restart the scene.
  */
  addRetry() {
    this.R = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.R)
  }

  /*
  This method adds the moves text and the total moves.
  */
  addMoves() {
    this.movesText = this.add
      .bitmapText(this.center_width, 32, 'mario', '0', 30)
      .setOrigin(0.5)
      .setTint(0xffe066)
      .setDropShadow(3, 4, 0x75b947, 0.7)
    this.totalMoves = 0
  }

  /*
    It generates the map with the blocks and the exits. Depending on the number of the scene, it loads a different map.
  */
  addMap() {
    this.tileMap = this.make.tilemap({
      key: `scene${this.number}`,
      tileWidth: 32,
      tileHeight: 32,
    })
    this.tileSetBg = this.tileMap.addTilesetImage('tileset_fg')
    if (this.tileSetBg) this.tileMap.createLayer('background', this.tileSetBg)

    this.tileSet = this.tileMap.addTilesetImage('tileset_fg')
    if (!this.tileSet) return
    this.platform = this.tileMap.createLayer(`scene${this.number}`, this.tileSet)
    this.objectsLayer = this.tileMap.getObjectLayer('objects')
    this.platform?.setCollisionByExclusion([-1])
    this.physics.world.setBounds(0, 0, this.width, this.height)
    this.exits = this.add.group()
    this.blocks = this.add.group()
    this.texts = []

    this.addObjects()
  }

  /*
    Adds objects to the game: blocks and exits. The blocks are added to the group blocks and the exits to the group exits. The `block_1_1` block is the player.
  */
  addObjects() {
    this.objectsLayer?.objects.forEach(object => {
      if (object.x && object.y && object.name.startsWith('block')) {
        const [name, width, height, color] = object.name.split('_')
        this.activeBlock = new BlockGroup(this, object.x, object.y, Number(width), Number(height), color)
        this.blocks?.add(this.activeBlock)
        if (object.name.startsWith('block_1_1')) {
          this.addPlayer(this.activeBlock)
        }
      }

      if (object.x && object.y && object.name.startsWith('exit')) {
        this.exits?.add(new Exit(this, object.x - 16, object.y))
      }
    })
  }

  /*
    If the scene has some texts, we show them. This is helpful to explain to the player what to do in a tutorial scene
  */
  showTexts() {
    if (this.number > 0) return
    const texts = ['Select cubes', 'Pull/push them with WASD/Arrows', 'MOVE the red to exit']
    texts.forEach((text, i) => {
      this.add
        .bitmapText(this.center_width, 425 + 35 * i, 'mario', text, 15)
        .setOrigin(0.5)
        .setTint(0xffe066)
        .setDropShadow(1, 2, 0xbf2522, 0.7)
    })
  }

  /*
   This method adds the player -which is just another block- to the game. It also adds an overlap between the player and the exits. If the player overlaps with an exit, the method hitExit is called.
  */
  addPlayer(block: Phaser.GameObjects.Container) {
    this.player = block
    if (!this.exits) return
    this.physics.add.overlap(
      this.player,
      this.exits,
      this.hitExit,
      () => {
        return true
      },
      this
    )
  }

  // hitBlockBlock(block, platform) {}

  /*
    This is called when the player touches the exit of the scene. It destroys the exit and calls the `finishScene` method.
  */
  hitExit(
    player: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile,
    exit: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
  ) {
    if (!this.player) return
    this.player.active = false
    exit.destroy()

    this.finishScene()
  }

  /*
    This method sets the pointer (the mouse in a computer) to `this.pointer` and disables the context menu of the mouse.
  */
  addPointer() {
    this.pointer = this.input.activePointer
    this.input.mouse?.disableContextMenu()
  }

  /*
    The next method loads the audio, it plays them normally and the last plays audio with a random rate and detune.
  */
  loadAudios() {
    this.audios = {
      bump: this.sound.add('bump'),
      hover: this.sound.add('hover'),
      select: this.sound.add('select'),
      move: this.sound.add('move'),
      win: this.sound.add('win'),
    }
  }

  playAudio(key: string) {
    if (this.audios && this.audios[key]) this.audios[key].play()
  }

  playRandom(key: string, volume = 1) {
    if (this.audios && this.audios[key])
      this.audios[key].play({
        rate: Phaser.Math.Between(1, 1.5),
        detune: Phaser.Math.Between(-1000, 1000),
        delay: 0,
        volume,
      })
  }

  /*
      The game loop just detects if `R` was pressed to restart the scene.
  */
  update() {
    if (this.R && Phaser.Input.Keyboard.JustDown(this.R)) {
      this.restartScene()
    }
  }

  /*
    This method is called when the player touches the exit of the scene. It destroys the exit and calls the `finishScene` method.
    It also adds a text with the number of moves and the time it took to finish the scene.
  */
  finishScene() {
    if (this.solved) return

    this.playAudio('win')
    this.solved = true
    const totalMoves = +this.registry.get('moves') + this.totalMoves
    this.registry.set('moves', totalMoves)

    this.winText = this.add
      .bitmapText(this.center_width, -100, 'mario', 'STAGE CLEARED!', 30)
      .setOrigin(0.5)
      .setTint(0xffe066)
      .setDropShadow(2, 3, 0x75b947, 0.7)
    this.tweens.add({
      targets: this.winText,
      duration: 500,
      y: { from: this.winText.y, to: this.center_height },
    })
    this.tweens.add({
      targets: [this.winText, this.movesText],
      duration: 100,
      scale: { from: 1, to: 1.1 },
      repeat: -1,
      yoyo: true,
    })
    this.time.delayedCall(
      2000,
      () => {
        this.scene.start('transition', {
          next: 'underwater',
          name: 'STAGE',
          number: this.number + 1,
        })
      },
      undefined,
      this
    )
  }

  /*
    This method restarts the scene.
  */
  restartScene() {
    this.scene.start('game', {
      next: 'underwater',
      name: 'STAGE',
      number: this.number,
    })
  }

  /*
    This method updates the number of moves. It is called when the player moves the block group. It is the score of the game after all.
  */
  updateMoves() {
    this.totalMoves++
    this.movesText?.setText(this.totalMoves.toString())
    this.tweens.add({
      targets: [this.timerText],
      duration: 200,
      alpha: { from: 0.6, to: 1 },
      repeat: -1,
    })
  }
}
