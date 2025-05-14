import { Router } from 'express';
import { PetPostController } from './controller';
import { CreatorPetPostService } from './services/creator-pet-post.service';
import { EliminatorPetPostService } from './services/eliminator-pet-post.service';
import { FinderPetPostService } from './services/finder-pet-post.service';
import { FinderPetPostsService } from './services/finder-pet-posts.service';
import { UpdaterPetPostService } from './services/updater-pet-post.service';
import { ApprovePetPostService } from './services/approve-pet-post.service';
import { RejectPetPostService } from './services/reject-pet-post.service';

export class PetPostRoutes {
  static get routes(): Router {
    const router = Router();

    const creatorPetPostService = new CreatorPetPostService();
    const finderPetPostService = new FinderPetPostService();
    const finderPetPostsService = new FinderPetPostsService();
    const eliminatorPetPostService = new EliminatorPetPostService(
      finderPetPostService
    );
    const updaterPetPostService = new UpdaterPetPostService(
      finderPetPostService
    );
    const approvePetPostService = new ApprovePetPostService(
      finderPetPostService
    );
    const rejectPetPostService = new RejectPetPostService(finderPetPostService);

    const petPostController = new PetPostController(
      finderPetPostService,
      finderPetPostsService,
      creatorPetPostService,
      updaterPetPostService,
      eliminatorPetPostService,
      approvePetPostService,
      rejectPetPostService
    );

    router.get('/', petPostController.findAllPetPosts);
    router.get('/:id', petPostController.findPetPostById);
    router.post('/', petPostController.createPetPost);
    router.patch('/:id', petPostController.update);
    router.delete('/:id', petPostController.delete);
    router.patch('/:id/approve', petPostController.approve);
    router.patch('/:id/reject', petPostController.reject);

    return router;
  }
}
