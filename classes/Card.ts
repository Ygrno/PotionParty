import { GameSession } from "./GameSession";

export enum CardType {
  SPIDERS,
  EYES,
  LIZARDS,
  MUSHROOMS,
  WORMS,
  JOKER,
  BONUS,
  UNKNOWN,
}

export class Card {
  id: number;
  type: CardType;
  private turnPlayed: number;
  static nextId = 0;

  constructor() {
    this.id = Card.nextId++;
    this.turnPlayed = -1;
    this.type = CardType.UNKNOWN;
  }

  render(): void {
    // Implement the rendering logic for the card here
  }

  setTurnPlayed(turn: number): void {
    this.turnPlayed = turn;
  }

  getTurnPlayed(): number {
    return this.turnPlayed;
  }
}

export class ComponentCard extends Card {
  value: number;

  constructor(type: CardType, value: number) {
    super();
    this.type = type;
    this.value = value;
  }

  render(): void {
    // Implement the rendering logic for the component card here
  }
}

export class PotionCard extends Card {
  value: number;

  constructor(type: CardType, value: number) {
    super();
    this.type = type;
    this.value = value;
  }

  checkCondition(playerCards: ComponentCard[]): boolean {
    let sum = 0;
    for (let i = 0; i < playerCards.length; i++) {
      sum += playerCards[i].value;
    }
    if (sum !== this.value) {
      return false;
    }

    let types = playerCards.map((card) => card.type);
    let uniqueTypes = new Set(types);
    if (uniqueTypes.size !== 1 || types[0] !== this.type) {
      return false;
    }

    return true;
  }

  render(): void {
    // Implement the rendering logic for the potion card here
  }
}

export class MixedPotion extends PotionCard {
  constructor() {
    super(CardType.BONUS, 17);
  }

  checkCondition(playerCards: ComponentCard[]): boolean {
    let sum = 0;
    for (let i = 0; i < playerCards.length; i++) {
      sum += playerCards[i].value;
    }
    if (sum !== this.value) {
      return false;
    }
    return true;
  }

  render(): void {
    // Implement the rendering logic for the mixed potion card here
  }

  getDetails(): string {
    return `Get this bonus card if you are the first to make a potion from 17 ingredients. for exapmple: 7 + 6 + 4`;
  }
}

export class BonusCard extends Card {
  constructor(type: CardType) {
    super();
    this.type = type;
  }

  checkCondition(playerCards: ComponentCard[], playerStorage: Card[]): boolean {
    // Implement the logic for checking the condition of the bonus card here
    return false;
  }

  render(): void {
    // Implement the rendering logic for the bonus card here
  }
}

export class FourIngredientsCard extends BonusCard {
  constructor(type: CardType) {
    super(type);
  }

  render(): void {
    // Implement the rendering logic for the four ingredients card here
  }

  checkCondition(playerCards: ComponentCard[], playerStorage: Card[]): boolean {
    let conditionMet = false;
    if (playerCards.length === 4) {
      let types = playerCards.map((card) => card.type);
      let uniqueTypes = new Set(types);
      if (uniqueTypes.size === 1 && types[0] === this.type) {
        conditionMet = true;
      }
    }
    return conditionMet;
  }

  getDetails(): string {
    return `Get this bonus card if you are the first to make a potion of type ${this.type} with exactly 4 ingredients cards`;
  }
}

export class TwoPotionsCard extends BonusCard {
  constructor() {
    super(CardType.BONUS);
  }

  checkCondition(playerCards: ComponentCard[], playerStorage: Card[]): boolean {
    let count = 0;
    for (let card of playerStorage) {
      if (
        card.getTurnPlayed() === GameSession.turn &&
        card instanceof PotionCard
      ) {
        count++;
      }
      if (count >= 2) {
        return true;
      }
    }
    return false;
  }

  render(): void {
    // Implement the rendering logic for the two potions card here
  }

  getDetails(): string {
    return `Get this bonus card if you are the first to make 2 potions on the same turn`;
  }
}

export class ThreeConsecutive extends BonusCard {
  constructor() {
    super(CardType.BONUS);
  }

  checkCondition(playerCards: ComponentCard[], playerStorage: Card[]): boolean {
    let potionCards: PotionCard[] = [];

    for (let card of playerStorage) {
      if (card instanceof PotionCard) {
        potionCards.push(card);
      }
    }

    potionCards.sort((a, b) => a.value - b.value);

    if (potionCards.length < 3) {
      return false;
    }

    for (let i = 0; i < potionCards.length - 2; i++) {
      if (
        potionCards[i].value + 1 === potionCards[i + 1].value &&
        potionCards[i + 1].value + 1 === potionCards[i + 2].value
      ) {
        return true;
      }
    }

    return false;
  }

  render(): void {
    // Implement the rendering logic for the three in a row card here
  }

  getDetails(): string {
    return `Get this bonus card if you are the first that made 3 potions with consecutive values (10-11-12 or 12-13-14)`;
  }
}

export class ThreeOfSameTypeCard extends BonusCard {
  constructor() {
    super(CardType.BONUS);
  }

  checkCondition(playerCards: ComponentCard[], playerStorage: Card[]): boolean {
    let potionCards: PotionCard[] = [];

    for (let card of playerStorage) {
      if (card instanceof PotionCard) {
        potionCards.push(card);
      }
    }

    let histogram = new Map<CardType, number>();
    for (let card of potionCards) {
      if (histogram.has(card.type)) {
        histogram.set(card.type, (histogram.get(card.type) ?? 0) + 1);
      } else {
        histogram.set(card.type, 1);
      }
    }

    for (let count of histogram.values()) {
      if (count >= 3) {
        return true;
      }
    }

    return false;
  }

  render(): void {
    // Implement the rendering logic for the three of same type card here
  }

  getDetails(): string {
    return `Get this card if you are the first who made 3 potions of the same type`;
  }
}

export class AllFiveTypesCard extends BonusCard {
  constructor() {
    super(CardType.BONUS);
  }

  checkCondition(playerCards: ComponentCard[], playerStorage: Card[]): boolean {
    let types = new Set();
    for (let card of playerStorage) {
      if (card instanceof PotionCard) {
        types.add(card.type);
      }
    }
    return types.size === 5;
  }

  render(): void {
    // Implement the rendering logic for the all five types card here
  }

  getDetails(): string {
    return `Get this card if you are the first who made at least 1 potion from each type (SPIDERS, MUSHROOMS, EYES...)`;
  }
}

export * from "./Card";
