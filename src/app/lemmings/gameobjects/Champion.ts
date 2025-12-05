import * as Phaser from 'phaser'

type WeaponMode = 'minigun' | 'rocket'

export default class Champion extends Phaser.Physics.Arcade.Sprite {
  // Stats
  health: number = 100
  maxHealth: number = 100
  mana: number = 100
  maxMana: number = 100
  attackDamage: number = 10
  attackSpeed: number = 0.7 // Attacks per second for minigun
  moveSpeed: number = 200

  // Weapon mode (Q - Switcheroo)
  weaponMode: WeaponMode = 'minigun'
  minigunStacks: number = 0 // Ramping attack speed
  maxMinigunStacks: number = 3

  // Ability cooldowns (in ms)
  qCooldown: number = 0
  wCooldown: number = 0
  eCooldown: number = 0
  rCooldown: number = 0
  qMaxCooldown: number = 1000
  wMaxCooldown: number = 8000
  eMaxCooldown: number = 16000
  rMaxCooldown: number = 60000

  // State
  isMoving: boolean = false
  targetX: number = 0
  targetY: number = 0
  lastAttackTime: number = 0
  autoAttackTarget: Phaser.GameObjects.Sprite | null = null
  walkFrame: number = 0
  walkTimer: number = 0

  // Passive - Get Excited (speed boost on kill)
  excitedStacks: number = 0
  excitedTimer: number = 0

  // References
  projectiles!: Phaser.Physics.Arcade.Group
  traps!: Phaser.Physics.Arcade.Group
  scene: Phaser.Scene

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'champion-idle')

    this.scene = scene
    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setScale(2)
    this.setOrigin(0.5, 0.5)

    const body = this.body as Phaser.Physics.Arcade.Body
    body.setSize(20, 40)
    body.setOffset(10, 4)

    this.targetX = x
    this.targetY = y
  }

  setProjectilesGroup(group: Phaser.Physics.Arcade.Group) {
    this.projectiles = group
  }

  setTrapsGroup(group: Phaser.Physics.Arcade.Group) {
    this.traps = group
  }

  update(time: number, delta: number) {
    this.updateCooldowns(delta)
    this.updateMovement()
    this.updateAnimation()
    this.updatePassive(delta)
    this.updateAutoAttack(time)
    this.regenerateMana(delta)
  }

  updateCooldowns(delta: number) {
    if (this.qCooldown > 0) this.qCooldown -= delta
    if (this.wCooldown > 0) this.wCooldown -= delta
    if (this.eCooldown > 0) this.eCooldown -= delta
    if (this.rCooldown > 0) this.rCooldown -= delta
  }

  updateMovement() {
    const body = this.body as Phaser.Physics.Arcade.Body
    const dx = this.targetX - this.x
    const dy = this.targetY - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance > 5) {
      this.isMoving = true
      const speed = this.moveSpeed + (this.excitedStacks * 50)
      body.setVelocity(
        (dx / distance) * speed,
        (dy / distance) * speed
      )

      // Face direction
      if (dx < 0) {
        this.setFlipX(true)
      } else {
        this.setFlipX(false)
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
        this.setTexture(this.walkFrame === 0 ? 'champion-walk1' : 'champion-walk2')
      }
    } else {
      if (this.weaponMode === 'rocket') {
        this.setTexture('champion-rocket')
      } else {
        this.setTexture('champion-idle')
      }
    }
  }

  updatePassive(delta: number) {
    if (this.excitedStacks > 0) {
      this.excitedTimer -= delta
      if (this.excitedTimer <= 0) {
        this.excitedStacks = 0
      }
    }
  }

  updateAutoAttack(time: number) {
    if (!this.autoAttackTarget || !this.autoAttackTarget.active) {
      this.autoAttackTarget = null
      this.minigunStacks = 0
      return
    }

    const target = this.autoAttackTarget
    const dx = target.x - this.x
    const dy = target.y - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const range = this.weaponMode === 'rocket' ? 400 : 300

    if (distance > range) {
      this.minigunStacks = 0
      return
    }

    // Calculate attack interval
    let attackInterval: number
    if (this.weaponMode === 'minigun') {
      // Minigun gets faster with stacks
      const stackBonus = this.minigunStacks * 0.2
      attackInterval = 1000 / (this.attackSpeed + stackBonus)
    } else {
      // Rocket launcher is slower
      attackInterval = 1000 / (this.attackSpeed * 0.5)
    }

    if (time - this.lastAttackTime >= attackInterval) {
      this.attack(target)
      this.lastAttackTime = time
    }
  }

  attack(target: Phaser.GameObjects.Sprite) {
    const dx = target.x - this.x
    const dy = target.y - this.y
    const angle = Math.atan2(dy, dx)

    if (this.weaponMode === 'minigun') {
      // Fire bullet
      const bullet = this.projectiles.create(this.x, this.y, 'bullet') as Phaser.Physics.Arcade.Sprite
      bullet.setScale(1.5)
      bullet.setRotation(angle)
      bullet.setData('damage', this.attackDamage)
      bullet.setData('type', 'bullet')

      const speed = 600
      const body = bullet.body as Phaser.Physics.Arcade.Body
      body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed)

      // Play minigun sound
      if (this.scene.sound.get('minigun')) {
        this.scene.sound.play('minigun', { volume: 0.3 })
      }

      // Build stacks
      if (this.minigunStacks < this.maxMinigunStacks) {
        this.minigunStacks++
      }
    } else {
      // Fire rocket
      const rocket = this.projectiles.create(this.x, this.y, 'rocket') as Phaser.Physics.Arcade.Sprite
      rocket.setScale(1.5)
      rocket.setRotation(angle)
      rocket.setData('damage', this.attackDamage * 1.5)
      rocket.setData('type', 'rocket')

      // Play rocket sound
      if (this.scene.sound.get('rocket')) {
        this.scene.sound.play('rocket', { volume: 0.4 })
      }
      rocket.setData('aoe', true)
      rocket.setData('aoeRadius', 60)

      const speed = 400
      const body = rocket.body as Phaser.Physics.Arcade.Body
      body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed)

      // Rockets cost mana
      this.mana = Math.max(0, this.mana - 5)
    }

    // Face target
    this.setFlipX(dx < 0)
  }

  regenerateMana(delta: number) {
    if (this.mana < this.maxMana) {
      this.mana = Math.min(this.maxMana, this.mana + 0.01 * delta)
    }
  }

  moveTo(x: number, y: number) {
    this.targetX = x
    this.targetY = y
    this.autoAttackTarget = null
  }

  attackTarget(target: Phaser.GameObjects.Sprite) {
    this.autoAttackTarget = target
    // Move towards target if out of range
    const dx = target.x - this.x
    const dy = target.y - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const range = this.weaponMode === 'rocket' ? 400 : 300

    if (distance > range - 50) {
      const angle = Math.atan2(dy, dx)
      this.targetX = target.x - Math.cos(angle) * (range - 50)
      this.targetY = target.y - Math.sin(angle) * (range - 50)
    }
  }

  // Q - Switcheroo! (swap weapons)
  useQ(): boolean {
    if (this.qCooldown > 0) return false

    if (this.weaponMode === 'minigun') {
      this.weaponMode = 'rocket'
      this.setTexture('champion-rocket')
    } else {
      this.weaponMode = 'minigun'
      this.setTexture('champion-idle')
    }

    // Play swap sound
    if (this.scene.sound.get('swap')) {
      this.scene.sound.play('swap', { volume: 0.4 })
    }

    this.minigunStacks = 0
    this.qCooldown = this.qMaxCooldown
    return true
  }

  // W - Zap! (long range skillshot)
  useW(targetX: number, targetY: number): boolean {
    if (this.wCooldown > 0 || this.mana < 20) return false

    const dx = targetX - this.x
    const dy = targetY - this.y
    const angle = Math.atan2(dy, dx)

    const zap = this.projectiles.create(this.x, this.y, 'zap') as Phaser.Physics.Arcade.Sprite
    zap.setScale(2)
    zap.setRotation(angle)
    zap.setData('damage', 30)
    zap.setData('type', 'zap')
    zap.setData('slow', true)

    const speed = 800
    const body = zap.body as Phaser.Physics.Arcade.Body
    body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed)

    // Play zap sound
    if (this.scene.sound.get('zap')) {
      this.scene.sound.play('zap', { volume: 0.4 })
    }

    this.mana -= 20
    this.wCooldown = this.wMaxCooldown
    this.setFlipX(dx < 0)
    return true
  }

  // E - Flame Chompers! (place traps)
  useE(targetX: number, targetY: number): boolean {
    if (this.eCooldown > 0 || this.mana < 30) return false

    // Place 3 traps in a row
    const dx = targetX - this.x
    const dy = targetY - this.y
    const angle = Math.atan2(dy, dx)
    const perpAngle = angle + Math.PI / 2

    for (let i = -1; i <= 1; i++) {
      const trapX = targetX + Math.cos(perpAngle) * i * 40
      const trapY = targetY + Math.sin(perpAngle) * i * 40

      const trap = this.traps.create(trapX, trapY, 'trap') as Phaser.Physics.Arcade.Sprite
      trap.setScale(1.5)
      trap.setData('damage', 50)
      trap.setData('armed', false)
      trap.setData('lifetime', 5000)
      trap.setAlpha(0.7)

      // Arm after 0.7 seconds
      this.scene.time.delayedCall(700, () => {
        if (trap.active) {
          trap.setData('armed', true)
          trap.setAlpha(1)
        }
      })

      // Expire after lifetime
      this.scene.time.delayedCall(5000, () => {
        if (trap.active) {
          trap.destroy()
        }
      })
    }

    // Play trap sound
    if (this.scene.sound.get('trap')) {
      this.scene.sound.play('trap', { volume: 0.4 })
    }

    this.mana -= 30
    this.eCooldown = this.eMaxCooldown
    return true
  }

  // R - Super Mega Death Rocket!
  useR(targetX: number, targetY: number): boolean {
    if (this.rCooldown > 0 || this.mana < 50) return false

    const dx = targetX - this.x
    const dy = targetY - this.y
    const angle = Math.atan2(dy, dx)

    const megaRocket = this.projectiles.create(this.x, this.y, 'mega-rocket') as Phaser.Physics.Arcade.Sprite
    megaRocket.setScale(2)
    megaRocket.setRotation(angle)
    megaRocket.setData('damage', 150)
    megaRocket.setData('type', 'mega-rocket')
    megaRocket.setData('aoe', true)
    megaRocket.setData('aoeRadius', 120)
    megaRocket.setData('global', true) // Travels across map

    // Play big rocket sound
    if (this.scene.sound.get('rocket')) {
      this.scene.sound.play('rocket', { volume: 0.6 })
    }

    const speed = 500
    const body = megaRocket.body as Phaser.Physics.Arcade.Body
    body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed)

    this.mana -= 50
    this.rCooldown = this.rMaxCooldown
    this.setFlipX(dx < 0)
    return true
  }

  // Passive trigger - Get Excited!
  onKill() {
    this.excitedStacks = Math.min(3, this.excitedStacks + 1)
    this.excitedTimer = 6000 // 6 second duration
  }

  takeDamage(amount: number) {
    this.health = Math.max(0, this.health - amount)
    if (this.health <= 0) {
      // Respawn after delay
      this.scene.time.delayedCall(3000, () => {
        this.health = this.maxHealth
        this.mana = this.maxMana
        this.setPosition(512, 600)
        this.targetX = 512
        this.targetY = 600
      })
    }
  }
}
