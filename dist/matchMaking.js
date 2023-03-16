"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchMakingInit = void 0;
const uuid_1 = require("uuid");
const constants_1 = require("./constants");
const mapByElo = (queue) => {
    const thresholds = {};
    for (const player in queue) {
        const elo = queue[player];
        const range = Math.ceil(elo / 10) * 10;
        if (!thresholds[range]) {
            thresholds[range] = {};
        }
        thresholds[range][player] = elo;
    }
    return thresholds;
};
const groupPlayers = (separationMap, groupLength = 2) => {
    const finalCouples = [];
    Object.values(separationMap).forEach((groupOfPlayersByLvl) => {
        const playersToMatch = Object.entries(groupOfPlayersByLvl)
            .slice(0, groupLength)
            .map((entry) => entry[0]);
        if (playersToMatch.length < groupLength) {
            return;
        }
        finalCouples.push(playersToMatch);
    });
    return finalCouples;
};
const orchestrateGameInitialization = (io, playerGroups, players) => {
    playerGroups.forEach((playerGroup) => {
        const roomId = (0, uuid_1.v4)();
        playerGroup.forEach((player) => {
            players[player].join(roomId);
        });
        io.to(roomId).emit("game-started", {
            roomId,
            currentTurn: "o",
            [playerGroup[0]]: "x",
            [playerGroup[1]]: "o",
        });
        console.log("\n\nGame started in room: ", roomId);
        console.log("Players: ", playerGroup);
    });
};
const matchMakingInit = (io, queue, players, removePlayersFromQueue) => {
    setInterval(() => {
        const eloMap = mapByElo(queue);
        const playerGroups = groupPlayers(eloMap, 2);
        if (playerGroups.length === 0) {
            return;
        }
        orchestrateGameInitialization(io, playerGroups, players);
        playerGroups.forEach((playerGroup) => {
            removePlayersFromQueue(playerGroup);
        });
    }, constants_1.GAME_LOOP_TIMER);
};
exports.matchMakingInit = matchMakingInit;
//# sourceMappingURL=matchMaking.js.map