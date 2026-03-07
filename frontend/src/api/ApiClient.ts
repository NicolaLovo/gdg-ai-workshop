import type { Exercise } from "../types/exercise/Exercise";
import { ApiAiChatHandle } from "./ApiAiChatHandle";
import { createAiWebSocketClient } from "./createAiWebSocketClient";

export class ApiClient {
  constructor() {}

  public async connectExerciseChat(body: { exercise: Exercise }): Promise<{
    chatId: string;
    handle: ApiAiChatHandle;
  }> {
    const { socket } = createAiWebSocketClient();

    return new Promise((resolve) => {
      socket.emit("client-exercise.chat.connect", body, (result) => {
        const { chatId } = result;

        const handle = new ApiAiChatHandle({
          chatId,
          socket: socket,
        });

        resolve({
          chatId,
          handle,
        });
      });
    });
  }
}
