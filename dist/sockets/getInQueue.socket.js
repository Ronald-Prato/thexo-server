"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInQueue = void 0;
const getInQueue = (socket, putPlayerInQueue) => {
    return socket.on("put-player-in-queue", (params) => {
        console.log(`\nPlayer ${params.socketId} is in queue [${params.uid}]`);
        putPlayerInQueue(params);
    });
};
exports.getInQueue = getInQueue;
//# sourceMappingURL=getInQueue.socket.js.map