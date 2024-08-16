import { CardType } from "../Globals";

export class Card {
  id: number;
  static nextId = 0;

  constructor() {
    this.id = Card.nextId++;
  }

  render(): void {
    // Implement the rendering logic for the card here
  }
}

export class ComponentCard extends Card {
  type: CardType;
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
  type: CardType;
  value: number;

  constructor(type: CardType, value: number) {
    super();
    this.type = type;
    this.value = value;
  }

  render(): void {
    // Implement the rendering logic for the potion card here
  }
}

export class BonusCard extends Card {
  type: CardType;

  constructor(type: CardType) {
    super();
    this.type = type;
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

  getDetails(): string {
    return `Get this bonus card if you are the first to make a potion of type ${this.type} with exactly 4 ingredients cards`;
  }
}

export class MixedPotion extends PotionCard {
  constructor() {
    super(CardType.BONUS, 17);
  }

  render(): void {
    // Implement the rendering logic for the mixed potion card here
  }

  getDetails(): string {
    return `Get this bonus card if you are the first to make a potion from 17 ingredients. for exapmple: 7 + 6 + 4`;
  }
}

export class TwoPotionsCard extends BonusCard {
  constructor() {
    super(CardType.BONUS);
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

  render(): void {
    // Implement the rendering logic for the all five types card here
  }

  getDetails(): string {
    return `Get this card if you are the first who made at least 1 potion from each type (SPIDERS, MUSHROOMS, EYES...)`;
  }
}

export * from "./Card";
