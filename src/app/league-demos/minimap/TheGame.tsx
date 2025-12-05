'use client'

import { useEffect, useRef } from 'react'
import * as Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import GameScene from './scenes/GameScene'

export default function TheGame() {
  const gameRef = useRef<Phaser.Game | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (gameRef.current || !containerRef.current) return

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 1024,
      height: 768,
      parent: containerRef.current,
      backgroundColor: '#1a1a2e',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false,
        },
      },
      scene: [BootScene, GameScene],
    }

    gameRef.current = new Phaser.Game(config)

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true)
        gameRef.current = null
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center"
    />
  )
}
