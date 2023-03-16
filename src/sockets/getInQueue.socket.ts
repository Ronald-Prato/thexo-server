import { Socket } from "socket.io";
import { PutPlayerInQueueFunction, PutPlayerInQueueParams } from "../types";

export const getInQueue = (
  socket: Socket,
  putPlayerInQueue: PutPlayerInQueueFunction
) => {
  return socket.on("put-player-in-queue", (params: PutPlayerInQueueParams) => {
    console.log(`\nPlayer ${params.socketId} is in queue [${params.uid}]`);
    putPlayerInQueue(params);
  });
};
