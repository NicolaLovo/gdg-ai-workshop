import crypto from "crypto";
import type { EvaluationGrid } from "../types/exercise/EvaluationGrid.js";
import type {
  EvaluationGridCompiled,
  EvaluationGridCompiledByAi,
} from "../types/exercise/EvaluationGridCompiled.js";
import type { Exercise } from "../types/exercise/Exercise.js";

interface BaseChatProps {
  exercise: Exercise;
  socketId: string;
}

export class BaseChat {
  public readonly chatId: string;
  public readonly socketId: string;
  protected exercise: Exercise;

  constructor({ exercise, socketId }: BaseChatProps) {
    this.chatId = crypto.randomUUID();
    this.socketId = socketId;
    this.exercise = exercise;
  }
  protected buildEvaluationGridCompiled(
    evaluationGrid: EvaluationGrid,
    evaluationGridByAi: EvaluationGridCompiledByAi,
  ) {
    const evaluationGridCompiled: EvaluationGridCompiled = {
      indicators: [],
    };

    for (let i = 0; i < evaluationGridByAi.indicators.length; i++) {
      const resultIndicator = evaluationGridByAi.indicators[i];
      const originalIndicator = evaluationGrid.indicators[i];
      if (!originalIndicator || !resultIndicator) continue;

      evaluationGridCompiled.indicators.push({
        aiDirectives: originalIndicator.aiDirectives,
        label: originalIndicator.label,
        pointsAvailable: originalIndicator.pointsAvailable,
        pointsObtained: resultIndicator.pointsObtained,
        reason: resultIndicator.reason,
      });
    }
    return evaluationGridCompiled;
  }
}
