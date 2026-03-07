import type { EvaluationGrid } from "./EvaluationGrid.js";

export interface Exercise {
  prompt: string;
  solution: string;

  evaluationGrid: EvaluationGrid;
}
