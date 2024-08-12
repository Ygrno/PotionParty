import { ComponentCard } from "./Card";

export class DiscardedPile {
  public static pile: ComponentCard[] = [];

  private constructor() {}

  public Throw(card: ComponentCard): void {
    DiscardedPile.pile.push(card);
  }

  public get Length(): number {
    return DiscardedPile.pile.length;
  }

  public Shuffle(): void {
    for (let i = DiscardedPile.pile.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [DiscardedPile.pile[i], DiscardedPile.pile[j]] = [
        DiscardedPile.pile[j],
        DiscardedPile.pile[i],
      ];
    }
  }

  public Clear(): void {
    DiscardedPile.pile = [];
  }
}
