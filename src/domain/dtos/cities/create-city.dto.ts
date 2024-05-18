export class CreateCityDto {
  private constructor(
    private readonly name: string,
    private readonly country: string,
    private readonly coordinates: number[],
    private readonly img: string,
    private readonly description?: string
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateCityDto?] {
    const { name, country, coordinates, img, description } = props;
    let coordinatesArr: number[] = [];

    if (!name) return ["Missing name"];
    if (!country) return ["Missing country"];
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

    if (!img) return ["Missing img"];

    return [
      undefined,
      new CreateCityDto(name, country, coordinatesArr, img, description),
    ];
  }
}
