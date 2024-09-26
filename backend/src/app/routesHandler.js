import express from "express";
import { userRoutes } from "../modules/v1/users/routes/userRoutes.js";
import { roomRoutes } from "../modules/v1/rooms/routes/roomRoutes.js";
import { authenticateJWT } from "../generic-middlewares/authenticateJWT.js";

const routesHandler = express.Router();

routesHandler.use(express.json());
routesHandler.use("/api/v1/users", userRoutes); 
routesHandler.use("/api/v1/rooms", authenticateJWT, roomRoutes);

export { routesHandler };
