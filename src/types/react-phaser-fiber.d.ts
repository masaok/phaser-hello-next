declare module "react-phaser-fiber" {
  import { FunctionComponent } from "react";
  import { Game, Types } from "phaser";

  export const Canvas: FunctionComponent<{ game: Game }>;

  export function useGame(config: Types.Core.GameConfig): Game;
}
