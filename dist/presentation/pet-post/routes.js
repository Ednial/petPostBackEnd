"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetPostRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const creator_pet_post_service_1 = require("./services/creator-pet-post.service");
const eliminator_pet_post_service_1 = require("./services/eliminator-pet-post.service");
const finder_pet_post_service_1 = require("./services/finder-pet-post.service");
const finder_pet_posts_service_1 = require("./services/finder-pet-posts.service");
const updater_pet_post_service_1 = require("./services/updater-pet-post.service");
const approve_pet_post_service_1 = require("./services/approve-pet-post.service");
const reject_pet_post_service_1 = require("./services/reject-pet-post.service");
const auth_middleware_1 = require("../common/middlewares/auth.middleware");
class PetPostRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const creatorPetPostService = new creator_pet_post_service_1.CreatorPetPostService();
        const finderPetPostService = new finder_pet_post_service_1.FinderPetPostService();
        const finderPetPostsService = new finder_pet_posts_service_1.FinderPetPostsService();
        const eliminatorPetPostService = new eliminator_pet_post_service_1.EliminatorPetPostService(finderPetPostService);
        const updaterPetPostService = new updater_pet_post_service_1.UpdaterPetPostService(finderPetPostService);
        const approvePetPostService = new approve_pet_post_service_1.ApprovePetPostService(finderPetPostService);
        const rejectPetPostService = new reject_pet_post_service_1.RejectPetPostService(finderPetPostService);
        const petPostController = new controller_1.PetPostController(finderPetPostService, finderPetPostsService, creatorPetPostService, updaterPetPostService, eliminatorPetPostService, approvePetPostService, rejectPetPostService);
        router.use(auth_middleware_1.AuthMiddleware.protect);
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
exports.PetPostRoutes = PetPostRoutes;
