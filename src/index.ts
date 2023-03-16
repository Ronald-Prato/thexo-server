import http from "http";
import cors from "cors";
import express from "express";
import { Server } from "socket.io";

import { appState } from "./state";
import { serverInit } from "./server";
import { socketsInit } from "./sockets";
import { matchMakingInit } from "./matchMaking";
import { firebaseInit } from "./firebase/firebaseInit";

const app = express();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const { db } = firebaseInit();
const state = appState(db);

socketsInit(io, state);
matchMakingInit(io, state.queue, state.players, state.removePlayersFromQueue);
serverInit(server, app, db);
