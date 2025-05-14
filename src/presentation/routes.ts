import { Router } from 'express';
import { PetPostRoutes } from './pet-post/routes';
import { UserRoutes } from './user/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/pet-posts', PetPostRoutes.routes);
    router.use('/api/users', UserRoutes.routes);

    return router;
  }
}
