import { PetPostStatus } from '../../../data';
import { CustomError } from '../../../domain';
import { FinderPetPostService } from './finder-pet-post.service';

export class ApprovePetPostService {
  constructor(private readonly finderPetPostService: FinderPetPostService) {}

  async execute(id: string) {
    const petPost = await this.finderPetPostService.executeByFindOne(id);

    if (petPost.status === 'approved') {
      throw new Error('Pet post already approved');
    }

    petPost.status = PetPostStatus.APPROVED;

    try {
      await petPost.save();
      return {
        message: 'Pet post approved successfully',
      };
    } catch (error) {
      CustomError.internalServer('Error approving pet post');
    }
  }
}
