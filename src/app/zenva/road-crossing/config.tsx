'use client'

/**
 * Simple Full Screen Example
 */

import { useEffect } from 'react'

// import Phaser from 'phaser'
import { Game, AUTO } from 'phaser'

import TheScene from './scenes/RoadCrossingScene'

const HelloGame: React.FC = () => {
  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      scene: TheScene,
      parent: 'phaser-container',
    }

    const game = new Game(config)

    return () => {
      game.destroy(true)
    }
  }, [])

  return <div id="phaser-container" style={{ width: '100vw', height: '100vh' }} />
}

export default HelloGame
