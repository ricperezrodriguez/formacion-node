import { Router } from "express";
import { PlacesController } from "./controller";

export class PlacesRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new PlacesController();

    router.get("/", controller.getPlaces);
    router.get("/:id", controller.getPlace);
    router.post("/", controller.createPlace);
    router.put("/:id", controller.uptatePlace);
    router.delete("/:id", controller.deletePlace);

    return router;
  }
}
