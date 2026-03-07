import type { EvaluationGrid } from "./EvaluationGrid";

export interface Exercise {
  prompt: string;
  solution: string;

  evaluationGrid: EvaluationGrid;
}
