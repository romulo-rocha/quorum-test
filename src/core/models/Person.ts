export class Person {
  public id?: number;
  public name: string;

  constructor(id: number, name: string) {
    this.id = id || undefined;
    this.name = name;
  }
}
