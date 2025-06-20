"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserService = void 0;
const config_1 = require("../../../config");
const bcrypt_adapter_1 = require("../../../config/bcrypt.adapter");
const jwt_adapter_1 = require("../../../config/jwt.adapter");
const data_1 = require("../../../data");
const domain_1 = require("../../../domain");
class LoginUserService {
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.ensureUserExist(data);
            this.ensurePasswordIsCorrect(data, user);
            const token = yield this.generateToken({ id: user.id }, config_1.envs.JWET_EXPIRE_IN);
            return {
                token,
                user: {
                    id: user.id,
                    fullname: user.username,
                    email: user.email,
                    role: user.role,
                },
            };
        });
    }
    ensurePasswordIsCorrect(credentials, user) {
        const isMatch = bcrypt_adapter_1.encryptAdapter.compare(credentials.password, user.password);
        if (!isMatch) {
            throw domain_1.CustomError.unAuthorized('Invalid Credentials');
        }
    }
    ensureUserExist(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield data_1.User.findOne({
                where: {
                    email: credentials.email,
                    status: true,
                },
            });
            if (!user) {
                throw domain_1.CustomError.unAuthorized('Invalid Credentials');
            }
            return user;
        });
    }
    generateToken(payload, duration) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield jwt_adapter_1.JwtAdapter.generateToken(payload, duration);
            if (!token)
                throw domain_1.CustomError.internalServer('Error while creating jwt');
            return token;
        });
    }
}
exports.LoginUserService = LoginUserService;
