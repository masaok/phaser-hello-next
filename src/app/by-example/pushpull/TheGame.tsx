'use client'

// https://pello.itch.io/pushpull

import { useEffect } from 'react'

import * as Phaser from 'phaser'

import Bootloader from './scenes/bootloader'
import Outro from './scenes/outro'
import Splash from './scenes/splash'
import Transition from './scenes/transition'
import Game from './scenes/game'

const TheGame: React.FC = () => {
  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      backgroundColor: '#0072bc',
      parent: 'phaser-container', // must match div id
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0, x: 0 },
          debug: true,
        },
      },
      scene: [Bootloader, Splash, Transition, Game, Outro],
    }

    const game = new Phaser.Game(config)

    return () => {
      game.destroy(true)
    }
  }, [])

  return <div id="phaser-container" style={{ width: '100vw', height: '100vh' }} />
}

export default TheGame
