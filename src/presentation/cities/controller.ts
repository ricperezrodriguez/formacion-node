import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { CreateCityDto, CustomError, UpdateCityDto } from "../../domain";
import { CitiesService } from "../services/cities.service";
import { FileUploadService } from "../services/file-upload.service";

export class CitiesController {
  constructor(
    private readonly citiesService: CitiesService,
    private readonly fileUploadService: FileUploadService
  ) {}

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }

  getCities = (req: Request, res: Response) => {
    this.citiesService
      .getCities(req.body.pagination)
      .then((cities) => res.json(cities))
      .catch((error) => this.handleError(error, res));
  };

  getCity = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (id === undefined || id === null || isNaN(id)) {
      return res.status(400).json("ID params must be a valid number");
    }

    this.citiesService
      .getCityById(id)
      .then((city) => res.status(201).json(city))
      .catch((error) => this.handleError(error, res));
  };

  createCity = (req: Request, res: Response) => {
    const [error, createCityDto] = CreateCityDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.citiesService
      .createCity(createCityDto!)
      .then((city) => res.status(201).json(city))
      .catch((error) => this.handleError(error, res));
  };

  uptateCity = (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateCityDto] = UpdateCityDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });

    this.citiesService
      .updateCityById(updateCityDto!, id)
      .then((city) => res.json(city))
      .catch((error) => this.handleError(error, res));
  };

  deleteCity = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (id === undefined || id === null || isNaN(id)) {
      res.status(400).json("ID params must be a valid number");
    }

    this.citiesService
      .deleteCityById(id)
      .then((city) => res.json(city))
      .catch((error) => this.handleError(error, res));
  };

  uploadImageCity = (req: Request, res: Response) => {
    const idCity = req.params.idCity;
    const file = req.body.files.at(0) as UploadedFile;

    this.fileUploadService
      .uploadSingle(file, idCity)
      .then((file) => res.json(file))
      .catch((error) => this.handleError(error, res));
  };

  getImageCity = (req: Request, res: Response) => {
    const idCity = req.params.idCity;

    this.fileUploadService
      .getFiles(idCity)
      .then((file) => res.sendFile(file))
      .catch((error) => this.handleError(error, res));
  };
}
