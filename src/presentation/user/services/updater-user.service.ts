import { FinderUserService } from './finder-user.service';

export class UpdaterUserService {
  constructor(private readonly finderUserService: FinderUserService) {}

  async execute(id: string, data: any) {
    const user = await this.finderUserService.executeByFindOne(id);

    // Update the user properties with the new data
    user.username = data.username;
    user.email = data.email;
    user.password = data.password;
    user.role = data.role;
    user.status = data.status;

    try {
      await user.save();
      return {
        message: 'User updated successfully',
      };
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user');
    }
  }
}
