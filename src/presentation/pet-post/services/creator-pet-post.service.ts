import { PetPost } from '../../../data';
import { CustomError } from '../../../domain';

export class CreatorPetPostService {
  async execute(data: any) {
    const petPost = new PetPost();
    petPost.pet_name = data.pet_name;
    petPost.description = data.description;
    petPost.image_url = data.image_url;
    petPost.owner = data.owner;

    try {
      await petPost.save();
      return {
        message: 'Pet post created successfully',
      };
    } catch (error) {
      console.error('Error creating pet post:', error);
      throw CustomError.internalServer('Failed to create pet post');
    }
  }
}
