import {
  AllFiveTypesCard,
  BonusCard,
  Card,
  ComponentCard,
  FourIngredientsCard,
  CardType,
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

  static checkConditionMet(
    playerCards: ComponentCard[],
    playerStorage: Card[]
  ): BonusCard[] {
    let conditionMet: boolean = false;
    let returnedCards: BonusCard[] = [];

    for (const card of BonusLayout.BonusCards) {
      if (card.checkCondition(playerCards, playerStorage)) {
        conditionMet = true;
        returnedCards.push(card);
      }
    }

    return returnedCards;
  }

  static removeBonusCard(bonusCard: BonusCard): void {
    const index = BonusLayout.BonusCards.indexOf(bonusCard);
    if (index === -1) {
      throw new Error("Bonus card not found");
    }
    BonusLayout.BonusCards.splice(index, 1);
  }
}
