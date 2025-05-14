import { User } from '../../../data';

export class FinderUserService {
  async executeByFindOne(id: string) {
    const user = await User.findOne({
      select: ['id', 'username', 'email', 'role'],
      where: {
        id,
        status: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
