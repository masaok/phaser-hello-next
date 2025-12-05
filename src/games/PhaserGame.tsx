'use client'

import React, { useRef, useEffect } from 'react'
import { Game, AUTO, Scene } from 'phaser'

class HelloWorldScene extends Scene {
  private logo!: Phaser.Physics.Arcade.Image
  private particles!: Phaser.GameObjects.Particles.ParticleEmitter

  constructor() {
    super({ key: 'HelloWorld' })
  }

  preload() {
    this.load.setBaseURL('https://labs.phaser.io')
    this.load.image('logo', 'assets/sprites/phaser3-logo.png')
    this.load.image('particle', 'assets/particles/yellow.png')
  }

  create() {
    const { width, height } = this.scale

    // Add particles
    this.particles = this.add.particles(0, 0, 'particle', {
      speed: 100,
      scale: { start: 0.5, end: 0 },
      blendMode: 'ADD',
    })

    // Add logo with physics
    this.logo = this.physics.add.image(width / 2, height / 2, 'logo')
    this.logo.setVelocity(100, 100)
    this.logo.setBounce(1, 1)
    this.logo.setCollideWorldBounds(true)

    // Particles follow logo
    this.particles.startFollow(this.logo)

    // Add welcome text
    this.add
      .text(width / 2, 50, 'Hello Phaser 3.90!', {
        font: 'bold 32px Arial',
        color: '#ffffff',
      })
      .setOrigin(0.5)

    this.add
      .text(width / 2, height - 30, 'Click anywhere to add velocity', {
        font: '16px Arial',
        color: '#888888',
      })
      .setOrigin(0.5)

    // Click to boost
    this.input.on('pointerdown', () => {
      const body = this.logo.body as Phaser.Physics.Arcade.Body
      body.setVelocity(
        Phaser.Math.Between(-200, 200),
        Phaser.Math.Between(-200, 200)
      )
    })
  }
}

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#1e293b',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: HelloWorldScene,
}

const PhaserGame: React.FC = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<Phaser.Game | null>(null)

  useEffect(() => {
    if (gameContainerRef.current && !gameRef.current) {
      gameRef.current = new Game({
        ...gameConfig,
        parent: gameContainerRef.current,
      })
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true)
        gameRef.current = null
      }
    }
  }, [])

  return <div ref={gameContainerRef} className="rounded-lg overflow-hidden shadow-2xl" />
}

export default PhaserGame
