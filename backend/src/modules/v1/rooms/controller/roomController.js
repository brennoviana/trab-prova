import { roomRepository } from '../repository/roomRepository.js';
import { ResponseFormatter } from '../../../../utils/success.js';
import {
  NotFoundError,
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
      return ErrorHandler.formatResponse(res, error);
    }
  }

  async createRoom(req, res) {
    try {
      const newRoom = await roomRepository.create(req.body);

      return ResponseFormatter.send(res, newRoom, 'Room created successfully.', 201);
    } catch (error) {
      if (error.code === 11000) {
        const duplicateField = Object.keys(error.keyValue)[0];
        return ErrorHandler.formatResponse(res, new DuplicateFieldError(duplicateField));
      }
      return ErrorHandler.formatResponse(res, error);
    }
  }

  async joinRoom(req, res) {
    try {
      const roomId = req.params.id;

      const room = await roomRepository.findById(roomId);
      if (!room) {
        return ErrorHandler.formatResponse(res, new NotFoundError('Room not found'));
      }

      room.participants = room.participants || [];
      if (room.participants.includes(req.user.id)) {
        return ErrorHandler.formatResponse(res, new DuplicateFieldError('User already joined the room'));
      }
      
      room.participants.push(req.user.id);
      await roomRepository.update(roomId, { participants: room.participants });

      return ResponseFormatter.send(res, room, 'User joined the room successfully.');
    } catch (error) {
      return ErrorHandler.formatResponse(res, error);
    }
  }
}

const roomController = new RoomController();
export { roomController };
