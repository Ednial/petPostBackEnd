import { PetPostStatus } from '../../../data';
import { FinderPetPostService } from './finder-pet-post.service';

export class RejectPetPostService {
  constructor(private readonly finderPetPostService: FinderPetPostService) {}

  async execute(id: string) {
    const petPost = await this.finderPetPostService.executeByFindOne(id);

    if (petPost.status === 'rejected') {
      throw new Error('Pet post already rejected');
    }

    petPost.status = PetPostStatus.REJECTED;

    try {
      await petPost.save();
      return {
        message: 'Pet post rejected successfully',
      };
    } catch (error) {
      console.error('Error rejecting pet post:', error);
      throw new Error('Failed to reject pet post');
    }
  }
}
