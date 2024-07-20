'use client'

// https://www.emanueleferonato.com/tag/zuma/

import { useEffect } from 'react'

import * as Phaser from 'phaser'

import { PreloadAssets } from './scenes/preloadAssets' // preloadAssets scene
import { PlayGame } from './scenes/playGame' // playGame scene
import { GameOptions } from './gameOptions'

const TheGame: React.FC = () => {
  useEffect(() => {
    // object to initialize the Scale Manager
    const scaleObject: Phaser.Types.Core.ScaleConfig = {
      mode: Phaser.Scale.FIT, // adjust size to automatically fit in the window
      autoCenter: Phaser.Scale.CENTER_BOTH, // center the game horizontally and vertically
      parent: 'phaser-container', // DOM id where to render the game
      width: GameOptions.gameSize.width, // game width, in pixels
      height: GameOptions.gameSize.height, // game height, in pixels
    }

    // game configuration object
    const configObject: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO, // game renderer
      backgroundColor: GameOptions.gameBackgroundColor, // game background color
      scale: scaleObject, // scale settings
      scene: [
        // array with game scenes
        PreloadAssets, // PreloadAssets scene
        PlayGame, // PlayGame scene
      ],
    }

    const game = new Phaser.Game(configObject)

    return () => {
      game.destroy(true)
    }
  }, [])

  return <div id="phaser-container" style={{ width: '100vw', height: '100vh' }} />
}

export default TheGame
