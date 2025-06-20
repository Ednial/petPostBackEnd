import { Router } from 'express';
import { PetPostController } from './controller';
import { CreatorPetPostService } from './services/creator-pet-post.service';
import { EliminatorPetPostService } from './services/eliminator-pet-post.service';
import { FinderPetPostService } from './services/finder-pet-post.service';
import { FinderPetPostsService } from './services/finder-pet-posts.service';
import { UpdaterPetPostService } from './services/updater-pet-post.service';
import { ApprovePetPostService } from './services/approve-pet-post.service';
import { RejectPetPostService } from './services/reject-pet-post.service';
import { AuthMiddleware } from '../common/middlewares/auth.middleware';
import { Role } from '../../data';

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

    router.use(AuthMiddleware.protect);
    router.get('/', petPostController.findAllPetPosts);
    router.get('/:id', petPostController.findPetPostById);
    router.post(
      '/',
      AuthMiddleware.restrictTo(Role.USER),
      petPostController.createPetPost
    );
    router.patch(
      '/:id',
      AuthMiddleware.restrictTo(Role.ADMIN),
      petPostController.update
    );
    router.delete(
      '/:id',
      AuthMiddleware.restrictTo(Role.ADMIN),
      petPostController.delete
    );
    router.patch(
      '/:id/approve',
      AuthMiddleware.restrictTo(Role.ADMIN),
      petPostController.approve
    );
    router.patch(
      '/:id/reject',
      AuthMiddleware.restrictTo(Role.ADMIN),
      petPostController.reject
    );

    return router;
  }
}
