import { Router } from "express";
import { roomController } from "../controller/roomController.js";
import { roomCreateSchema } from "../schema/roomCreateSchema.js";
import { validateRequestSchema } from "../../../../generic-middlewares/validateRequestSchema.js";

const roomRoutes = Router();

roomRoutes.get("/", roomController.getRooms);

roomRoutes.post(
  "/",
  validateRequestSchema(roomCreateSchema),
  roomController.createRoom,
);

export { roomRoutes };
