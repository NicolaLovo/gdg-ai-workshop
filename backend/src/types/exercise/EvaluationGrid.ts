export interface EvaluationGridIndicator {
  label: string;
  aiDirectives: string;
  pointsAvailable: number;
}

export interface EvaluationGrid {
  indicators: EvaluationGridIndicator[];
}
