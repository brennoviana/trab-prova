import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { routesHandler } from "./routesHandler.js";
import { socketHandler } from "./socketHandler.js";
import cors from "cors";

const app = express();

const server = createServer(app);

const io = new Server(server)

socketHandler(io);

app.use(cors());
app.use(routesHandler);

export { server };
