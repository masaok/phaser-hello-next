'use client'

/**
 * Simple WASD Demo
 */

import { useEffect } from 'react'

import { Game, AUTO } from 'phaser'

import { WalkScene } from '@/scenes/WalkScene'

const WalkGame = () => {
  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      scene: WalkScene,
      // parent: 'phaser-container',

      // physics: {
      //   default: 'arcade',
      //   arcade: {
      //     debug: false,
      //   },
      // },
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

export default WalkGame
