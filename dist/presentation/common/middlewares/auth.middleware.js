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
exports.AuthMiddleware = void 0;
const jwt_adapter_1 = require("../../../config/jwt.adapter");
const data_1 = require("../../../data");
class AuthMiddleware {
    static protect(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            let token = (_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.token;
            if (!token) {
                return res.status(401).json({ message: 'Token not provided' });
            }
            try {
                const payload = (yield jwt_adapter_1.JwtAdapter.validateToken(token));
                if (!payload)
                    return res.status(401).json({ message: 'Unauthorized' });
                const user = yield data_1.User.findOne({
                    where: {
                        id: payload.id,
                        status: true,
                    },
                });
                if (!user)
                    return res.status(401).json({ message: 'Unauthorized' });
                req.sessionUser = user;
                next();
            }
            catch (error) {
                console.error('Authentication error:', error);
                return res
                    .status(500)
                    .json({ message: 'Internal Server Error no user found' });
            }
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
AuthMiddleware.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.sessionUser.role)) {
            return res.status(403).json({
                message: 'You do not have permission to perform this action',
            });
        }
        next();
    };
};
