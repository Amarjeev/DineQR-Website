import { io, Socket } from "socket.io-client";
import type { ManagerOptions, SocketOptions } from "socket.io-client";
import { SocketUrl } from "../BaseUrl/BaseUrl";

// Define fallback EventsMap type
type EventsMap = Record<string, (...args: any[]) => void>;

// ✅ Generic reusable socket connection factory
export const createSocketConnection = <
  ServerToClientEvents extends EventsMap,
  ClientToServerEvents extends EventsMap
>(
  options?: Partial<ManagerOptions & SocketOptions>
): Socket<ServerToClientEvents, ClientToServerEvents> => {
  return io(SocketUrl, {
    withCredentials: true,
    transports: ["websocket", "polling"],
    extraHeaders: { "my-custom-header": "DineQR" },
    ...options,
  });
};
