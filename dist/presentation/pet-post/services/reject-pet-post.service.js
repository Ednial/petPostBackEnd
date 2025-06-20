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
exports.RejectPetPostService = void 0;
const data_1 = require("../../../data");
const domain_1 = require("../../../domain");
class RejectPetPostService {
    constructor(finderPetPostService) {
        this.finderPetPostService = finderPetPostService;
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const petPost = yield this.finderPetPostService.executeByFindOne(id);
            if (petPost.status === 'approved') {
                throw domain_1.CustomError.badRequest('Pet post already approved');
            }
            if (petPost.status === 'rejected') {
                throw domain_1.CustomError.badRequest('Pet post already rejected');
            }
            petPost.status = data_1.PetPostStatus.REJECTED;
            try {
                yield petPost.save();
                return {
                    message: 'Pet post rejected successfully',
                };
            }
            catch (error) {
                console.error('Error rejecting pet post:', error);
                throw domain_1.CustomError.internalServer('Failed to reject pet post');
            }
        });
    }
}
exports.RejectPetPostService = RejectPetPostService;
