import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "@socket.io/component-emitter";

export type PutPlayerInQueueParams = {
  elo: number;
  uid: string;
  socketId: string;
};
export type PutPlayerInQueueFunction = (params: PutPlayerInQueueParams) => void;
export type IOServer = Server<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>;

export interface AppState {
  queue: Record<string, number>;
  players: Record<string, Socket>;
  playerUids: Record<string, string>;
  checkInPlayer: (socket: Socket) => void;
  checkOutPlayer: (socket: Socket) => void;
  manageDrawPoints: (playersUids: string[]) => void;
  removePlayersFromQueue: (socketIds: string[]) => void;
  putPlayerInQueue: (params: PutPlayerInQueueParams) => void;
  manageWinLosePoints: (winnerUid: string, loserUid: string) => void;
  updateBoard: (board: string[], index: number, turn: string) => string[];
}
