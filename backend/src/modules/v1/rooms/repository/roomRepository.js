import { Room } from '../model/roomModel.js';

class RoomRepository {
  async create(userData) {
    try {
      const user = new Room(userData);
      await user.save();
      return user;
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  async getRooms() {
    try {
      return await User.find();
    } catch (error) {
      throw new Error('Error finding all users: ' + error.message);
    }
  }
}

const roomRepository = new RoomRepository();
export { roomRepository };