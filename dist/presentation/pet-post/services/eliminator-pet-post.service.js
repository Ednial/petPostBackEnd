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
exports.EliminatorPetPostService = void 0;
const domain_1 = require("../../../domain");
class EliminatorPetPostService {
    constructor(finderPetPostService) {
        this.finderPetPostService = finderPetPostService;
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const petPost = yield this.finderPetPostService.executeByFindOne(id);
            petPost.hasFound = false;
            try {
                yield petPost.save();
                return {
                    message: 'Pet post deleted successfully',
                };
            }
            catch (error) {
                console.error('Error deleting pet post:', error);
                throw domain_1.CustomError.internalServer('Failed to delete pet post');
            }
        });
    }
}
exports.EliminatorPetPostService = EliminatorPetPostService;
