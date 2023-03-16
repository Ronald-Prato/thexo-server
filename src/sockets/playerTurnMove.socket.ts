import { Socket } from "socket.io";
import { calcWinner } from "../utils/game-logic";
import { AppState, IOServer } from "../types";
import { ranking } from "../ranking";

export const playerTurnMove = (
  io: IOServer,
  socket: Socket,
  appState: AppState
) => {
  const { pointsPerDraw, pointsPerLoss, pointsPerWin } = ranking();
  const { updateBoard, playerUids, manageDrawPoints, manageWinLosePoints } =
    appState;

  return socket.on(
    "move",
    (data: {
      index: number;
      turn: string;
      uid: string;
      roomId: string;
      board: string[];
    }) => {
      const { index, turn, roomId, board, uid } = data;

      const updatedBoard = updateBoard(board, index, turn);
      if (!updatedBoard) return;

      io.to(roomId).emit("player-moved", {
        board: updatedBoard,
        turnThatJustMoved: turn,
        currentTurn: turn === "x" ? "o" : "x",
      });

      const gameResult = calcWinner(updatedBoard);
      console.log(updatedBoard, gameResult);

      if (!gameResult) return;

      const socketsInRoom = Array.from(io.sockets.adapter.rooms.get(roomId));
      const playersInRoom = socketsInRoom.map(
        (socketId) => playerUids[socketId]
      );
      const winnerUid = playersInRoom.find((playerUid) => playerUid === uid);
      const loserUid = playersInRoom.find((playerUid) => playerUid !== uid);

      if (gameResult.winner === "draw") {
        io.to(roomId).emit("game-over", {
          winner: "draw",
          pointsEarned: {
            [winnerUid]: `+${pointsPerDraw} pts`,
            [loserUid]: `+${pointsPerDraw} pts`,
          },
        });
        manageDrawPoints(playersInRoom);
        return;
      }

      io.to(roomId).emit("game-over", {
        ...gameResult,
        pointsEarned: {
          [winnerUid]: `+${pointsPerWin} pts`,
          [loserUid]: `-${pointsPerLoss} pts`,
        },
      });
      console.log(
        "\n\n\n",
        {
          ...gameResult,
          pointsEarned: {
            [winnerUid]: `+${pointsPerWin} pts`,
            [loserUid]: `-${pointsPerLoss} pts`,
          },
        },
        roomId
      );
      manageWinLosePoints(winnerUid, loserUid);
    }
  );
};
