import { Router } from "express";
import { CitiesRoutes } from "./cities/routes";
import { PlacesRoutes } from "./places/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/cities", CitiesRoutes.routes);
    router.use("/api/places", PlacesRoutes.routes);

    return router;
  }
}
