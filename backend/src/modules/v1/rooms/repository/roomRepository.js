import { Room } from '../model/roomModel.js';

class RoomRepository {
  async create(userData) {
    try {
      const room = new Room(userData);
      await room.save();
      return room;
    } catch (error) {
      throw new Error('Error creating room: ' + error.message);
    }
  }

  async findAll() {
    try {
      return await Room.find();
    } catch (error) {
      throw new Error('Error finding all room: ' + error.message);
    }
  }

  async findById(roomId) {
    return Room.findById(roomId);
  }

  async update(roomId, updateData) {
    return Room.findByIdAndUpdate(roomId, updateData, { new: true });
  }
}

const roomRepository = new RoomRepository();
export { roomRepository };