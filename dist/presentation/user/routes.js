"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const eliminator_user_service_1 = require("./services/eliminator-user.service");
const finder_user_service_1 = require("./services/finder-user.service");
const finder_users_service_1 = require("./services/finder-users.service");
const login_user_service_1 = require("./services/login-user.service");
const register_user_service_1 = require("./services/register-user.service");
const updater_user_service_1 = require("./services/updater-user.service");
const auth_middleware_1 = require("../common/middlewares/auth.middleware");
const data_1 = require("../../data");
class UserRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const finderUserService = new finder_user_service_1.FinderUserService();
        const finderUsersService = new finder_users_service_1.FinderUsersService();
        const registerUserService = new register_user_service_1.RegisterUserService();
        const loginUserService = new login_user_service_1.LoginUserService();
        const updaterUserService = new updater_user_service_1.UpdaterUserService(finderUserService);
        const eliminatorUserService = new eliminator_user_service_1.EliminatorUserService(finderUserService);
        const userController = new controller_1.UserController(finderUserService, finderUsersService, registerUserService, loginUserService, updaterUserService, eliminatorUserService);
        router.post('/register', userController.register);
        router.post('/login', userController.login);
        router.use(auth_middleware_1.AuthMiddleware.protect);
        router.get('/', auth_middleware_1.AuthMiddleware.restrictTo(data_1.Role.ADMIN), userController.findAllUsers);
        router.get('/:id', userController.findUserById);
        router.patch('/:id', userController.update);
        router.delete('/:id', userController.delete);
        return router;
    }
}
exports.UserRoutes = UserRoutes;
