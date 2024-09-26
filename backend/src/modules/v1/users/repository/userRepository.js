import { User } from '../model/userModel.js';

class UserRepository {
  async create(userData) {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  async findAll() {
    try {
      return await User.find();
    } catch (error) {
      throw new Error('Error finding all users: ' + error.message);
    }
  }

  async findById(userId) {
    try {
      return await User.findById(userId);
    } catch (error) {
      throw new Error('Error finding user by ID: ' + error.message);
    }
  }

  async findByEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw new Error('Error finding user by email: ' + error.message);
    }
  }

  async update(userId, updateData) {
    try {
      return await User.findByIdAndUpdate(userId, updateData, { new: true });
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  }

  async delete(userId) {
    try {
      return await User.findByIdAndDelete(userId);
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  }

  async comparePassword(user, candidatePassword) {
    try {
      if (!user) {
        throw new Error('User not found');
      }
      const isMatch = await user.comparePassword(candidatePassword);
      return isMatch;
    } catch (error) {
      throw new Error('Error comparing password: ' + error.message);
    }
  }
}

export const userRepository = new UserRepository();
