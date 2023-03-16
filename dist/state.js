"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appState = void 0;
const services_1 = require("./firebase/services");
const appState = (db) => {
    let queue = {};
    let players = {};
    let playerUids = {};
    const checkInPlayer = (socket) => {
        players[socket.id] = socket;
    };
    const checkOutPlayer = (socket) => {
        delete players[socket.id];
        delete queue[socket.id];
        delete playerUids[socket.id];
    };
    const putPlayerInQueue = (params) => {
        const { socketId, elo, uid } = params;
        queue[socketId] = elo;
        playerUids[socketId] = uid;
    };
    const removePlayersFromQueue = (socketIds) => {
        socketIds.forEach((socketId) => {
            delete queue[socketId];
        });
        console.log("\n\nPlayers exit the queue ", socketIds);
    };
    const manageWinLosePoints = (winnerUid, loserUid) => {
        (0, services_1.increasePointsToPlayer)(db, "win", winnerUid);
        (0, services_1.decreasePointsToPlayer)(db, loserUid);
    };
    const manageDrawPoints = (playersUids) => {
        playersUids.forEach((uid) => {
            (0, services_1.increasePointsToPlayer)(db, "draw", uid);
        });
    };
    const updateBoard = (board, index, turn) => {
        if (index === -1)
            return board;
        if (board[index] !== "")
            return null;
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
exports.appState = appState;
//# sourceMappingURL=state.js.map