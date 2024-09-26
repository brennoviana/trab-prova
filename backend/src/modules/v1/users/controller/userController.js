import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../../../../config/env/envConfig.js';
import { userRepository } from '../repository/userRepository.js';
import { ResponseFormatter } from '../../../../utils/success.js';
import {
  ValidationError,
  NotFoundError,
  AuthenticationError,
  DuplicateFieldError,
  ErrorHandler,
} from '../../../../utils/errors.js';

class UserController {
  async getUsers(req, res) {
    try {
      const users = await userRepository.findAll();

      if (users.length === 0) {
        return ErrorHandler.formatResponse(res, new NotFoundError('No users registered.'));
      }

      const usersWithoutPasswords = users.map((user) => {
        const { password, ...userWithoutPassword } = user.toObject();
        return userWithoutPassword;
      });

      return ResponseFormatter.send(res, usersWithoutPasswords, 'Users found successfully.');
    } catch (error) {
      ErrorHandler.formatResponse(res, error);
    }
  }

  async getUserById(req, res) {
    try {
      const user = await userRepository.findById(req.params.id);

      if (!user) {
        return ErrorHandler.formatResponse(res, new NotFoundError('User not found.'));
      }

      const userWithoutPassword = { ...user.toObject(), password: undefined };

      return ResponseFormatter.send(res, userWithoutPassword, 'User retrieved successfully.');
    } catch (error) {
      ErrorHandler.formatResponse(res, error);
    }
  }

  async createUser(req, res) {
    try {

      const newUser = await userRepository.create(req.body);

      const userWithoutPassword = { ...newUser.toObject(), password: undefined };

      return ResponseFormatter.send(res, userWithoutPassword, 'User created successfully.', 201);
    } catch (error) {
      if (error.code === 11000) {
        const duplicateField = Object.keys(error.keyValue)[0];
        return ErrorHandler.formatResponse(res, new DuplicateFieldError(duplicateField));
      }
      ErrorHandler.formatResponse(res, error);
    }
  }

  async updateUser(req, res) {
    try {
      const updatedUser = await userRepository.update(req.params.id, req.body);

      if (updatedUser) {
        return ResponseFormatter.send(res, null, 'User successfully updated.');
      }

      return ErrorHandler.formatResponse(res, new ValidationError('Failed to update user.'));
    } catch (error) {
      if (error.code === 11000) {
        return ErrorHandler.formatResponse(res, new DuplicateFieldError('Email'));
      }
      ErrorHandler.formatResponse(res, error);
    }
  }

  async deleteUser(req, res) {
    try {
      const deletedUser = await userRepository.delete(req.params.id);

      if (deletedUser) {
        return ResponseFormatter.send(res, null, 'User successfully deleted.');
      }

      return ErrorHandler.formatResponse(res, new NotFoundError('User not found.'));
    } catch (error) {
      ErrorHandler.formatResponse(res, error);
    }
  }

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const user = await userRepository.findByEmail(email);

      if (!user) {
        return ErrorHandler.formatResponse(res, new AuthenticationError('Invalid email or password.'));
      }

      const isPasswordValid = await userRepository.comparePassword(user, password);

      if (!isPasswordValid) {
        return ErrorHandler.formatResponse(res, new AuthenticationError('Invalid email or password.'));
      }

      const token = jwt.sign(
        { id: user._id, email: user.email },
        config.jwtSecret,
        { expiresIn: '1h' },
      );

      return ResponseFormatter.send(res, { token }, 'Login successful.');
    } catch (error) {
      ErrorHandler.formatResponse(res, error);
    }
  }
}

const userController = new UserController();
export { userController };
