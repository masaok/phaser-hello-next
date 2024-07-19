'use client'

/**
 * Simple Full Screen Example
 */

import { useEffect } from 'react'

import * as Phaser from 'phaser'
// import TheScene from './TheScene'

import Game from './scenes/game'
import GameOver from './scenes/gameover'

const TheGame: React.FC = () => {
  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      // width: 800,
      // height: 600,
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: '#0072bc',
      parent: 'phaser-container', // required to match div id
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 350, x: 0 },
          debug: true,
        },
      },
      scene: [Game, GameOver],
    }

    const game = new Phaser.Game(config)

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
