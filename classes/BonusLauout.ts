import { CardType } from "../Globals";
import {
  AllFiveTypesCard,
  BonusCard,
  FourIngredientsCard,
  MixedPotion,
  ThreeConsecutive,
  ThreeOfSameTypeCard,
  TwoPotionsCard,
} from "./Card";

export class BonusLayout {
  public static BonusCards: BonusCard[] = [];

  constructor() {
    //FourIngredientsCard
    BonusLayout.BonusCards.push(new FourIngredientsCard(CardType.SPIDERS));
    BonusLayout.BonusCards.push(new FourIngredientsCard(CardType.EYES));
    BonusLayout.BonusCards.push(new FourIngredientsCard(CardType.LIZARDS));
    BonusLayout.BonusCards.push(new FourIngredientsCard(CardType.MUSHROOMS));
    BonusLayout.BonusCards.push(new FourIngredientsCard(CardType.WORMS));

    //Other bonus cards
    BonusLayout.BonusCards.push(new TwoPotionsCard());
    BonusLayout.BonusCards.push(new ThreeConsecutive());
    BonusLayout.BonusCards.push(new ThreeOfSameTypeCard());
    BonusLayout.BonusCards.push(new AllFiveTypesCard());
  }

  static removeBonusCard(request: string): void {
    switch (request) {
      case "SPIDERS":
        BonusLayout.BonusCards = BonusLayout.BonusCards.filter(
          (card) => card.type !== CardType.SPIDERS
        );
        break;
      case "EYES":
        BonusLayout.BonusCards = BonusLayout.BonusCards.filter(
          (card) => card.type !== CardType.EYES
        );
        break;
      case "LIZARDS":
        BonusLayout.BonusCards = BonusLayout.BonusCards.filter(
          (card) => card.type !== CardType.LIZARDS
        );
        break;
      case "MUSHROOMS":
        BonusLayout.BonusCards = BonusLayout.BonusCards.filter(
          (card) => card.type !== CardType.MUSHROOMS
        );
        break;
      case "WORMS":
        BonusLayout.BonusCards = BonusLayout.BonusCards.filter(
          (card) => card.type !== CardType.WORMS
        );
        break;
      case "TwoPotions":
        BonusLayout.BonusCards = BonusLayout.BonusCards.filter(
          (card) => !(card instanceof TwoPotionsCard)
        );
        break;
      case "ThreeConsecutive":
        BonusLayout.BonusCards = BonusLayout.BonusCards.filter(
          (card) => !(card instanceof ThreeConsecutive)
        );
        break;
      case "ThreeOfSameType":
        BonusLayout.BonusCards = BonusLayout.BonusCards.filter(
          (card) => !(card instanceof ThreeOfSameTypeCard)
        );
        break;
      case "AllFiveTypes":
        BonusLayout.BonusCards = BonusLayout.BonusCards.filter(
          (card) => !(card instanceof AllFiveTypesCard)
        );
        break;
        break;
      default:
        throw new Error("Invalid request");
    }
  }
}
