import Place from "../../data/postgresql/models/place.model";
import { CustomError, PaginationDto } from "../../domain";
import { CreatePlaceDto } from "../../domain/dtos/places/create-place.dto";
import { UpdatePlaceDto } from "../../domain/dtos/places/update-place.dto";
import { PlaceEntity } from "../../domain/entities/place.entity";

export class PlacesService {
  async getPlaces(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      //   const cities = await City.findAll();
      const { count, rows } = await Place.findAndCountAll({
        offset: (page - 1) * limit,
        limit: limit,
      });

      return {
        page: page,
        limit: limit,
        total: count,
        next: `/api/places?page=${page + 1}&limit=${limit}`,
        prev:
          page - 1 > 0 ? `/api/places?page=${page - 1}&limit=${limit}` : null,

        places: rows.map((c) => PlaceEntity.fromObject(c)),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getPlaceById(id: number) {
    try {
      const place = await Place.findByPk(id);
      if (!place) throw CustomError.notFound(`Place with id ${id} not exist`);

      return PlaceEntity.fromObject(place);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer(`${error}`);
    }
  }

  async createPlace(createPlace: CreatePlaceDto) {
    try {
      const place = await Place.create({
        ...createPlace,
      });

      return place;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async updatePlaceById(updatePlace: UpdatePlaceDto, id: number) {
    try {
      const existPlace = await Place.findByPk(id);
      if (!existPlace)
        throw CustomError.notFound(`Place with id ${id} not exist`);

      await Place.update(
        { ...updatePlace.values },
        {
          where: { id },
        }
      );

      return PlaceEntity.fromObject({
        ...existPlace.dataValues,
        ...updatePlace.values,
      });
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer(`${error}`);
    }
  }

  async deletePlaceById(id: number) {
    try {
      const place = await Place.findByPk(id);
      if (!place) throw CustomError.notFound(`Place with id ${id} not exist`);

      await place.destroy();
      return PlaceEntity.fromObject(place);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer(`${error}`);
    }
  }
}
