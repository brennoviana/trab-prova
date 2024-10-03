import { Router } from "express";
import { roomController } from "../controller/roomController.js";
import { roomCreateSchema } from "../schema/roomCreateSchema.js";
import { validateRequestSchema } from "../../../../generic-middlewares/validateRequestSchema.js";

const roomRoutes = Router();

/**
 * @swagger
 * /api/v1/rooms:
 *   get:
 *     summary: Returns a list of rooms
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The room ID
 *                   name:
 *                     type: string
 *                     description: The room name
 */
roomRoutes.get("/", roomController.getRooms);

/**
 * @swagger
 * /api/v1/rooms:
 *   post:
 *     summary: Creates a new room
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoomCreate'
 *     responses:
 *       201:
 *         description: Room created successfully
 *       400:
 *         description: Validation error
 */
roomRoutes.post(
  "/",
  validateRequestSchema(roomCreateSchema),
  roomController.createRoom,
);

/**
 * @swagger
 * /api/v1/rooms/{id}/join:
 *   post:
 *     summary: Join a room by ID
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the room to join
 *     responses:
 *       200:
 *         description: User successfully joined the room
 *       404:
 *         description: Room not found
 */
roomRoutes.post(
  "/:id/join",
  roomController.joinRoom
);

export { roomRoutes };
