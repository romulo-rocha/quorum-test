import * as fs from "fs";
import * as path from "path";

import Vote from "../core/models/Vote";
import { parse } from "csv-parse";

export default class VoteService {
  votes: Vote[] = [];

  constructor() {}

  async loadVotesFromCSVFile(): Promise<any[]> {
    const csvFilePath = path.resolve(__dirname, "../../data/votes.csv");
    const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });

    const columns: string[] = ["id", "billId"];

    const votes: Vote[] = await new Promise((resolve, reject) => {
      parse(
        fileContent,
        { delimiter: ",", columns },
        (error, result: any[]) => {
          if (error) reject(error);

          // Remove first element of array because it's the header
          result.shift();

          // Transforms result array into an array of Vote
          // Resolves promise with Vote array
          resolve(
            result.map(
              (vote: any) => new Vote(Number(vote.id), Number(vote.billId))
            )
          );
        }
      );
    });

    this.votes = votes;

    return votes;
  }
}
