import { User } from '../../../data';

export class RegisterUserService {
  async execute(data: any) {
    const user = new User();
    user.username = data.username;
    user.email = data.email;
    user.password = data.password;
    try {
      await user.save();
      return {
        message: 'user created successfully',
      };
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }
}
