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
exports.UpdaterPetPostService = void 0;
const domain_1 = require("../../../domain");
class UpdaterPetPostService {
    constructor(finderPetPostService) {
        this.finderPetPostService = finderPetPostService;
    }
    execute(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const petPost = yield this.finderPetPostService.executeByFindOne(id);
            petPost.pet_name = data.pet_name;
            petPost.description = data.description;
            petPost.image_url = data.image_url;
            try {
                yield petPost.save();
                return {
                    message: 'Pet post updated successfully',
                };
            }
            catch (error) {
                console.error('Error updating pet post:', error);
                throw domain_1.CustomError.internalServer('Failed to update pet post');
            }
        });
    }
}
exports.UpdaterPetPostService = UpdaterPetPostService;
