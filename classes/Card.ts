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
export * from "./Card";
