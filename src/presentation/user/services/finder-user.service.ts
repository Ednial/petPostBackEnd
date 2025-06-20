import { User } from '../../../data';
import { CustomError } from '../../../domain';

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
      throw CustomError.notFound('User not found');
    }

    return user;
  }
}
