import { ComponentCard } from "./Card";
import { CardType } from "../Globals";
import { DiscardedPile } from "./DiscardedPile";

export class Deck {
  private static deck: ComponentCard[] = [];

  constructor() {
    Deck.deck.push(
      new ComponentCard(CardType.SPIDERS, 1),
      new ComponentCard(CardType.SPIDERS, 1),
      new ComponentCard(CardType.SPIDERS, 2),
      new ComponentCard(CardType.SPIDERS, 2),
      new ComponentCard(CardType.SPIDERS, 3),
      new ComponentCard(CardType.SPIDERS, 3),
      new ComponentCard(CardType.SPIDERS, 4),
      new ComponentCard(CardType.SPIDERS, 4),
      new ComponentCard(CardType.SPIDERS, 5),
      new ComponentCard(CardType.SPIDERS, 5),
      new ComponentCard(CardType.SPIDERS, 6),
      new ComponentCard(CardType.SPIDERS, 6),
      new ComponentCard(CardType.SPIDERS, 7),
      new ComponentCard(CardType.SPIDERS, 7),

      new ComponentCard(CardType.EYES, 1),
      new ComponentCard(CardType.EYES, 1),
      new ComponentCard(CardType.EYES, 2),
      new ComponentCard(CardType.EYES, 2),
      new ComponentCard(CardType.EYES, 3),
      new ComponentCard(CardType.EYES, 3),
      new ComponentCard(CardType.EYES, 4),
      new ComponentCard(CardType.EYES, 4),
      new ComponentCard(CardType.EYES, 5),
      new ComponentCard(CardType.EYES, 5),
      new ComponentCard(CardType.EYES, 6),
      new ComponentCard(CardType.EYES, 6),
      new ComponentCard(CardType.EYES, 7),
      new ComponentCard(CardType.EYES, 7),

      new ComponentCard(CardType.LIZARDS, 1),
      new ComponentCard(CardType.LIZARDS, 1),
      new ComponentCard(CardType.LIZARDS, 2),
      new ComponentCard(CardType.LIZARDS, 2),
      new ComponentCard(CardType.LIZARDS, 3),
      new ComponentCard(CardType.LIZARDS, 3),
      new ComponentCard(CardType.LIZARDS, 4),
      new ComponentCard(CardType.LIZARDS, 4),
      new ComponentCard(CardType.LIZARDS, 5),
      new ComponentCard(CardType.LIZARDS, 5),
      new ComponentCard(CardType.LIZARDS, 6),
      new ComponentCard(CardType.LIZARDS, 6),
      new ComponentCard(CardType.LIZARDS, 7),
      new ComponentCard(CardType.LIZARDS, 7),

      new ComponentCard(CardType.MUSHROOMS, 1),
      new ComponentCard(CardType.MUSHROOMS, 1),
      new ComponentCard(CardType.MUSHROOMS, 2),
      new ComponentCard(CardType.MUSHROOMS, 2),
      new ComponentCard(CardType.MUSHROOMS, 3),
      new ComponentCard(CardType.MUSHROOMS, 3),
      new ComponentCard(CardType.MUSHROOMS, 4),
      new ComponentCard(CardType.MUSHROOMS, 4),
      new ComponentCard(CardType.MUSHROOMS, 5),
      new ComponentCard(CardType.MUSHROOMS, 5),
      new ComponentCard(CardType.MUSHROOMS, 6),
      new ComponentCard(CardType.MUSHROOMS, 6),
      new ComponentCard(CardType.MUSHROOMS, 7),
      new ComponentCard(CardType.MUSHROOMS, 7),

      new ComponentCard(CardType.WORMS, 1),
      new ComponentCard(CardType.WORMS, 1),
      new ComponentCard(CardType.WORMS, 2),
      new ComponentCard(CardType.WORMS, 2),
      new ComponentCard(CardType.WORMS, 3),
      new ComponentCard(CardType.WORMS, 3),
      new ComponentCard(CardType.WORMS, 4),
      new ComponentCard(CardType.WORMS, 4),
      new ComponentCard(CardType.WORMS, 5),
      new ComponentCard(CardType.WORMS, 5),
      new ComponentCard(CardType.WORMS, 6),
      new ComponentCard(CardType.WORMS, 6),
      new ComponentCard(CardType.WORMS, 7),
      new ComponentCard(CardType.WORMS, 7),

      new ComponentCard(CardType.JOKER, 4),
      new ComponentCard(CardType.JOKER, 4)
    );

    // Shuffle the deck
    this.Shuffle();
  }

  public static Draw(): ComponentCard {
    if (this.deck.length === 0) {
      DiscardedPile.Shuffle();
      this.deck = DiscardedPile.pile;
      DiscardedPile.Clear();
    }
    return this.deck.pop() as ComponentCard;
  }

  public get Length(): number {
    return Deck.deck.length;
  }

  public Shuffle(): void {
    for (let i = Deck.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [Deck.deck[i], Deck.deck[j]] = [Deck.deck[j], Deck.deck[i]];
    }
  }
}
