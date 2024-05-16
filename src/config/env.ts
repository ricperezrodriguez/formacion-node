import "dotenv/config";
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  DB_URL: get("DB_URL").required().asString(),
  DB_NAME: get("DB_NAME").required().asString(),
  DB_USERNAME: get("DB_USERNAME").required().asString(),
  DB_PASSWORD: get("DB_PASSWORD").required().asString(),
  JWT_SEED: get("JWT_SEED").required().asString(),
};
