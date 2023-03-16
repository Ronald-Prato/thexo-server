"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerTurnMove = void 0;
const game_logic_1 = require("../utils/game-logic");
const ranking_1 = require("../ranking");
const playerTurnMove = (io, socket, appState) => {
    const { pointsPerDraw, pointsPerLoss, pointsPerWin } = (0, ranking_1.ranking)();
    const { updateBoard, playerUids, manageDrawPoints, manageWinLosePoints } = appState;
    return socket.on("move", (data) => {
        const { index, turn, roomId, board, uid } = data;
        const updatedBoard = updateBoard(board, index, turn);
        if (!updatedBoard)
            return;
        io.to(roomId).emit("player-moved", {
            board: updatedBoard,
            turnThatJustMoved: turn,
            currentTurn: turn === "x" ? "o" : "x",
        });
        const gameResult = (0, game_logic_1.calcWinner)(updatedBoard);
        console.log(updatedBoard, gameResult);
        if (!gameResult)
            return;
        const socketsInRoom = Array.from(io.sockets.adapter.rooms.get(roomId));
        const playersInRoom = socketsInRoom.map((socketId) => playerUids[socketId]);
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
        io.to(roomId).emit("game-over", Object.assign(Object.assign({}, gameResult), { pointsEarned: {
                [winnerUid]: `+${pointsPerWin} pts`,
                [loserUid]: `-${pointsPerLoss} pts`,
            } }));
        console.log("\n\n\n", Object.assign(Object.assign({}, gameResult), { pointsEarned: {
                [winnerUid]: `+${pointsPerWin} pts`,
                [loserUid]: `-${pointsPerLoss} pts`,
            } }), roomId);
        manageWinLosePoints(winnerUid, loserUid);
    });
};
exports.playerTurnMove = playerTurnMove;
//# sourceMappingURL=playerTurnMove.socket.js.map