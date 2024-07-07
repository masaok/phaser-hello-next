"use client";

import React, { useRef, useEffect } from "react";
import { Game, AUTO } from "phaser";

class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super({ key: "HelloWorld" });
  }

  preload() {
    this.load.image("hello", "https://via.placeholder.com/150");
  }

  create() {
    this.add.text(100, 100, "Hello World!", {
      font: "40px Arial",
      color: "#ffffff",
    });
    this.add.image(400, 300, "hello");
  }
}

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 800,
  height: 600,
  scene: HelloWorldScene,
};

const PhaserGame: React.FC = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const game = new Game({
      ...gameConfig,
      parent: gameContainerRef.current as HTMLDivElement,
    });

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={gameContainerRef} />;
};

export default PhaserGame;
