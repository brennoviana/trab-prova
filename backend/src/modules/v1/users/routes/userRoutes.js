import { Router } from "express";
import { userController } from "../controller/userController.js";
import { userCreateSchema } from "../schema/userCreateSchema.js";
import { validateRequestSchema } from "../../../../generic-middlewares/validateRequestSchema.js";
import { authenticateJWT } from "../../../../generic-middlewares/authenticateJWT.js";
import { validateUserExists } from "../middlewares/validateUserExists.js";
import { userUpdateSchema } from "../schema/userUpdateSchema.js";

const userRoutes = Router();

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Retorna a lista de usuários
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID do usuário
 *                   name:
 *                     type: string
 *                     description: Nome do usuário
 */
userRoutes.get("/", authenticateJWT, userController.getUsers);

userRoutes.get("/", authenticateJWT, userController.getUsers);

userRoutes.get(
  "/:id",
  authenticateJWT,
  validateUserExists,
  userController.getUserById,
);

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Creates a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 */
userRoutes.post(
  "/",
  validateRequestSchema(userCreateSchema),
  userController.createUser,
);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Updates an existing user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
userRoutes.put(
  "/:id",
  authenticateJWT,
  validateUserExists,
  validateRequestSchema(userUpdateSchema),
  userController.updateUser,
);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Deletes a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
userRoutes.delete(
  "/:id",
  authenticateJWT,
  validateUserExists,
  userController.deleteUser,
);

userRoutes.post("/login", userController.loginUser);

export { userRoutes };
