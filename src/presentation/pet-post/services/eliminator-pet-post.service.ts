import { FinderPetPostService } from './finder-pet-post.service';

export class EliminatorPetPostService {
  constructor(private readonly finderPetPostService: FinderPetPostService) {}

  async execute(id: string) {
    const petPost = await this.finderPetPostService.executeByFindOne(id);

    petPost.hasFound = false;

    try {
      await petPost.save();
      return {
        message: 'Pet post deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting pet post:', error);
      throw new Error('Failed to delete pet post');
    }
  }
}
