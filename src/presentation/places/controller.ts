import { Request, Response } from "express";

export class PlacesController {
  getPlaces = (req: Request, res: Response) => {
    res.json("getPlaces");
  };

  getPlace = (req: Request, res: Response) => {
    res.json("getPlace");
  };

  createPlace = (req: Request, res: Response) => {
    res.json("createPlace");
  };

  uptatePlace = (req: Request, res: Response) => {
    res.json("uptatePlace");
  };

  deletePlace = (req: Request, res: Response) => {
    res.json("deletePlace");
  };
}
