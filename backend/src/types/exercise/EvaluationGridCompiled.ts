import type { EvaluationGridIndicator } from "./EvaluationGrid.js";

export interface EvaluationGridCompiledIndicator extends EvaluationGridIndicator {
  pointsObtained: number;
  reason: string;
}

export interface EvaluationGridCompiled {
  indicators: EvaluationGridCompiledIndicator[];
}

export interface EvaluationGridCompiledByAi {
  indicators: {
    pointsObtained: number;
    reason: string;
  }[];
  comment: string;
}
