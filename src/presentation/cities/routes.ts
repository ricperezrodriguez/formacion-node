import { Router } from "express";
import { CitiesService } from "../services/cities.service";
import { CitiesController } from "./controller";

export class CitiesRoutes {
  static get routes(): Router {
    const router = Router();

    const citiesService = new CitiesService();
    const controller = new CitiesController(citiesService);

    router.get("/", controller.getCities);
    router.get("/:id", controller.getCity);
    router.post("/", controller.createCity);
    router.put("/:id", controller.uptateCity);
    router.delete("/:id", controller.deleteCity);

    return router;
  }
}
