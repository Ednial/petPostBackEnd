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
exports.EliminatorUserService = void 0;
const domain_1 = require("../../../domain");
class EliminatorUserService {
    constructor(finderUserService) {
        this.finderUserService = finderUserService;
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.finderUserService.executeByFindOne(id);
            user.status = false;
            try {
                yield user.save();
                return {
                    message: 'User deleted successfully',
                };
            }
            catch (error) {
                console.error('Error deleting user:', error);
                throw domain_1.CustomError.internalServer('Failed to delete user');
            }
        });
    }
}
exports.EliminatorUserService = EliminatorUserService;
