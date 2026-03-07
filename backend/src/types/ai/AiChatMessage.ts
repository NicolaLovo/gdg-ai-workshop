import type { EvaluationGridCompiled } from "../exercise/EvaluationGridCompiled.js";

export type AiChatMessage = {
  role: "user" | "assistant";
} & (
  | {
      type: "text";
      content: string;
    }
  | {
      type: "evaluation";
      evaluationGridCompiled: EvaluationGridCompiled;
      comment: string;
    }
);
