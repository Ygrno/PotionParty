import { CardType } from "../Globals";
import { BonusLayout } from "./BonusLauout";
import { Card, ComponentCard, PotionCard } from "./Card";
import { Deck } from "./Deck";
import { Market } from "./Market";
import { PotionLayout } from "./PotionLayout";

export class Player {
  name: string;
  private score: number;
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

  takeCardFromMarket(cardID: number): void {
    // Check if the card ID is valid
    if (cardID < 0 || cardID >= Market.storage.length) {
      throw new Error("Invalid card ID");
    }

    // Add the card to the player's hand
    this.hand.push(Market.storage[cardID]);

    // Remove the card from the market
    Market.storage.splice(cardID, 1);
  }

  tradeWithMarket(
    playerCard: ComponentCard,
    desiredMarketCards: ComponentCard[]
  ): void {
    // Check if the player has the card
    if (!this.hand.includes(playerCard)) {
      throw new Error("Player does not have the card");
    }

    // Check if the market has the desired cards
    for (let i = 0; i < desiredMarketCards.length; i++) {
      if (!Market.storage.includes(desiredMarketCards[i])) {
        throw new Error("Market does not have the desired cards");
      }
    }

    // check if the sum value of the desired cards is equal to the player card value
    let sum = 0;
    for (let i = 0; i < desiredMarketCards.length; i++) {
      sum += desiredMarketCards[i].value;
    }
    if (sum !== playerCard.value) {
      throw new Error("Invalid trade");
    }

    // Remove the player card from the hand
    this.hand.splice(this.hand.indexOf(playerCard), 1);

    // Remove the desired cards from the market
    for (let i = 0; i < desiredMarketCards.length; i++) {
      Market.storage.splice(Market.storage.indexOf(desiredMarketCards[i]), 1);
    }

    // Add the player card to the market
    Market.AddComponentCard(playerCard);

    // Add the desired cards to the player's hand
    for (let i = 0; i < desiredMarketCards.length; i++) {
      this.hand.push(desiredMarketCards[i]);
    }
  }

  playCard(card: Card): void {
    // Implement the logic for playing a card here
  }

  brewPotion(playerCards: ComponentCard[], potion: PotionCard): void {
    // Check if the player has the cards
    for (let i = 0; i < playerCards.length; i++) {
      if (!this.hand.includes(playerCards[i])) {
        throw new Error("Player does not have the cards");
      }
    }

    // Check if the potion is available
    if (!PotionLayout.getAllCurrentPotions().includes(potion)) {
      throw new Error("Potion is not available");
    }

    // Check if the player cards are of the same type as the potion
    if (potion.type !== CardType.BONUS) {
      for (let i = 0; i < playerCards.length; i++) {
        if (playerCards[i].type !== potion.type) {
          throw new Error(
            "Player cards are not of the same type as the potion"
          );
        }
      }
    }

    // Check if the sum value of the player cards is equal to the potion value
    let sum = 0;
    for (let i = 0; i < playerCards.length; i++) {
      sum += playerCards[i].value;
    }
    if (sum !== potion.value) {
      throw new Error("sum of player cards is not equal to potion value");
    }

    // Remove the player cards from the hand
    for (let i = 0; i < playerCards.length; i++) {
      this.hand.splice(this.hand.indexOf(playerCards[i]), 1);
    }

    // Remove the potion from the layout
    PotionLayout.removePotion(potion);

    // Add the potion to the player's storage
    this.storage.push(potion);

    // Check if the player won one of bonus cards
    if (potion.type !== CardType.BONUS) {
      if (playerCards.length == 4) {
        BonusLayout.removeBonusCard(potion.type.toString());
      }
    }
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
