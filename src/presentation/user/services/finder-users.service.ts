import { User } from '../../../data';

export class FinderUsersService {
  async executeByFindAll() {
    const users = await User.find({
      select: ['id', 'username', 'email', 'role'],

      where: {
        status: true,
      },
    });
    return users;
  }
}
