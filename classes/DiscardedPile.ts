import { ComponentCard } from "./Card";

export class DiscardedPile {
  public static pile: ComponentCard[] = [];

  private constructor() {}

  public static Throw(card: ComponentCard): void {
    DiscardedPile.pile.push(card);
  }

  public static get Length(): number {
    return DiscardedPile.pile.length;
  }

  public static Shuffle(): void {
    for (let i = DiscardedPile.pile.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [DiscardedPile.pile[i], DiscardedPile.pile[j]] = [
        DiscardedPile.pile[j],
        DiscardedPile.pile[i],
      ];
    }
  }

  public static Clear(): void {
    DiscardedPile.pile = [];
  }
}
