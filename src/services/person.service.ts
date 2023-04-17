import * as fs from "fs";
import * as path from "path";

import { Person } from "../core/models/Person";
import { parse } from "csv-parse";

export default class PersonService {
  persons: Person[] = [];

  constructor() {}

  async loadPersonsFromCSVFile(): Promise<any[]> {
    const csvFilePath = path.resolve(__dirname, "../../data/legislators.csv");
    const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });

    const columns: string[] = ["id", "name"];

    const persons: Person[] = await new Promise((resolve, reject) => {
      parse(
        fileContent,
        { delimiter: ",", columns },
        (error, result: any[]) => {
          if (error) reject(error);

          // Remove first element of array because it's the header
          result.shift();

          // Transforms result array into an array of Person
          // Resolves promise with Person array
          resolve(
            result.map((person: any) => new Person(person.id, person.name))
          );
        }
      );
    });

    this.persons = persons;

    return persons;
  }
}
