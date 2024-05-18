import { Sequelize } from "sequelize";
import { envs } from "../../config/env";

const db = new Sequelize(envs.DB_NAME, envs.DB_USERNAME, envs.DB_PASSWORD, {
  host: envs.DB_URL,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default db;
