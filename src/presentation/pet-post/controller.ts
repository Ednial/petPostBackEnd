import { Request, Response } from 'express';
import { CreatorPetPostService } from './services/creator-pet-post.service';
import { EliminatorPetPostService } from './services/eliminator-pet-post.service';
import { FinderPetPostService } from './services/finder-pet-post.service';
import { FinderPetPostsService } from './services/finder-pet-posts.service';
import { UpdaterPetPostService } from './services/updater-pet-post.service';
import { ApprovePetPostService } from './services/approve-pet-post.service';
import { RejectPetPostService } from './services/reject-pet-post.service';
import { handleError } from '../common/handleError';

export class PetPostController {
  constructor(
    private readonly finderPetPostService: FinderPetPostService,
    private readonly finderPetPostsService: FinderPetPostsService,
    private readonly creatorPetPostService: CreatorPetPostService,
    private readonly updaterPetPostService: UpdaterPetPostService,
    private readonly eliminatorPetPostService: EliminatorPetPostService,
    private readonly approvePetPostService: ApprovePetPostService,
    private readonly rejectPetPostService: RejectPetPostService
  ) {}

  createPetPost = (req: Request, res: Response) => {
    const data = req.body;

    this.creatorPetPostService
      .execute(data, req.body.sessionUser)
      .then((result) => res.status(201).json(result))
      .catch((error) => handleError(error, res));
  };

  findAllPetPosts = (req: Request, res: Response) => {
    this.finderPetPostsService
      .executeByFindAll()
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };

  findPetPostById = (req: Request, res: Response) => {
    const { id } = req.params;

    this.finderPetPostService
      .executeByFindOne(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;

    this.eliminatorPetPostService
      .execute(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    this.updaterPetPostService
      .execute(id, data)
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };

  approve = (req: Request, res: Response) => {
    const { id } = req.params;
    this.approvePetPostService
      .execute(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };

  reject = (req: Request, res: Response) => {
    const { id } = req.params;
    this.rejectPetPostService
      .execute(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => handleError(error, res));
  };
}
