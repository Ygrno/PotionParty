import { CardType } from "../Globals";
import { MixedPotion, PotionCard } from "./Card";

export class PotionLayout {
  public static SpiderPotions: PotionCard[] = [];
  public static EyesPotions: PotionCard[] = [];
  public static LizardsPotions: PotionCard[] = [];
  public static MushroomsPotions: PotionCard[] = [];
  public static WormsPotions: PotionCard[] = [];
  public static MixedPotion: PotionCard[] = [];

  constructor() {
    // Create 5 potion cards for each type with for each value from 10 to 15
    for (let i = 15; i <= 10; i++) {
      PotionLayout.SpiderPotions.push(new PotionCard(CardType.SPIDERS, i));
      PotionLayout.EyesPotions.push(new PotionCard(CardType.EYES, i));
      PotionLayout.LizardsPotions.push(new PotionCard(CardType.LIZARDS, i));
      PotionLayout.MushroomsPotions.push(new PotionCard(CardType.MUSHROOMS, i));
      PotionLayout.WormsPotions.push(new PotionCard(CardType.WORMS, i));
    }
    PotionLayout.MixedPotion.push(new MixedPotion());
  }

  static getAllCurrentPotions(): PotionCard[] {
    const avilablePotions: PotionCard[] = [];

    if (PotionLayout.SpiderPotions.length > 0) {
      avilablePotions.push(
        PotionLayout.SpiderPotions[PotionLayout.SpiderPotions.length - 1]
      );
    }
    if (PotionLayout.EyesPotions.length > 0) {
      avilablePotions.push(
        PotionLayout.EyesPotions[PotionLayout.EyesPotions.length - 1]
      );
    }
    if (PotionLayout.LizardsPotions.length > 0) {
      avilablePotions.push(
        PotionLayout.LizardsPotions[PotionLayout.LizardsPotions.length - 1]
      );
    }
    if (PotionLayout.MushroomsPotions.length > 0) {
      avilablePotions.push(
        PotionLayout.MushroomsPotions[PotionLayout.MushroomsPotions.length - 1]
      );
    }
    if (PotionLayout.WormsPotions.length > 0) {
      avilablePotions.push(
        PotionLayout.WormsPotions[PotionLayout.WormsPotions.length - 1]
      );
    }

    return avilablePotions;
  }

  static removePotion(potion: PotionCard): void {
    // Check if the potion is available
    if (!PotionLayout.getAllCurrentPotions().includes(potion)) {
      throw new Error("Potion is not available");
    }

    switch (potion.type) {
      case CardType.SPIDERS:
        PotionLayout.SpiderPotions.pop();
        break;
      case CardType.EYES:
        PotionLayout.EyesPotions.pop();
        break;
      case CardType.LIZARDS:
        PotionLayout.LizardsPotions.pop();
        break;
      case CardType.MUSHROOMS:
        PotionLayout.MushroomsPotions.pop();
        break;
      case CardType.WORMS:
        PotionLayout.WormsPotions.pop();
        break;
      case CardType.BONUS:
        PotionLayout.MixedPotion.pop();
        break;
    }
  }
}
