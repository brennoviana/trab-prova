import express from "express";
import { userRoutes } from "../modules/v1/users/routes/userRoutes.js";
import { roomRoutes } from "../modules/v1/rooms/routes/roomRoutes.js";
import { authenticateJWT } from "../generic-middlewares/authenticateJWT.js";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();

const server = createServer(app);

const io = new Server(server)

io.on('connection', (socket) => {
    console.log('socket connected');
  
    socket.emit('test', 'Hello Testing event!');
});

app.use(express.json());

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/rooms", authenticateJWT, roomRoutes);

export { server }; 
