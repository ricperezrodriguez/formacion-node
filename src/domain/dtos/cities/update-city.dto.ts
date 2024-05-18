export class UpdateCityDto {
  private constructor(
    private readonly name?: string,
    private readonly country?: string,
    private readonly coordinates?: number[],
    private readonly img?: string,
    private readonly description?: string
  ) {}

  get values() {
    const returnObject: { [key: string]: any } = {};

    if (this.name) returnObject.name = this.name;
    if (this.country) returnObject.country = this.country;
    if (this.coordinates) returnObject.coordinates = this.coordinates;
    if (this.img) returnObject.img = this.img;
    if (this.description) returnObject.description = this.description;

    return returnObject;
  }

  static create(props: { [key: string]: any }): [string?, UpdateCityDto?] {
    const { name, country, coordinates, img, description, id } = props;
    let coordinatesArr: number[] | undefined = undefined;

    if (!id || isNaN(Number(id))) {
      return ["ID params must be a valid number"];
    }

    if (!name && !country && !coordinates && !img && !description)
      return ["Nothing to update"];

    if (coordinates) {
      try {
        coordinatesArr = JSON.parse(coordinates);
        if (
          !Array.isArray(coordinatesArr) ||
          !coordinatesArr.every((e) => typeof e === "number")
        ) {
          return ["Coordinates must be array of numbers"];
        }
      } catch (error) {
        return ["Coordinates not valid"];
      }
    }

    return [
      undefined,
      new UpdateCityDto(name, country, coordinatesArr, img, description),
    ];
  }
}
