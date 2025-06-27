import { PetPost } from '../../../data';
import { CustomError } from '../../../domain';

export class FinderPetPostService {
  async executeByFindOne(id: string) {
    const petPost = await PetPost.findOne({
      where: {
        id,
        hasFound: true,
      },
      relations: {
        user: true,
      },
    });

    if (!petPost) {
      throw CustomError.notFound('Pet post not found');
    }

    return petPost;
  }
}
