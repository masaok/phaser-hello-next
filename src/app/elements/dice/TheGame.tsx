'use client'

/**
 * Simple Full Screen Example
 */

import { useEffect } from 'react'

// import Phaser from 'phaser'
import { Game, AUTO } from 'phaser'
import TheScene from './TheScene'

const TheGame: React.FC = () => {
  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: AUTO,
      // width: 800,
      // height: 600,
      width: window.innerWidth,
      height: window.innerHeight,
      scene: TheScene,
      backgroundColor: '#2c3e50',
      parent: 'phaser-container', // required to match div id
      physics: {
        default: 'arcade',
        arcade: {
          debug: true,
        },
      },
    }

    const game = new Game(config)

    return () => {
      game.destroy(true)
    }
  }, [])

  return (
    // <div id="phaser-container" style={{ width: "800px", height: "600px" }} />
    <div id="phaser-container" style={{ width: '100vw', height: '100vh' }} />
  )
}

export default TheGame
