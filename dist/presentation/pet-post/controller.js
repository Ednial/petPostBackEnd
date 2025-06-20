"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetPostController = void 0;
const handleError_1 = require("../common/handleError");
class PetPostController {
    constructor(finderPetPostService, finderPetPostsService, creatorPetPostService, updaterPetPostService, eliminatorPetPostService, approvePetPostService, rejectPetPostService) {
        this.finderPetPostService = finderPetPostService;
        this.finderPetPostsService = finderPetPostsService;
        this.creatorPetPostService = creatorPetPostService;
        this.updaterPetPostService = updaterPetPostService;
        this.eliminatorPetPostService = eliminatorPetPostService;
        this.approvePetPostService = approvePetPostService;
        this.rejectPetPostService = rejectPetPostService;
        this.createPetPost = (req, res) => {
            const data = req.body;
            this.creatorPetPostService
                .execute(data)
                .then((result) => res.status(201).json(result))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
        this.findAllPetPosts = (req, res) => {
            this.finderPetPostsService
                .executeByFindAll()
                .then((result) => res.status(200).json(result))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
        this.findPetPostById = (req, res) => {
            const { id } = req.params;
            this.finderPetPostService
                .executeByFindOne(id)
                .then((result) => res.status(200).json(result))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
        this.delete = (req, res) => {
            const { id } = req.params;
            this.eliminatorPetPostService
                .execute(id)
                .then((result) => res.status(200).json(result))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
        this.update = (req, res) => {
            const { id } = req.params;
            const data = req.body;
            this.updaterPetPostService
                .execute(id, data)
                .then((result) => res.status(200).json(result))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
        this.approve = (req, res) => {
            const { id } = req.params;
            this.approvePetPostService
                .execute(id)
                .then((result) => res.status(200).json(result))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
        this.reject = (req, res) => {
            const { id } = req.params;
            this.rejectPetPostService
                .execute(id)
                .then((result) => res.status(200).json(result))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
    }
}
exports.PetPostController = PetPostController;
