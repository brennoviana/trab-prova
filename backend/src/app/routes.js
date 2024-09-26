import express from "express";
import { userRoutes } from "../modules/v1/users/routes/userRoutes.js";
import { roomRoutes } from "../modules/v1/rooms/routes/roomRoutes.js";
import { authenticateJWT } from "../generic-middlewares/authenticateJWT.js";

const router = express.Router();

router.use(express.json());
router.use("/api/v1/users", userRoutes); 
router.use("/api/v1/rooms", authenticateJWT, roomRoutes);

export { router };
