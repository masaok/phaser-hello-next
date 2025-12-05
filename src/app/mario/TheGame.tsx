'use client'

import { useEffect } from 'react'
import * as Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import MenuScene from './scenes/MenuScene'
import GameScene from './scenes/GameScene'
import GameOverScene from './scenes/GameOverScene'

const TheGame: React.FC = () => {
  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      backgroundColor: '#5c94fc',
      parent: 'mario-container',
      pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 1200, x: 0 },
          debug: false,
        },
      },
      scene: [BootScene, MenuScene, GameScene, GameOverScene],
    }

    const game = new Phaser.Game(config)

    return () => {
      game.destroy(true)
    }
  }, [])

  return (
    <div
      id="mario-container"
      className="flex items-center justify-center w-full h-full"
    />
  )
}

export default TheGame
