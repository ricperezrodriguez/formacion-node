export class CityEntity {
  private constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly country: string,
    public readonly coordinates: number[],
    public readonly img: string,
    public readonly description?: string
  ) {}

  public static fromObject(object: { [key: string]: any }): CityEntity {
    const { id, name, country, coordinates, img, description } = object;
    let coordinatesArr: number[] = [];

    if (!id) throw ["Missing id"];
    if (!name) throw ["Missing name"];
    if (!country) throw ["Missing country"];
    if (!img) throw ["Missing img"];

    if (!coordinates || !Array.isArray(coordinates))
      throw ["Invalid coordinates"];

    coordinatesArr = coordinates.map(Number);
    if (!coordinatesArr.every((e) => typeof e === "number")) {
      throw ["Coordinates must be array of numbers"];
    }

    return new CityEntity(+id, name, country, coordinatesArr, img, description);
  }
}
