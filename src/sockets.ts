import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

import { firebaseInit } from "./firebase/firebaseInit";
import { calcWinner } from "./utils/game-logic";
import { playerTurnMove, getInQueue, getOutOfQueue } from "./sockets/";
import { appState } from "./state";
import { AppState } from "./types";

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

export const socketsInit = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  state: AppState
) => {
  const {
    queue,
    checkInPlayer,
    checkOutPlayer,
    putPlayerInQueue,
    removePlayersFromQueue,
  } = state;

  return io.on("connection", (socket) => {
    console.log("New connection: ", socket.id);
    const socketId = socket.id;
    checkInPlayer(socket);

    io.to(socketId).emit("your-id", socketId);

    getInQueue(socket, putPlayerInQueue);
    playerTurnMove(io, socket, state);
    getOutOfQueue(socket, removePlayersFromQueue);

    // =========================== TEST ================================
    socket.on("test-players-variable", () => {
      console.log(queue);
    });

    socket.on("disconnect", () => {
      checkOutPlayer(socket);
    });
  });
};
