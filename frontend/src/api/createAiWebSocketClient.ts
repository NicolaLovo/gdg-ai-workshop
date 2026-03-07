import { io } from "socket.io-client";
import type { AiWebSocketClient } from "../types/api/AiWebSocketClient";

/**
 * Creates and connects a WebSocket for AI.
 * @param jwtToken - The JWT token for authentication.
 *
 * Returns an object containing the connected socket and a dispose function to disconnect it.
 */
export const createAiWebSocketClient = () => {
  const socket: AiWebSocketClient = io("ws://localhost:4000", {
    transports: ["websocket"],
    path: "/home",
  });
  socket.connect();

  return {
    socket,
    dispose: () => {
      socket.disconnect();
    },
  };
};
