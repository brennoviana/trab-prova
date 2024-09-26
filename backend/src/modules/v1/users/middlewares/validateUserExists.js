import { userRepository } from "../repository/userRepository.js";

import {
  ValidationError,
  NotFoundError,
  ErrorHandler
} from "../../../../utils/errors.js";

async function validateUserExists(req, res, next) {
  try {
    const userId = req.body.userId || req.params.id;

    if (!userId) {
      return ErrorHandler.formatResponse(res, new ValidationError("User ID is required."));
    }

    const user = await userRepository.findById(userId);
    if (!user) {
      return ErrorHandler.formatResponse(res, new NotFoundError("User not found."));
    }

    req.user = user;

    next();
  } catch (error) {
    ErrorHandler.formatResponse(res, error);
  }
}

export { validateUserExists };
