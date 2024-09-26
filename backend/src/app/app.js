import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { routesHandler } from "./routesHandler.js";
import { socketHandler } from "./socketHandler.js";
import { socketService } from '../services/SocketService.js';

const app = express();

const server = createServer(app);

const io = new Server(server)
socketService.setIo(io);

socketHandler(io);

app.use(routesHandler);

export { server };
