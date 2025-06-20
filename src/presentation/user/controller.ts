import { Request, Response } from 'express';
import { RegisterUserService } from './services/register-user.service';
import { LoginUserService } from './services/login-user.service';
import { FinderUserService } from './services/finder-user.service';
import { FinderUsersService } from './services/finder-users.service';
import { UpdaterUserService } from './services/updater-user.service';
import { EliminatorUserService } from './services/eliminator-user.service';
import { RegisterUserDto } from '../../domain';
import { LoginUserDto } from '../../domain/dtos/users/login-user.dto';
import { handleError } from '../common/handleError';
import { envs } from '../../config';

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
    const [error, data] = RegisterUserDto.execute(req.body);

    if (error) {
      return res.status(422).json({
        message: error,
      });
    }

    this.registerUserService
      .execute(data!)
      .then((result) => res.status(201).json(result))
      .catch((error) => handleError(error, res));
  };

  login = (req: Request, res: Response) => {
    const [error, data] = LoginUserDto.execute(req.body);
    if (error) {
      return res.status(422).json({
        message: error,
      });
    }

    this.loginUserService
      .execute(data!)
      .then((result) => {
        res.cookie('token', result.token, {
          httpOnly: true,
          secure: envs.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 3 * 60 * 60 * 1000, // three hours
        });
        res.status(200).json(result);
      })
      .catch((error) => handleError(error, res));
  };

  findAllUsers = (req: Request, res: Response) => {
    this.finderUsersService
      .executeByFindAll()
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };

  findUserById = (req: Request, res: Response) => {
    const { id } = req.params;

    this.finderUserService
      .executeByFindOne(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;

    this.eliminatorUserService
      .execute(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    this.updaterUserService
      .execute(id, data)
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };
}
