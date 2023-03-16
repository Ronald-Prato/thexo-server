import { Socket } from "socket.io";
import {
  decreasePointsToPlayer,
  increasePointsToPlayer,
} from "./firebase/services";
import { AppState, PutPlayerInQueueParams } from "./types";

export const appState = (db: FirebaseFirestore.Firestore): AppState => {
  let queue = {};
  let players = {};
  let playerUids = {};

  const checkInPlayer = (socket: Socket) => {
    players[socket.id] = socket;
  };

  const checkOutPlayer = (socket: Socket) => {
    delete players[socket.id];
    delete queue[socket.id];
    delete playerUids[socket.id];
  };

  const putPlayerInQueue = (params: PutPlayerInQueueParams) => {
    const { socketId, elo, uid } = params;
    queue[socketId] = elo;
    playerUids[socketId] = uid;
  };

  const removePlayersFromQueue = (socketIds: string[]) => {
    socketIds.forEach((socketId) => {
      delete queue[socketId];
    });
    console.log("\n\nPlayers exit the queue ", socketIds);
  };

  const manageWinLosePoints = (winnerUid: string, loserUid: string) => {
    increasePointsToPlayer(db, "win", winnerUid);
    decreasePointsToPlayer(db, loserUid);
  };

  const manageDrawPoints = (playersUids: string[]) => {
    playersUids.forEach((uid) => {
      increasePointsToPlayer(db, "draw", uid);
    });
  };

  const updateBoard = (
    board: string[],
    index: number,
    turn: string
  ): string[] => {
    if (index === -1) return board;

    if (board[index] !== "") return null;

    let newBoard = [...board];
    newBoard[index] = turn;
    board = newBoard;
    return newBoard;
  };

  return {
    queue,
    players,
    playerUids,
    updateBoard,
    checkInPlayer,
    checkOutPlayer,
    putPlayerInQueue,
    manageDrawPoints,
    manageWinLosePoints,
    removePlayersFromQueue,
  };
};
