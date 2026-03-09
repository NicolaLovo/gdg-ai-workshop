import { GoogleGenAI, type Chat } from "@google/genai";
import { BaseChat } from "./tools/BaseChat.js";
import type { AiChatMessage } from "./types/ai/AiChatMessage.js";
import type { Exercise } from "./types/exercise/Exercise.js";

interface ExerciseChatProps {
  exercise: Exercise;
  socketId: string;
}

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
  }

  public async sendMessage(
    studentMessage: string,
    studentAttempt: string,
    onChunk: (chunk: string) => void,
  ) {
    return;
  }

  public async evaluate(studentAttempt: string): Promise<{
    message: AiChatMessage;
  }> {
    return null as any;
  }
}
