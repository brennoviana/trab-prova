import express from "express";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { userRoutes } from "../modules/v1/users/routes/userRoutes.js";
import { roomRoutes } from "../modules/v1/rooms/routes/roomRoutes.js";
import { authenticateJWT } from "../generic-middlewares/authenticateJWT.js";
import { swaggerOptions } from "../config/swagger/swaggerConfig.js";

const routesHandler = express.Router();
const swaggerDocs = swaggerJsdoc(swaggerOptions);

routesHandler.use(express.json());
routesHandler.use("/api/v1/users", userRoutes); 
routesHandler.use("/api/v1/rooms", authenticateJWT, roomRoutes);
routesHandler.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export { routesHandler };
