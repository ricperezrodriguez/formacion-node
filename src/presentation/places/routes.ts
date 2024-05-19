import { Router } from "express";
import { PaginationMiddleware } from "../middlewares/pagination.middleware";
import { PlacesService } from "../services/places.service";
import { PlacesController } from "./controller";

export class PlacesRoutes {
  static get routes(): Router {
    const router = Router();

    const placesService = new PlacesService();
    const controller = new PlacesController(placesService);

    /**
     * Get track
     * @openapi
     * /places/:
     *    get:
     *      tags:
     *        - places
     *      summary: "Obtener lugares"
     *      description: Endpoint para obtenertodas las lugares
     *      responses:
     *        '200':
     *          description: Retorna el objeto insertado en la coleccion.
     *        '400':
     *          description: Bad request.
     *      security:
     *       - ffofofof: []
     */
    router.get("/", [PaginationMiddleware.pagination], controller.getPlaces);

    /**
     * Post track
     * @openapi
     * /places/{placeId}:
     *    get:
     *      tags:
     *        - places
     *      summary: "Obtener ciudadad"
     *      description: Endpoint para optener una ciudad en función del id
     *      parameters:
     *      - name: placeId
     *        in: path
     *        description: ID of place to return
     *        required: true
     *        schema:
     *          type: integer
     *          format: int64
     *      responses:
     *        '200':
     *          description: Retorna el objeto insertado en la coleccion.
     *        '400':
     *          description: Bad request.
     *      security:
     *       - ffofofof: []
     */
    router.get("/:id", controller.getPlace);

    /**
     * Post track
     * @openapi
     * /places:
     *    post:
     *      tags:
     *        - places
     *      summary: "Añadir lugares"
     *      description: Endpoint para añadir nuevas lugares
     *      requestBody:
     *          content:
     *            application/json:
     *              schema:
     *                $ref: "#/components/schemas/place"
     *      responses:
     *        '200':
     *          description: Retorna el objeto insertado en la coleccion.
     *        '400':
     *          description: Bad request.
     *      security:
     *       - ffofofof: []
     */
    router.post("/", controller.createPlace);

    /**
     * Post track
     * @openapi
     * /places//{placeId}:
     *    put:
     *      tags:
     *        - places
     *      summary: "Modificar lugares"
     *      description: Endpoint para modificar propiedades de  lugares
     *      parameters:
     *      - name: placeId
     *        in: path
     *        description: ID of place to return
     *        required: true
     *        schema:
     *          type: integer
     *          format: int64
     *      requestBody:
     *          content:
     *            application/json:
     *              schema:
     *                $ref: "#/components/schemas/place"
     *      responses:
     *        '200':
     *          description: Retorna el objeto insertado en la coleccion.
     *        '400':
     *          description: Bad request.
     *      security:
     *       - ffofofof: []
     */
    router.put("/:id", controller.uptatePlace);

    /**
     * Delete track
     * @openapi
     * /places/{placeId}:
     *    delete:
     *      tags:
     *        - places
     *      summary: "Eliminar lugares"
     *      description: Endpoint para eliminar lugares
     *      parameters:
     *      - name: placeId
     *        in: path
     *        description: ID of place to return
     *        required: true
     *        schema:
     *          type: integer
     *          format: int64
     *      requestBody:
     *          content:
     *            application/json:
     *              schema:
     *                $ref: "#/components/schemas/place"
     *      responses:
     *        '200':
     *          description: Retorna el objeto insertado en la coleccion.
     *        '400':
     *          description: Bad request.
     *      security:
     *       - ffofofof: []
     */
    router.delete("/:id", controller.deletePlace);

    return router;
  }
}
