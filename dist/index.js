"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const state_1 = require("./state");
const server_1 = require("./server");
const sockets_1 = require("./sockets");
const matchMaking_1 = require("./matchMaking");
const firebaseInit_1 = require("./firebase/firebaseInit");
const app = (0, express_1.default)();
var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
const { db } = (0, firebaseInit_1.firebaseInit)();
const state = (0, state_1.appState)(db);
(0, sockets_1.socketsInit)(io, state);
(0, matchMaking_1.matchMakingInit)(io, state.queue, state.players, state.removePlayersFromQueue);
(0, server_1.serverInit)(server, app, db);
//# sourceMappingURL=index.js.map