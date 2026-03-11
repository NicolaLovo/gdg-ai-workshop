import { GoogleGenAI, type Chat } from "@google/genai";
import { BaseChat } from "./tools/BaseChat.js";
import type { EvaluationGridCompiled } from "./types/exercise/EvaluationGridCompiled.js";
import type { Exercise } from "./types/exercise/Exercise.js";

interface ExerciseChatProps {
  exercise: Exercise;
  socketId: string;
}

/**
 * Step 1: inserimento api key
 */
const geminiAi = new GoogleGenAI({
  apiKey: "",
});

export class ExerciseChat extends BaseChat {
  /**
   * Chat instance of Gemini AI
   */
  private chat: Chat;

  constructor(params: ExerciseChatProps) {
    super(params);

    /**
     * Step 2: inizializzazione chat con Gemini AI
     */
  }

  public async sendMessage(
    studentMessage: string,
    studentAttempt: string,
    onChunk: (chunk: string) => void,
  ) {
    /**
     * Step 3: invio messaggio a Gemini AI
     */

    return;
  }

  public async evaluate(studentAttempt: string): Promise<{
    evaluationGridCompiled: EvaluationGridCompiled;
    comment: string;
  }> {
    /**
     * Step 4: valutazione dell'esercizio con Gemini AI
     */
    return null as any;
  }
}
