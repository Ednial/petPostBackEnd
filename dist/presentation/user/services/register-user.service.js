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
exports.RegisterUserService = void 0;
const bcrypt_adapter_1 = require("../../../config/bcrypt.adapter");
const data_1 = require("../../../data");
const domain_1 = require("../../../domain");
class RegisterUserService {
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new data_1.User();
            user.username = data.fullname;
            user.email = data.email;
            user.password = bcrypt_adapter_1.encryptAdapter.hash(data.password);
            try {
                yield user.save();
                return {
                    message: 'user created successfully',
                };
            }
            catch (error) {
                console.error('Error creating user:', error);
                throw domain_1.CustomError.internalServer('Failed to create user');
            }
        });
    }
}
exports.RegisterUserService = RegisterUserService;
