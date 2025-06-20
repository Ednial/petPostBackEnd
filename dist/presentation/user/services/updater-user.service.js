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
exports.UpdaterUserService = void 0;
const domain_1 = require("../../../domain");
class UpdaterUserService {
    constructor(finderUserService) {
        this.finderUserService = finderUserService;
    }
    execute(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.finderUserService.executeByFindOne(id);
            // Update the user properties with the new data
            user.username = data.username;
            user.email = data.email;
            user.password = data.password;
            user.role = data.role;
            user.status = data.status;
            try {
                yield user.save();
                return {
                    message: 'User updated successfully',
                };
            }
            catch (error) {
                console.error('Error updating user:', error);
                throw domain_1.CustomError.internalServer('Failed to update user');
            }
        });
    }
}
exports.UpdaterUserService = UpdaterUserService;
