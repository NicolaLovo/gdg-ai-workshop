import { Server, Socket } from "socket.io";
import type { AiWssEvents } from "./AiWssEvents.js";

export type IoWssSocket = Socket<
  AiWssEvents["clientToServerEvents"],
  AiWssEvents["serverToClientEvents"],
  {},
  {}
>;

export type IoWssServer = Server<
  AiWssEvents["clientToServerEvents"],
  AiWssEvents["serverToClientEvents"],
  {},
  {}
>;
