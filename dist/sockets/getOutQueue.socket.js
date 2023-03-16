"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOutOfQueue = void 0;
const getOutOfQueue = (socket, removePlayerFromQueue) => {
    return socket.on("remove-player-from-queue", (params) => {
        console.log(`\nPlayer ${params.socketId} is out of queue [${params.uid}]`);
        removePlayerFromQueue([params.socketId]);
    });
};
exports.getOutOfQueue = getOutOfQueue;
//# sourceMappingURL=getOutQueue.socket.js.map