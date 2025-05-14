import { Request, Response } from 'express';
import { RegisterUserService } from './services/register-user.service';
import { LoginUserService } from './services/login-user.service';
import { FinderUserService } from './services/finder-user.service';
import { FinderUsersService } from './services/finder-users.service';
import { UpdaterUserService } from './services/updater-user.service';
import { EliminatorUserService } from './services/eliminator-user.service';

export class UserController {
  constructor(
    private readonly finderUserService: FinderUserService,
    private readonly finderUsersService: FinderUsersService,
    private readonly registerUserService: RegisterUserService,
    private readonly loginUserService: LoginUserService,
    private readonly updaterUserService: UpdaterUserService,
    private readonly eliminatorUserService: EliminatorUserService
  ) {}

  register = (req: Request, res: Response) => {
    const data = req.body;

    this.registerUserService
      .execute(data)
      .then((result) => res.status(201).json(result))
      .catch((error) => res.status(500).json(error));
  };

  login = (req: Request, res: Response) => {
    this.loginUserService
      .execute()
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  };

  findAllUsers = (req: Request, res: Response) => {
    this.finderUsersService
      .executeByFindAll()
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  };

  findUserById = (req: Request, res: Response) => {
    const { id } = req.params;

    this.finderUserService
      .executeByFindOne(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;

    this.eliminatorUserService
      .execute(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    this.updaterUserService
      .execute(id, data)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  };
}
