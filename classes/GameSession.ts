import { Player } from "./Player";

export class GameSession {
  static players: Player[] = [];
  static turn: number;
  static playerTurn: number = 0;

  constructor(numberOfPlayers: number) {
    for (let i = 0; i < numberOfPlayers; i++) {
      GameSession.players.push(new Player(`Player ${i + 1}`));
    }

    GameSession.turn = 0;
  }

  static nextTurn(): void {
    this.turn++;
    this.playerTurn = this.turn % this.players.length;
  }
}
