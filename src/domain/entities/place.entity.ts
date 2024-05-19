export class PlaceEntity {
  private constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly coordinates: number[],
    public readonly description?: string
  ) {}

  public static fromObject(object: { [key: string]: any }): PlaceEntity {
    const { id, name, coordinates, description } = object;
    let coordinatesArr: number[] = [];

    if (!id) throw ["Missing id"];
    if (!name) throw ["Missing name"];

    if (!coordinates || !Array.isArray(coordinates))
      throw ["Invalid coordinates"];

    coordinatesArr = coordinates.map(Number);
    if (!coordinatesArr.every((e) => typeof e === "number")) {
      throw ["Coordinates must be array of numbers"];
    }

    return new PlaceEntity(+id, name, coordinatesArr, description);
  }
}
