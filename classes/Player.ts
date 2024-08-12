import { Card, ComponentCard } from "./Card";
import { Deck } from "./Deck";
import { Market } from "./Market";

export class Player {
  name: string;
  score: number;
  hand: ComponentCard[] = [];
  storage: Card[] = [];

  constructor(name: string) {
    this.name = name;
    this.score = 0;

    for (let i = 0; i < 5; i++) {
      this.drawCard();
    }
  }

  drawCard(): void {
    this.hand.push(Deck.Draw());
  }

  playCard(card: Card): void {
    // Implement the logic for playing a card here
  }

  getScore(): number {
    this.score = this.storage.length;
    return this.score;
  }

  //End of turn functions:
  addToMarket(handSubset: ComponentCard[]): void {
    // Check if the hand subset is a valid set of cards

    let valid = true;
    if (handSubset.length > this.hand.length) {
      valid = false;
    }
    for (let i = 0; i < handSubset.length; i++) {
      if (!this.hand.includes(handSubset[i])) {
        valid = false;
      }
    }

    if (valid) {
      // Remove the cards from the hand and add them to the market
      for (let i = 0; i < handSubset.length; i++) {
        this.hand.splice(this.hand.indexOf(handSubset[i]), 1);
        Market.AddComponentCard(handSubset[i]);
      }
    } else {
      throw new Error("Invalid hand subset");
    }
  }
}
