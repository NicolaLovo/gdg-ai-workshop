import { Server } from "socket.io";
import { ExerciseChat } from "./ExerciseChat.js";
import type { IoWssServer } from "./types/IoWss.js";

let wss: IoWssServer | null = null;

const chatsStore: { [key: string]: ExerciseChat } = {};

export const initWss = (server: any) => {
  wss = new Server(server, {
    path: "/home",
    cors: {
      origin: "*", //"http://localhost:3000",
    },
  });

  wss.on("connection", (socket) => {
    socket.on("client-exercise.chat.connect", (body, callback) => {
      const handle = new ExerciseChat({
        socketId: socket.id,
        exercise: body.exercise,
      });
      chatsStore[handle.chatId] = handle;
      console.log(`[ExerciseChat]: chat created with id ${handle.chatId}`);

      callback({ chatId: handle.chatId });
    });
    socket.on("client-exercise.chat.sendMessage", async (body, callback) => {
      const handle = chatsStore[body.chatId];
      if (!handle) {
        console.error("Chat handle not found for chatId:", body.chatId);
        return;
      }

      console.log(
        `[ExerciseChat ${body.chatId}]: received message from client`,
      );
      await handle.sendMessage(body.attempt, body.message, (chunk) => {
        socket.emit("server-exercise.chat.onChunk", {
          chatId: body.chatId,
          text: chunk,
        });
      });

      callback();
    });

    socket.on("client-exercise.chat.evaluate", async (body, callback) => {
      const handle = chatsStore[body.chatId];
      if (!handle) {
        console.error("Chat handle not found for chatId:", body.chatId);
        return;
      }

      console.log(`[ExerciseChat ${body.chatId}]: evaluation requested`);

      const result = await handle.evaluate(body.attempt);

      callback({
        message: {
          type: "evaluation",
          role: "assistant",
          evaluationGridCompiled: result.evaluationGridCompiled,
          comment: result.comment,
        },
      });
    });

    socket.on("client-exercise.chat.disconnect", async (body, callback) => {
      // console.log(`[ExerciseChat ${body.chatId}]: disconnect requested`);

      const handle = chatsStore[body.chatId];
      if (handle) {
        delete chatsStore[body.chatId];
      }
      callback();
    });

    socket.on("disconnect", async (reason) => {
      // console.log(`Socket ${socket.id} disconnected: ${reason}`);

      // find all chat handles associated with this socket and disconnect them
      const associatedChatHandles = Object.values(chatsStore).filter(
        (handle) => handle.socketId === socket.id,
      );

      for (const handle of associatedChatHandles) {
        delete chatsStore[handle.chatId];
        // console.log(
        //   `[ExerciseChat ${handle.chatId}]: disconnected due to socket disconnect`,
        // );
      }
    });
  });
};
