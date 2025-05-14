import { FinderPetPostService } from './finder-pet-post.service';

export class UpdaterPetPostService {
  constructor(private readonly finderPetPostService: FinderPetPostService) {}

  async execute(id: string, data: any) {
    const petPost = await this.finderPetPostService.executeByFindOne(id);

    petPost.pet_name = data.pet_name;
    petPost.description = data.description;
    petPost.image_url = data.image_url;

    try {
      await petPost.save();
      return {
        message: 'Pet post updated successfully',
      };
    } catch (error) {
      console.error('Error updating pet post:', error);
      throw new Error('Failed to update pet post');
    }
  }
}
