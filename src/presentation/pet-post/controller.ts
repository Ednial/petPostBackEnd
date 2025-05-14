import { Request, Response } from 'express';
import { CreatorPetPostService } from './services/creator-pet-post.service';
import { EliminatorPetPostService } from './services/eliminator-pet-post.service';
import { FinderPetPostService } from './services/finder-pet-post.service';
import { FinderPetPostsService } from './services/finder-pet-posts.service';
import { UpdaterPetPostService } from './services/updater-pet-post.service';
import { ApprovePetPostService } from './services/approve-pet-post.service';
import { RejectPetPostService } from './services/reject-pet-post.service';

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
      .execute(data)
      .then((result) => res.status(201).json(result))
      .catch((error) => res.status(500).json(error));
  };

  findAllPetPosts = (req: Request, res: Response) => {
    this.finderPetPostsService
      .executeByFindAll()
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  };

  findPetPostById = (req: Request, res: Response) => {
    const { id } = req.params;

    this.finderPetPostService
      .executeByFindOne(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;

    this.eliminatorPetPostService
      .execute(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    this.updaterPetPostService
      .execute(id, data)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  };

  approve = (req: Request, res: Response) => {
    const { id } = req.params;
    this.approvePetPostService
      .execute(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  };

  reject = (req: Request, res: Response) => {
    const { id } = req.params;
    this.rejectPetPostService
      .execute(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  };
}
