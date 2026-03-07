import type { AiChatMessage } from "../ai/AiChatMessage";
import type { Exercise } from "../exercise/Exercise";

export interface AiChatOnStreamChunkEvent {
  chatId: string;

  /**
   * Value of the chunk
   */
  text: string;
}

export interface AiWssEvents {
  clientToServerEvents: {
    "client-exercise.chat.connect": (
      body: {
        exercise: Exercise;
      },
      callback: (res: { chatId: string }) => void,
    ) => void;
    "client-exercise.chat.sendMessage": (
      body: {
        chatId: string;
        attempt: string;
        message: string;
      },
      /**
       * Called when the response has been fully received
       * After this callback is called, no more data will be sent for this request
       * and a new message can be sent by the client
       */
      callback: () => void,
    ) => void;
    "client-exercise.chat.evaluate": (
      params: {
        chatId: string;
        attempt: string;
      },
      callback: (result: { message: AiChatMessage }) => void,
    ) => void;
    "client-exercise.chat.disconnect": (
      body: {
        chatId: string;
      },
      callback: () => void,
    ) => void;
  };

  serverToClientEvents: {
    "server-exercise.chat.onChunk": (params: AiChatOnStreamChunkEvent) => void;
  };
}
