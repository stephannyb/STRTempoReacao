import { getCurrentMiliseconds } from './utils';

interface IGameData {
  colorShown: string;
  initialTime: number;
  finalTime?: number;
  clickedColor?: string;
}

export default class GameData {
  private userAnswers: IGameData[] = [];

  create(colorShown: string): void {
    this.userAnswers.push({
      colorShown,
      initialTime: getCurrentMiliseconds(),
    });
  }

  verifyUserAnswear(clickedColor: string): boolean {
    const finalTime = getCurrentMiliseconds();
    const [attemp, ...rest] = this.userAnswers.reverse();
    if (!attemp) return false;

    const isCorrect = attemp.colorShown === clickedColor;

    if (isCorrect) {
      attemp.finalTime = finalTime;
      attemp.clickedColor = clickedColor;
      return true;
    }

    this.userAnswers = [...rest].reverse();

    return false;
  }

  reset(): void {
    this.userAnswers = [];
  }

  getTimeReaction(): number {
    const sum = this.userAnswers.reduce((acc, curr) => {
      if (!curr.finalTime) return acc;
      const time = curr.finalTime - curr.initialTime;
      return time;
    }, 0.0);

    return sum;
  }

  getTimeReactionMedio(): number {
    const sum = this.userAnswers.reduce((acc, curr) => {
      if (!curr.finalTime) return acc;
      const time = curr.finalTime - curr.initialTime;
      return acc + time;
    }, 0.0);

    return sum > 0.0 ? sum / this.userAnswers.length : 0.0;
  }
}
