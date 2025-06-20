import { encryptAdapter } from '../../../config/bcrypt.adapter';
import { User } from '../../../data';
import { CustomError, RegisterUserDto } from '../../../domain';

export class RegisterUserService {
  async execute(data: RegisterUserDto) {
    const user = new User();
    user.username = data.fullname;
    user.email = data.email;
    user.password = encryptAdapter.hash(data.password);
    try {
      await user.save();
      return {
        message: 'user created successfully',
      };
    } catch (error) {
      console.error('Error creating user:', error);
      throw CustomError.internalServer('Failed to create user');
    }
  }
}
