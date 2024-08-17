import { BonusLayout } from "./BonusLauout";
import { Card, ComponentCard, PotionCard } from "./Card";
import { Deck } from "./Deck";
import { DiscardedPile } from "./DiscardedPile";
import { GameSession } from "./GameSession";
import { Market } from "./Market";
import { PotionLayout } from "./PotionLayout";

export class Player {
  name: string;
  private score: number;
  private storage: Card[] = [];
  hand: ComponentCard[] = [];

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

  takeCardFromMarket(card: ComponentCard): void {
    // Check if the card is in the market
    if (!Market.storage.includes(card)) {
      throw new Error("Card is not in the market");
    }

    // Add the card to the player's hand
    this.hand.push(card);

    // Remove the card from the market
    Market.RemoveComponentCard(card);
  }

  tradeWithMarket(
    playerCard: ComponentCard,
    desiredMarketCards: ComponentCard[]
  ): void {
    // Check if the player has the card
    if (!this.hand.includes(playerCard)) {
      throw new Error("Player does not have the card");
    }

    if (!Market.EcommerseValid(playerCard, desiredMarketCards)) {
      throw new Error("Invalid trade");
    }

    // Remove the player card from the hand
    this.hand.splice(this.hand.indexOf(playerCard), 1);

    // Remove the desired cards from the market
    for (let i = 0; i < desiredMarketCards.length; i++) {
      Market.RemoveComponentCard(desiredMarketCards[i]);
    }

    // Add the player card to the market
    Market.AddComponentCard(playerCard);

    // Add the desired cards to the player's hand
    for (let i = 0; i < desiredMarketCards.length; i++) {
      this.hand.push(desiredMarketCards[i]);
    }
  }

  brewPotion(playerCards: ComponentCard[], potion: PotionCard): void {
    // Check if the player has the cards
    for (let i = 0; i < playerCards.length; i++) {
      if (!this.hand.includes(playerCards[i])) {
        throw new Error("Player does not have the cards");
      }
    }

    if (!PotionLayout.checkConditionMet(playerCards, potion)) {
      throw new Error("Potion condition not met");
    }

    // Remove the player cards from the hand
    for (let i = 0; i < playerCards.length; i++) {
      this.hand.splice(this.hand.indexOf(playerCards[i]), 1);
      DiscardedPile.Throw(playerCards[i]);
    }

    // Remove the potion from the layout
    PotionLayout.removePotion(potion);

    // Add the potion to the player's storage
    this.addToStorage(potion);

    // Check if the player won bonus cards
    const bonusCards = BonusLayout.checkConditionMet(playerCards, this.storage);
    bonusCards.forEach((card) => {
      this.storage.push(card);
      BonusLayout.removeBonusCard(card);
    });
  }

  getScore(): number {
    this.score = this.storage.length;
    return this.score;
  }

  //End of turn functions:
  addToMarket(handSubset: ComponentCard[]): void {
    if (this.hand.length <= 5) {
      throw new Error("No need to give cards to the market");
    }

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

  private addToStorage(card: Card): void {
    this.storage.push(card);
    card.setTurnPlayed(GameSession.turn);
  }
}
