'use client'

import { useEffect } from 'react'
import * as Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import GameScene from './scenes/GameScene'

const TheGame: React.FC = () => {
  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 1024,
      height: 768,
      backgroundColor: '#1a1a2e',
      parent: 'lemmings-container',
      pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0, x: 0 },
          debug: false,
        },
      },
      scene: [BootScene, GameScene],
    }

    const game = new Phaser.Game(config)

    return () => {
      game.destroy(true)
    }
  }, [])

  return (
    <div
      id="lemmings-container"
      className="flex items-center justify-center w-full h-full"
    />
  )
}

export default TheGame
