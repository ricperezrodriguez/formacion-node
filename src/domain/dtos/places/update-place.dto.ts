export class UpdatePlaceDto {
  private constructor(
    private readonly name?: string,
    private readonly coordinates?: number[],
    private readonly description?: string
  ) {}

  get values() {
    const returnObject: { [key: string]: any } = {};

    if (this.name) returnObject.name = this.name;
    if (this.coordinates) returnObject.coordinates = this.coordinates;
    if (this.description) returnObject.description = this.description;

    return returnObject;
  }

  static create(props: { [key: string]: any }): [string?, UpdatePlaceDto?] {
    const { name, coordinates, description, id } = props;
    let coordinatesArr: number[] | undefined = undefined;

    if (!id || isNaN(Number(id))) {
      return ["ID params must be a valid number"];
    }

    if (!name && !coordinates && !description) return ["Nothing to update"];

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

    return [undefined, new UpdatePlaceDto(name, coordinatesArr, description)];
  }
}
