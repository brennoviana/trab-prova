import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { router } from "./routes.js";
import { socketHandler } from "./socketHandler.js";

const app = express();

const server = createServer(app);

const io = new Server(server)

socketHandler(io);

app.use(router);

export { server };
