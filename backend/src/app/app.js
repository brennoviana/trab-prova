import express from "express";
import { userRoutes } from "../modules/v1/users/routes/userRoutes.js";
import { roomRoutes } from "../modules/v1/rooms/routes/roomRoutes.js";
import { authenticateJWT } from "../generic-middlewares/authenticateJWT.js";

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/rooms", authenticateJWT, roomRoutes);

export { app };
