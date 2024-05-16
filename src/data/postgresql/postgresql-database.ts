import { Sequelize } from "sequelize";

interface Options {
  dbUrl: string;
  dbName: string;
  dbUsername: string;
  dbPassword: string;
}

export class PostgresqlDB {
  static async connect({ dbUrl, dbName, dbUsername, dbPassword }: Options) {
    try {
      const db = new Sequelize(dbName, dbUsername, dbPassword, {
        host: dbUrl,
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      });

      await db.authenticate();
      console.log("DB connected");
    } catch (error) {
      console.log(`DB connection error: ${error}`);
    }
  }
}
