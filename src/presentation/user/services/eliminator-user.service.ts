import { FinderUserService } from './finder-user.service';

export class EliminatorUserService {
  constructor(private readonly finderUserService: FinderUserService) {}

  async execute(id: string) {
    const user = await this.finderUserService.executeByFindOne(id);

    user.status = false;

    try {
      await user.save();
      return {
        message: 'User deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  }
}
