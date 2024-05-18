import db from "./connection";

export class PostgresqlDB {
  static async connect() {
    try {
      await db.authenticate();
      console.log("DB connected");
    } catch (error) {
      console.log(`DB connection error: ${error}`);
    }
  }
}
