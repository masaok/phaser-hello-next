'use client'

/**
 * Simple WASD Demo
 */

import { useEffect } from 'react'

import { Game, AUTO } from 'phaser'

import PhaserLogoScene from '@/scenes/PhaserLogoScene'
import HelloWorldScene from '@/scenes/HelloWorldScene'

const PhaserLogoGame = () => {
  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      scene: PhaserLogoScene,
      parent: 'phaser-container',

      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 200, x: 0 },
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

export default PhaserLogoGame
