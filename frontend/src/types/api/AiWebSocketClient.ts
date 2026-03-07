import { Socket } from "socket.io-client";
import type { AiWssEvents } from "./AiWssEvents";

export type AiWebSocketClient = Socket<
  AiWssEvents["serverToClientEvents"],
  AiWssEvents["clientToServerEvents"]
>;
