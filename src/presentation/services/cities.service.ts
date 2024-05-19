import City from "../../data/postgresql/models/city.model";
import {
  CityEntity,
  CreateCityDto,
  CustomError,
  PaginationDto,
  UpdateCityDto,
} from "../../domain";

export class CitiesService {
  async getCities(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      //   const cities = await City.findAll();
      const { count, rows } = await City.findAndCountAll({
        offset: (page - 1) * limit,
        limit: limit,
      });

      return {
        page: page,
        limit: limit,
        total: count,
        next: `/api/cities?page=${page + 1}&limit=${limit}`,
        prev:
          page - 1 > 0 ? `/api/cities?page=${page - 1}&limit=${limit}` : null,

        cities: rows.map((c) => CityEntity.fromObject(c)),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getCityById(id: number) {
    try {
      const city = await City.findByPk(id);
      if (!city) throw CustomError.notFound(`City with id ${id} not exist`);

      return CityEntity.fromObject(city);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer(`${error}`);
    }
  }

  async createCity(createCity: CreateCityDto) {
    try {
      const city = await City.create({
        ...createCity,
      });

      return city;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async updateCityById(updateCity: UpdateCityDto, id: number) {
    try {
      const existcity = await City.findByPk(id);
      if (!existcity)
        throw CustomError.notFound(`City with id ${id} not exist`);

      await City.update(
        { ...updateCity.values },
        {
          where: { id },
        }
      );

      return CityEntity.fromObject({
        ...existcity.dataValues,
        ...updateCity.values,
      });
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer(`${error}`);
    }
  }

  async deleteCityById(id: number) {
    try {
      const city = await City.findByPk(id);
      if (!city) throw CustomError.notFound(`City with id ${id} not exist`);

      await city.destroy();
      return CityEntity.fromObject(city);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer(`${error}`);
    }
  }
}
