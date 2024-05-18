import { envs } from "./config/env";
import { PostgresqlDB } from "./data/postgresql/postgresql-database";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async () => {
  main();
})();

async function main() {
  await PostgresqlDB.connect();

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}
