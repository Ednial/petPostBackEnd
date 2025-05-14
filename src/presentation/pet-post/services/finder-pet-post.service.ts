import { PetPost } from '../../../data';

export class FinderPetPostService {
  async executeByFindOne(id: string) {
    const petPost = await PetPost.findOne({
      where: {
        id,
        hasFound: true,
      },
    });

    if (!petPost) {
      throw new Error('Pet post not found');
    }

    return petPost;
  }
}
