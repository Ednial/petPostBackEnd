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
exports.ApprovePetPostService = void 0;
const data_1 = require("../../../data");
const domain_1 = require("../../../domain");
class ApprovePetPostService {
    constructor(finderPetPostService) {
        this.finderPetPostService = finderPetPostService;
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const petPost = yield this.finderPetPostService.executeByFindOne(id);
            if (petPost.status === 'approved') {
                throw new Error('Pet post already approved');
            }
            petPost.status = data_1.PetPostStatus.APPROVED;
            try {
                yield petPost.save();
                return {
                    message: 'Pet post approved successfully',
                };
            }
            catch (error) {
                domain_1.CustomError.internalServer('Error approving pet post');
            }
        });
    }
}
exports.ApprovePetPostService = ApprovePetPostService;
