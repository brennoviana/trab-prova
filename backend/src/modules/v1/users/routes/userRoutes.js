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
 *     summary: Returns a list of users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: User ID
 *                   name:
 *                     type: string
 *                     description: User name
 */
userRoutes.get("/", authenticateJWT, userController.getUsers);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Returns a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: The user information
 *       404:
 *         description: User not found
 */
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
 *     security:
 *       - bearerAuth: []
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
 *     security:
 *       - bearerAuth: []
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

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Authenticates a user and returns a JWT token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       401:
 *         description: Authentication failed
 */
userRoutes.post("/login", userController.loginUser);

export { userRoutes };
