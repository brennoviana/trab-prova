import { roomRepository } from '../repository/roomRepository.js';
import { ResponseFormatter } from '../../../../utils/success.js';
import {
  ValidationError,
  NotFoundError,
  AuthenticationError,
  DuplicateFieldError,
  ErrorHandler,
} from '../../../../utils/errors.js';

class RoomController {
  async getRooms(req, res) {
    try {
      const rooms = await roomRepository.findAll();

      if (rooms.length === 0) {
        return ErrorHandler.formatResponse(res, new NotFoundError('No rooms available.'));
      }

      return ResponseFormatter.send(res, rooms, 'Rooms found successfully.');
    } catch (error) {
      ErrorHandler.formatResponse(res, error);
    }
  }

  async createRoom(req, res) {
    try {
      const { name, capacity } = req.body;

      if (!name || !capacity) {
        return ErrorHandler.formatResponse(res, new ValidationError('Name and capacity are required.'));
      }

      const newRoom = await roomRepository.create({ name, capacity, ...req.body });

      return ResponseFormatter.send(res, newRoom, 'Room created successfully.', 201);
    } catch (error) {
      if (error.code === 11000) {
        const duplicateField = Object.keys(error.keyValue)[0];
        return ErrorHandler.formatResponse(res, new DuplicateFieldError(duplicateField));
      }
      ErrorHandler.formatResponse(res, error);
    }
  }
}

const roomController = new RoomController();
export { roomController };
