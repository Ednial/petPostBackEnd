//process.loadEnvFile;
import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  NODE_ENV: get('NODE_ENV').required().asString(),
  DATABASE_USERNAME: get('DATABASE_USERNAME').required().asString(),
  DATABASE_PASSWORD: get('DATABASE_PASSWORD').required().asString(),
  DATABASE_HOST: get('DATABASE_HOST').required().asString(),
  DATABASE_PORT: get('DATABASE_PORT').required().asPortNumber(),
  DATABASE_NAME: get('DATABASE_NAME').required().asString(),

  JWT_KEY: get('JWT_KEY').required().asString(),
  JWET_EXPIRE_IN: get('JWET_EXPIRE_IN').required().asString(),
};
