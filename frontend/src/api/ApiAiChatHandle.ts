import { sleep } from "../tools/sleep";
import type { AiChatMessage } from "../types/ai/AiChatMessage";
import type { AiWebSocketClient } from "../types/api/AiWebSocketClient";
import type { AiChatOnStreamChunkEvent } from "../types/api/AiWssEvents";

interface ApiAiChatHandleProps {
  socket: AiWebSocketClient;
  chatId: string;
}

export class ApiAiChatHandle {
  private socket: AiWebSocketClient;
  public chatId: string;

  constructor({ socket, chatId }: ApiAiChatHandleProps) {
    this.socket = socket;
    this.chatId = chatId;
  }

  public async sendMessage(body: {
    params: {
      message: string;

      attempt: string;
    };
    onChunk: (body: AiChatOnStreamChunkEvent) => void;
  }): Promise<void> {
    return new Promise((resolve) => {
      /**
       * I can listen to chunk events only for that wss connection stream,
       * so I cannot have a method that listens to onChunk, since
       * at each method we create a new socket connection.
       */

      const onChunkFn = (chunk: AiChatOnStreamChunkEvent) => {
        if (chunk.chatId === this.chatId) {
          body.onChunk(chunk);

          return;
        }
      };

      this.socket.on("server-exercise.chat.onChunk", onChunkFn);

      this.socket.emit(
        "client-exercise.chat.sendMessage",
        {
          ...body.params,
          chatId: this.chatId,
        },
        async () => {
          /**
           * Wait a bit to receive all chunks before disposing the socket,
           * otherwise some chunks may be lost.
           */
          resolve();

          await sleep(250);
          this.socket.off("server-exercise.chat.onChunk", onChunkFn);
        },
      );
    });
  }

  public async evaluate(body: {
    params: {
      attempt: string;
    };
  }): Promise<{
    message: AiChatMessage;
  }> {
    return new Promise((resolve) => {
      this.socket.emit(
        "client-exercise.chat.evaluate",
        {
          ...body.params,
          chatId: this.chatId,
        },
        (result) => {
          resolve(result);
        },
      );
    });
  }

  public async disconnect(): Promise<void> {
    return new Promise((resolve) => {
      this.socket.emit(
        "client-exercise.chat.disconnect",
        {
          chatId: this.chatId,
        },
        () => {
          resolve();
          this.socket.disconnect();
        },
      );
    });
  }
}
