export class CreatePlaceDto {
  private constructor(
    private readonly name: string,
    private readonly coordinates: number[],
    private readonly description?: string
  ) {}

  static create(props: { [key: string]: any }): [string?, CreatePlaceDto?] {
    const { name, coordinates, description } = props;
    let coordinatesArr: number[] = [];

    if (!name) return ["Missing name"];
    if (!coordinates) return ["Missing coordinates"];

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

    return [undefined, new CreatePlaceDto(name, coordinatesArr, description)];
  }
}
