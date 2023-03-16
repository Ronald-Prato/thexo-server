"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketsInit = void 0;
const sockets_1 = require("./sockets/");
// const { admin, db } = firebaseInit();
// const handleSendMessage = async (messageData) => {
//   const newMessageRef = db.collection("messages").doc();
//   // Escribir el nuevo mensaje en Firestore en forma de lote.
//   const writeBatch = db.batch();
//   writeBatch.set(newMessageRef, messageData);
//   // Enviar las operaciones de escritura a Firestore de forma concurrente.
//   await Promise.all([writeBatch.commit()]);
//   console.log("Mensaje guardado en Firestore");
// };
// Game Logic Variables
let board = new Array(9).fill("");
const socketsInit = (io, state) => {
    const { queue, checkInPlayer, checkOutPlayer, putPlayerInQueue, removePlayersFromQueue, } = state;
    return io.on("connection", (socket) => {
        console.log("New connection: ", socket.id);
        const socketId = socket.id;
        checkInPlayer(socket);
        io.to(socketId).emit("your-id", socketId);
        (0, sockets_1.getInQueue)(socket, putPlayerInQueue);
        (0, sockets_1.playerTurnMove)(io, socket, state);
        (0, sockets_1.getOutOfQueue)(socket, removePlayersFromQueue);
        // =========================== TEST ================================
        socket.on("test-players-variable", () => {
            console.log(queue);
        });
        socket.on("disconnect", () => {
            checkOutPlayer(socket);
        });
    });
};
exports.socketsInit = socketsInit;
//# sourceMappingURL=sockets.js.map