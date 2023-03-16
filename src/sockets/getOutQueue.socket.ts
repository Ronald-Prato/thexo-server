import { Socket } from "socket.io";
import { PutPlayerInQueueFunction, PutPlayerInQueueParams } from "../types";

export const getOutOfQueue = (
  socket: Socket,
  removePlayerFromQueue: (users: string[]) => void
) => {
  return socket.on(
    "remove-player-from-queue",
    (params: PutPlayerInQueueParams) => {
      console.log(
        `\nPlayer ${params.socketId} is out of queue [${params.uid}]`
      );
      removePlayerFromQueue([params.socketId]);
    }
  );
};
