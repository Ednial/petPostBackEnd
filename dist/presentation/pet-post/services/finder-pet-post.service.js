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
exports.FinderPetPostService = void 0;
const data_1 = require("../../../data");
const domain_1 = require("../../../domain");
class FinderPetPostService {
    executeByFindOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const petPost = yield data_1.PetPost.findOne({
                where: {
                    id,
                    hasFound: true,
                },
            });
            if (!petPost) {
                throw domain_1.CustomError.notFound('Pet post not found');
            }
            return petPost;
        });
    }
}
exports.FinderPetPostService = FinderPetPostService;
