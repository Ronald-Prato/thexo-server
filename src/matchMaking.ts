import { v4 as uuidv4 } from "uuid";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

import { GAME_LOOP_TIMER } from "./constants";
import { IOServer } from "./types";

type EloMap = Record<string, Record<string, number>>;
type PlayerCouples = Array<Array<string>>;

const mapByElo = (queue: Record<string, number>): EloMap => {
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

const groupPlayers = (separationMap: EloMap, groupLength: number = 2) => {
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

const orchestrateGameInitialization = (
  io: IOServer,
  playerGroups: PlayerCouples,
  players: Record<string, Socket>
) => {
  playerGroups.forEach((playerGroup) => {
    const roomId = uuidv4();

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

export const matchMakingInit = (
  io: IOServer,
  queue: Record<string, number>,
  players: Record<string, Socket>,
  removePlayersFromQueue: (socketIds: string[]) => void
) => {
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
  }, GAME_LOOP_TIMER);
};
