import { PetPost } from '../../../data';

export class FinderPetPostsService {
  async executeByFindAll() {
    const petPosts = await PetPost.find({
      where: {
        hasFound: true,
      },
      relations: {
        user: true,
      },
    });
    return petPosts;
  }
}
