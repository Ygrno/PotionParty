import { ComponentCard } from "./Card";
import { Deck } from "./Deck";

export class Market {
  public static storage: ComponentCard[] = [];

  constructor() {
    // Draw 6 cards from the deck and add them to the storage
    for (let i = 0; i < 6; i++) {
      Market.storage.push(Deck.Draw());
    }
  }

  //End of turn functions:

  public static Restock(): void {
    // If there are less than 6 cards in the storage, draw cards from the deck
    while (Market.storage.length < 6) {
      Market.storage.push(Deck.Draw());
    }
  }

  public static AddComponentCard(card: ComponentCard): void {
    Market.storage.push(card);
  }
}
