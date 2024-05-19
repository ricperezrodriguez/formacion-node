import { Router } from "express";
import { FileUploadmiddleware } from "../middlewares/file-upload.middleware";
import { PaginationMiddleware } from "../middlewares/pagination.middleware";
import { CitiesService } from "../services/cities.service";
import { FileUploadService } from "../services/file-upload.service";
import { CitiesController } from "./controller";

export class CitiesRoutes {
  static get routes(): Router {
    const router = Router();

    const citiesService = new CitiesService();
    const fileUploadService = new FileUploadService();
    const controller = new CitiesController(citiesService, fileUploadService);

    /**
     * Get track
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
     * Delete track
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

    /**
     * Post track
     * @openapi
     * /cities/image:
     *    post:
     *      tags:
     *        - cities
     *      summary: "Añadir foto ciudades"
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
    router.post(
      "/image/:idCity",
      [FileUploadmiddleware.containFiles],
      controller.uploadImageCity
    );

    /**
     * Get track
     * @openapi
     * /cities/image:
     *    get:
     *      tags:
     *        - cities
     *      summary: "Obtener imagenes ciudades"
     *      description: Endpoint para obtenertodas las ciudades
     *      responses:
     *        '200':
     *          description: Retorna el objeto insertado en la coleccion.
     *        '400':
     *          description: Bad request.
     *      security:
     *       - ffofofof: []
     */
    router.get("/image/:idCity", controller.getImageCity);

    return router;
  }
}
