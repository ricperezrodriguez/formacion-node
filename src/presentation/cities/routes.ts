import { Router } from "express";
import { PaginationMiddleware } from "../middlewares/pagination.middleware";
import { CitiesService } from "../services/cities.service";
import { CitiesController } from "./controller";

export class CitiesRoutes {
  static get routes(): Router {
    const router = Router();

    const citiesService = new CitiesService();
    const controller = new CitiesController(citiesService);

    /**
     * Post track
     * @openapi
     * /cities/:
     *    get:
     *      tags:
     *        - cities
     *      summary: "Obtener ciudades"
     *      description: Endpoint para obtenertodas las ciudades
     *      responses:
     *        '200':
     *          description: Retorna el objeto insertado en la coleccion.
     *        '400':
     *          description: Bad request.
     *      security:
     *       - ffofofof: []
     */
    router.get("/", [PaginationMiddleware.pagination], controller.getCities);

    /**
     * Post track
     * @openapi
     * /cities/{cityId}:
     *    get:
     *      tags:
     *        - cities
     *      summary: "Obtener ciudadad"
     *      description: Endpoint para optener una ciudad en función del id
     *      parameters:
     *      - name: cityId
     *        in: path
     *        description: ID of city to return
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
    router.get("/:id", controller.getCity);

    /**
     * Post track
     * @openapi
     * /cities:
     *    post:
     *      tags:
     *        - cities
     *      summary: "Añadir ciudades"
     *      description: Endpoint para añadir nuevas ciudades
     *      requestBody:
     *          content:
     *            application/json:
     *              schema:
     *                $ref: "#/components/schemas/city"
     *      responses:
     *        '200':
     *          description: Retorna el objeto insertado en la coleccion.
     *        '400':
     *          description: Bad request.
     *      security:
     *       - ffofofof: []
     */
    router.post("/", controller.createCity);

    /**
     * Post track
     * @openapi
     * /cities//{cityId}:
     *    put:
     *      tags:
     *        - cities
     *      summary: "Modificar ciudades"
     *      description: Endpoint para modificar propiedades de  ciudades
     *      parameters:
     *      - name: cityId
     *        in: path
     *        description: ID of city to return
     *        required: true
     *        schema:
     *          type: integer
     *          format: int64
     *      requestBody:
     *          content:
     *            application/json:
     *              schema:
     *                $ref: "#/components/schemas/city"
     *      responses:
     *        '200':
     *          description: Retorna el objeto insertado en la coleccion.
     *        '400':
     *          description: Bad request.
     *      security:
     *       - ffofofof: []
     */
    router.put("/:id", controller.uptateCity);

    /**
     * Post track
     * @openapi
     * /cities/{cityId}:
     *    delete:
     *      tags:
     *        - cities
     *      summary: "Eliminar ciudades"
     *      description: Endpoint para eliminar ciudades
     *      parameters:
     *      - name: cityId
     *        in: path
     *        description: ID of city to return
     *        required: true
     *        schema:
     *          type: integer
     *          format: int64
     *      requestBody:
     *          content:
     *            application/json:
     *              schema:
     *                $ref: "#/components/schemas/city"
     *      responses:
     *        '200':
     *          description: Retorna el objeto insertado en la coleccion.
     *        '400':
     *          description: Bad request.
     *      security:
     *       - ffofofof: []
     */
    router.delete("/:id", controller.deleteCity);

    return router;
  }
}
