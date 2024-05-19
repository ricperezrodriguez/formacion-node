import { Request, Response } from "express";
import { CreatePlaceDto, CustomError, UpdatePlaceDto } from "../../domain";
import { PlacesService } from "../services/places.service";

export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }

  getPlaces = (req: Request, res: Response) => {
    this.placesService
      .getPlaces(req.body.pagination)
      .then((places) => res.json(places))
      .catch((error) => this.handleError(error, res));
  };

  getPlace = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (id === undefined || id === null || isNaN(id)) {
      return res.status(400).json("ID params must be a valid number");
    }

    this.placesService
      .getPlaceById(id)
      .then((place) => res.status(201).json(place))
      .catch((error) => this.handleError(error, res));
  };

  createPlace = (req: Request, res: Response) => {
    const [error, createPlaceDto] = CreatePlaceDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.placesService
      .createPlace(createPlaceDto!)
      .then((place) => res.status(201).json(place))
      .catch((error) => this.handleError(error, res));
  };

  uptatePlace = (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updatePlaceDto] = UpdatePlaceDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });

    this.placesService
      .updatePlaceById(updatePlaceDto!, id)
      .then((place) => res.json(place))
      .catch((error) => this.handleError(error, res));
  };

  deletePlace = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (id === undefined || id === null || isNaN(id)) {
      res.status(400).json("ID params must be a valid number");
    }

    this.placesService
      .deletePlaceById(id)
      .then((place) => res.json(place))
      .catch((error) => this.handleError(error, res));
  };
}
