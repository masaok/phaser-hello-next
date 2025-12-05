import * as Phaser from 'phaser'
import Champion from '../gameobjects/Champion'
import Dummy from '../gameobjects/Dummy'

export default class GameScene extends Phaser.Scene {
  champion!: Champion
  dummies!: Phaser.Physics.Arcade.Group
  projectiles!: Phaser.Physics.Arcade.Group
  traps!: Phaser.Physics.Arcade.Group

  // UI elements
  healthBar!: Phaser.GameObjects.Rectangle
  healthBarBg!: Phaser.GameObjects.Rectangle
  manaBar!: Phaser.GameObjects.Rectangle
  manaBarBg!: Phaser.GameObjects.Rectangle
  abilityIcons: Phaser.GameObjects.Container[] = []
  cooldownOverlays: Phaser.GameObjects.Rectangle[] = []
  weaponModeText!: Phaser.GameObjects.Text
  statsText!: Phaser.GameObjects.Text
  instructionsText!: Phaser.GameObjects.Text

  // Input
  qKey!: Phaser.Input.Keyboard.Key
  wKey!: Phaser.Input.Keyboard.Key
  eKey!: Phaser.Input.Keyboard.Key
  rKey!: Phaser.Input.Keyboard.Key

  constructor() {
    super({ key: 'GameScene' })
  }

  create() {
    // Background - simple arena
    this.createArena()

    // Groups
    this.projectiles = this.physics.add.group()
    this.traps = this.physics.add.group()
    this.dummies = this.physics.add.group()

    // Create champion
    this.champion = new Champion(this, 512, 600)
    this.champion.setProjectilesGroup(this.projectiles)
    this.champion.setTrapsGroup(this.traps)

    // Create training dummies
    this.createDummy(300, 300)
    this.createDummy(512, 200)
    this.createDummy(724, 300)
    this.createDummy(400, 400)
    this.createDummy(624, 400)

    // Input
    this.setupInput()

    // UI
    this.createUI()

    // Collisions
    this.physics.add.overlap(
      this.projectiles,
      this.dummies,
      this.handleProjectileHit as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this
    )

    this.physics.add.overlap(
      this.traps,
      this.dummies,
      this.handleTrapHit as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this
    )
  }

  createArena() {
    // Dark arena floor
    this.add.rectangle(512, 384, 900, 600, 0x2a2a4a)

    // Lane markings
    this.add.rectangle(512, 384, 880, 580, 0x1a1a3a).setStrokeStyle(4, 0x4a4a8a)

    // Decorative elements
    for (let i = 0; i < 5; i++) {
      this.add.circle(150 + i * 180, 100, 20, 0x3a3a5a)
    }

    // Title
    this.add.text(512, 30, 'LEAGUE OF LEMMINGS', {
      fontSize: '32px',
      color: '#ff69b4',
      fontFamily: 'Arial',
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5)

    this.add.text(512, 60, 'Champion Demo - Jinx-style ADC', {
      fontSize: '16px',
      color: '#aaaaaa',
      fontFamily: 'Arial',
    }).setOrigin(0.5)
  }

  createDummy(x: number, y: number) {
    const dummy = new Dummy(this, x, y)
    this.dummies.add(dummy)
  }

  setupInput() {
    // Keyboard
    this.qKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.Q)
    this.wKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.eKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.E)
    this.rKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.R)

    // Mouse click - right click to move, left click to attack
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (pointer.rightButtonDown()) {
        // Move
        this.champion.moveTo(pointer.x, pointer.y)
      } else {
        // Check if clicking on dummy
        let clickedDummy: Dummy | null = null
        this.dummies.children.iterate((child) => {
          const dummy = child as Dummy
          if (dummy.active) {
            const dx = pointer.x - dummy.x
            const dy = pointer.y - dummy.y
            if (Math.sqrt(dx * dx + dy * dy) < 40) {
              clickedDummy = dummy
            }
          }
          return true
        })

        if (clickedDummy) {
          this.champion.attackTarget(clickedDummy)
        } else {
          this.champion.moveTo(pointer.x, pointer.y)
        }
      }
    })

    // Prevent context menu
    this.game.canvas.addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })
  }

  createUI() {
    const uiY = 720

    // Health bar
    this.healthBarBg = this.add.rectangle(120, uiY, 200, 20, 0x333333)
    this.healthBarBg.setStrokeStyle(2, 0x666666)
    this.healthBar = this.add.rectangle(120, uiY, 196, 16, 0x00ff00)

    // Mana bar
    this.manaBarBg = this.add.rectangle(120, uiY + 24, 200, 14, 0x333333)
    this.manaBarBg.setStrokeStyle(2, 0x666666)
    this.manaBar = this.add.rectangle(120, uiY + 24, 196, 10, 0x0088ff)

    // Labels
    this.add.text(22, uiY - 6, 'HP', { fontSize: '12px', color: '#ffffff' })
    this.add.text(22, uiY + 18, 'MP', { fontSize: '12px', color: '#ffffff' })

    // Ability icons
    const abilityKeys = ['Q', 'W', 'E', 'R']
    const iconTextures = ['icon-q', 'icon-w', 'icon-e', 'icon-r']
    const startX = 350

    for (let i = 0; i < 4; i++) {
      const container = this.add.container(startX + i * 60, uiY + 10)

      // Background
      const bg = this.add.rectangle(0, 0, 50, 50, 0x333333)
      bg.setStrokeStyle(2, 0x666666)
      container.add(bg)

      // Icon
      const icon = this.add.image(0, 0, iconTextures[i])
      container.add(icon)

      // Key label
      const keyLabel = this.add.text(0, -30, abilityKeys[i], {
        fontSize: '14px',
        color: '#ffcc00',
        fontFamily: 'Arial',
      }).setOrigin(0.5)
      container.add(keyLabel)

      // Cooldown overlay
      const overlay = this.add.rectangle(0, 0, 48, 48, 0x000000, 0.7)
      overlay.setVisible(false)
      container.add(overlay)
      this.cooldownOverlays.push(overlay)

      this.abilityIcons.push(container)
    }

    // Weapon mode indicator
    this.weaponModeText = this.add.text(700, uiY - 10, 'MINIGUN MODE', {
      fontSize: '18px',
      color: '#ffcc00',
      fontFamily: 'Arial',
      stroke: '#000000',
      strokeThickness: 2,
    })

    // Stats
    this.statsText = this.add.text(700, uiY + 14, 'Stacks: 0 | Excited: 0', {
      fontSize: '14px',
      color: '#aaaaaa',
      fontFamily: 'Arial',
    })

    // Instructions
    this.instructionsText = this.add.text(512, 750,
      'Right-click: Move | Left-click: Attack | Q: Swap Weapon | W: Zap | E: Traps | R: Ultimate', {
      fontSize: '12px',
      color: '#888888',
      fontFamily: 'Arial',
    }).setOrigin(0.5)
  }

  update(time: number, delta: number) {
    // Update champion
    this.champion.update(time, delta)

    // Update dummies
    this.dummies.children.iterate((child) => {
      const dummy = child as Dummy
      if (dummy.active) {
        dummy.update(delta)
      }
      return true
    })

    // Handle ability inputs
    if (Phaser.Input.Keyboard.JustDown(this.qKey)) {
      this.champion.useQ()
    }
    if (Phaser.Input.Keyboard.JustDown(this.wKey)) {
      const pointer = this.input.activePointer
      this.champion.useW(pointer.x, pointer.y)
    }
    if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
      const pointer = this.input.activePointer
      this.champion.useE(pointer.x, pointer.y)
    }
    if (Phaser.Input.Keyboard.JustDown(this.rKey)) {
      const pointer = this.input.activePointer
      this.champion.useR(pointer.x, pointer.y)
    }

    // Update projectiles - remove off-screen
    this.projectiles.children.iterate((child) => {
      const proj = child as Phaser.Physics.Arcade.Sprite
      if (proj.x < -100 || proj.x > 1124 || proj.y < -100 || proj.y > 868) {
        proj.destroy()
      }
      return true
    })

    // Update UI
    this.updateUI()
  }

  updateUI() {
    // Health bar
    const healthPercent = this.champion.health / this.champion.maxHealth
    this.healthBar.setSize(196 * healthPercent, 16)
    this.healthBar.setPosition(22 + (196 * healthPercent) / 2, 720)

    if (healthPercent > 0.5) {
      this.healthBar.setFillStyle(0x00ff00)
    } else if (healthPercent > 0.25) {
      this.healthBar.setFillStyle(0xffff00)
    } else {
      this.healthBar.setFillStyle(0xff0000)
    }

    // Mana bar
    const manaPercent = this.champion.mana / this.champion.maxMana
    this.manaBar.setSize(196 * manaPercent, 10)
    this.manaBar.setPosition(22 + (196 * manaPercent) / 2, 744)

    // Cooldown overlays
    const cooldowns = [
      this.champion.qCooldown / this.champion.qMaxCooldown,
      this.champion.wCooldown / this.champion.wMaxCooldown,
      this.champion.eCooldown / this.champion.eMaxCooldown,
      this.champion.rCooldown / this.champion.rMaxCooldown,
    ]

    for (let i = 0; i < 4; i++) {
      if (cooldowns[i] > 0) {
        this.cooldownOverlays[i].setVisible(true)
        this.cooldownOverlays[i].setSize(48, 48 * cooldowns[i])
        this.cooldownOverlays[i].setPosition(0, -24 + (48 * cooldowns[i]) / 2)
      } else {
        this.cooldownOverlays[i].setVisible(false)
      }
    }

    // Weapon mode
    if (this.champion.weaponMode === 'minigun') {
      this.weaponModeText.setText('MINIGUN MODE')
      this.weaponModeText.setColor('#ffcc00')
    } else {
      this.weaponModeText.setText('ROCKET MODE')
      this.weaponModeText.setColor('#ff4444')
    }

    // Stats
    this.statsText.setText(
      `Stacks: ${this.champion.minigunStacks} | Excited: ${this.champion.excitedStacks}`
    )
  }

  handleProjectileHit(
    projectile: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile,
    dummy: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
  ) {
    const proj = projectile as Phaser.Physics.Arcade.Sprite
    const target = dummy as Dummy

    if (!target.active) return

    const damage = proj.getData('damage') as number
    const type = proj.getData('type') as string
    const isAoe = proj.getData('aoe') as boolean
    const slow = proj.getData('slow') as boolean

    // Play hit sound
    if (this.sound.get('hit')) {
      this.sound.play('hit', { volume: 0.3 })
    }

    // Apply damage
    const killed = target.takeDamage(damage, slow)

    if (killed) {
      this.champion.onKill()
    }

    // AOE explosion
    if (isAoe) {
      const aoeRadius = proj.getData('aoeRadius') as number
      this.createExplosion(proj.x, proj.y, type === 'mega-rocket')

      // Play explosion sound
      if (type === 'mega-rocket') {
        if (this.sound.get('big-explosion')) {
          this.sound.play('big-explosion', { volume: 0.5 })
        }
      } else {
        if (this.sound.get('explosion')) {
          this.sound.play('explosion', { volume: 0.4 })
        }
      }

      // Damage nearby dummies
      this.dummies.children.iterate((child) => {
        const otherDummy = child as Dummy
        if (otherDummy !== target && otherDummy.active) {
          const dx = otherDummy.x - proj.x
          const dy = otherDummy.y - proj.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < aoeRadius) {
            const aoeDamage = Math.floor(damage * 0.5)
            const killed = otherDummy.takeDamage(aoeDamage)
            if (killed) {
              this.champion.onKill()
            }
          }
        }
        return true
      })
    }

    proj.destroy()
  }

  handleTrapHit(
    trap: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile,
    dummy: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
  ) {
    const t = trap as Phaser.Physics.Arcade.Sprite
    const target = dummy as Dummy

    if (!target.active) return
    if (!t.getData('armed')) return

    const damage = t.getData('damage') as number

    // Create explosion effect
    this.createExplosion(t.x, t.y, false)

    // Play explosion sound
    if (this.sound.get('explosion')) {
      this.sound.play('explosion', { volume: 0.4 })
    }

    // Apply damage and root
    const killed = target.takeDamage(damage, true)

    if (killed) {
      this.champion.onKill()
    }

    t.destroy()
  }

  createExplosion(x: number, y: number, big: boolean) {
    const explosion = this.add.sprite(x, y, big ? 'big-explosion' : 'explosion')
    explosion.setScale(big ? 1.5 : 1)

    this.tweens.add({
      targets: explosion,
      alpha: 0,
      scale: explosion.scale * 1.5,
      duration: 300,
      onComplete: () => explosion.destroy(),
    })
  }
}
