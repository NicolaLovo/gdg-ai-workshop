import { createContext, use, type Dispatch, type SetStateAction } from "react";
import type { AiChatMessage } from "../../types/ai/AiChatMessage";
import type { Exercise } from "../../types/exercise/Exercise";
import type { ExerciseChatSectionHandle } from "../ExerciseChatSection";

export type AiChatStatus = "streaming" | "ready";

export interface ExerciseContextValue {
  exercise: Exercise;

  attempt: string;
  setAttempt: Dispatch<SetStateAction<string>>;

  ai: {
    chatId: string;
    setChatId: Dispatch<SetStateAction<string>>;

    messages: AiChatMessage[];
    setMessages: Dispatch<SetStateAction<AiChatMessage[]>>;

    status: AiChatStatus;
    setStatus: Dispatch<SetStateAction<AiChatStatus>>;

    chatRef: React.RefObject<ExerciseChatSectionHandle | null>;
  };
}

export const ExerciseContext = createContext<ExerciseContextValue>(
  undefined as any,
);

export const useExerciseContext = () => {
  const context = use(ExerciseContext);
  if (!context)
    throw new Error(
      "useExerciseContext must be used within a ExerciseContextProvider",
    );
  return context;
};
