"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const routes_1 = require("./pet-post/routes");
const routes_2 = require("./user/routes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use('/api/pet-posts', routes_1.PetPostRoutes.routes);
        router.use('/api/users', routes_2.UserRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
