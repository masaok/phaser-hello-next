// CLASS TO PRELOAD ASSETS

// PreloadAssets class extends Phaser.Scene class
export class PreloadAssets extends Phaser.Scene {
  // constructor
  constructor() {
    super({
      key: 'PreloadAssets',
    })
  }

  // method to be called during class preloading
  preload(): void {
    // load image
    this.load.setBaseURL('/zuma/')
    this.load.image('gem', 'assets/sprites/gem.png')
  }

  // method to be executed when the scene is created
  create(): void {
    // start PlayGame scene
    this.scene.start('PlayGame')
  }
}
