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

  public static EcommerseValid(
    playerCard: ComponentCard,
    desiredMarketCards: ComponentCard[]
  ): boolean {
    // Check if the market has the desired cards
    for (let i = 0; i < desiredMarketCards.length; i++) {
      if (!Market.storage.includes(desiredMarketCards[i])) {
        return false;
      }
    }

    // check if the sum value of the desired cards is equal to the player card value
    let sum = 0;
    for (let i = 0; i < desiredMarketCards.length; i++) {
      sum += desiredMarketCards[i].value;
    }
    if (sum !== playerCard.value) {
      return false;
    }

    return true;
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

  public static RemoveComponentCard(card: ComponentCard): void {
    Market.storage.splice(Market.storage.indexOf(card), 1);
  }
}
