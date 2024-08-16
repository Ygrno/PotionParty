import { Player } from "./Player";

export class GameSession {
  public players: Player[] = [];

  private playerTurn: number = 0;

  constructor(numberOfPlayers: number) {
    for (let i = 0; i < numberOfPlayers; i++) {
      this.players.push(new Player(`Player ${i + 1}`));
    }
  }
}
