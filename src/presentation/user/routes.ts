import { Router } from 'express';

import { UserController } from './controller';
import { EliminatorUserService } from './services/eliminator-user.service';
import { FinderUserService } from './services/finder-user.service';
import { FinderUsersService } from './services/finder-users.service';
import { LoginUserService } from './services/login-user.service';
import { RegisterUserService } from './services/register-user.service';
import { UpdaterUserService } from './services/updater-user.service';
import { AuthMiddleware } from '../common/middlewares/auth.middleware';
import { Role } from '../../data';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const finderUserService = new FinderUserService();
    const finderUsersService = new FinderUsersService();
    const registerUserService = new RegisterUserService();
    const loginUserService = new LoginUserService();
    const updaterUserService = new UpdaterUserService(finderUserService);
    const eliminatorUserService = new EliminatorUserService(finderUserService);

    const userController = new UserController(
      finderUserService,
      finderUsersService,
      registerUserService,
      loginUserService,
      updaterUserService,
      eliminatorUserService
    );

    router.post('/register', userController.register);
    router.post('/login', userController.login);
    router.use(AuthMiddleware.protect);
    router.get(
      '/',
      AuthMiddleware.restrictTo(Role.ADMIN),
      userController.findAllUsers
    );
    router.get('/:id', userController.findUserById);
    router.patch(
      '/:id',
      AuthMiddleware.restrictTo(Role.ADMIN),
      userController.update
    );
    router.delete(
      '/:id',
      AuthMiddleware.restrictTo(Role.ADMIN),
      userController.delete
    );

    return router;
  }
}
