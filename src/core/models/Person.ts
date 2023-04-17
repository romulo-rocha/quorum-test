export default class Person {
  public id?: number;
  public name: string;

  constructor(id: number | undefined, name: string) {
    this.id = id || undefined;
    this.name = name;
  }
}
