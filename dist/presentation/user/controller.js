"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const domain_1 = require("../../domain");
const login_user_dto_1 = require("../../domain/dtos/users/login-user.dto");
const handleError_1 = require("../common/handleError");
const config_1 = require("../../config");
class UserController {
    constructor(finderUserService, finderUsersService, registerUserService, loginUserService, updaterUserService, eliminatorUserService) {
        this.finderUserService = finderUserService;
        this.finderUsersService = finderUsersService;
        this.registerUserService = registerUserService;
        this.loginUserService = loginUserService;
        this.updaterUserService = updaterUserService;
        this.eliminatorUserService = eliminatorUserService;
        this.register = (req, res) => {
            const [error, data] = domain_1.RegisterUserDto.execute(req.body);
            if (error) {
                return res.status(422).json({
                    message: error,
                });
            }
            this.registerUserService
                .execute(data)
                .then((result) => res.status(201).json(result))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
        this.login = (req, res) => {
            const [error, data] = login_user_dto_1.LoginUserDto.execute(req.body);
            if (error) {
                return res.status(422).json({
                    message: error,
                });
            }
            this.loginUserService
                .execute(data)
                .then((result) => {
                res.cookie('token', result.token, {
                    httpOnly: true,
                    secure: config_1.envs.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 3 * 60 * 60 * 1000, // three hours
                });
                res.status(200).json(result);
            })
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
        this.findAllUsers = (req, res) => {
            this.finderUsersService
                .executeByFindAll()
                .then((result) => res.status(200).json(result))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
        this.findUserById = (req, res) => {
            const { id } = req.params;
            this.finderUserService
                .executeByFindOne(id)
                .then((result) => res.status(200).json(result))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
        this.delete = (req, res) => {
            const { id } = req.params;
            this.eliminatorUserService
                .execute(id)
                .then((result) => res.status(200).json(result))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
        this.update = (req, res) => {
            const { id } = req.params;
            const data = req.body;
            this.updaterUserService
                .execute(id, data)
                .then((result) => res.status(200).json(result))
                .catch((error) => (0, handleError_1.handleError)(error, res));
        };
    }
}
exports.UserController = UserController;
