"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
//process.loadEnvFile;
require("dotenv/config");
const env_var_1 = require("env-var");
exports.envs = {
    PORT: (0, env_var_1.get)('PORT').required().asPortNumber(),
    NODE_ENV: (0, env_var_1.get)('NODE_ENV').required().asString(),
    DATABASE_USERNAME: (0, env_var_1.get)('DATABASE_USERNAME').required().asString(),
    DATABASE_PASSWORD: (0, env_var_1.get)('DATABASE_PASSWORD').required().asString(),
    DATABASE_HOST: (0, env_var_1.get)('DATABASE_HOST').required().asString(),
    DATABASE_PORT: (0, env_var_1.get)('DATABASE_PORT').required().asPortNumber(),
    DATABASE_NAME: (0, env_var_1.get)('DATABASE_NAME').required().asString(),
    JWT_KEY: (0, env_var_1.get)('JWT_KEY').required().asString(),
    JWET_EXPIRE_IN: (0, env_var_1.get)('JWET_EXPIRE_IN').required().asString(),
};
