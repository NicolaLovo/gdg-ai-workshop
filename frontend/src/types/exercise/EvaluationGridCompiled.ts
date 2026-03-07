import type { EvaluationGridIndicator } from "./EvaluationGrid";

export interface EvaluationGridCompiledIndicator extends EvaluationGridIndicator {
  pointsObtained: number;
  reason: string;
}

export interface EvaluationGridCompiled {
  indicators: EvaluationGridCompiledIndicator[];
}
