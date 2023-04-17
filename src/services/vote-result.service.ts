import * as fs from "fs";
import * as path from "path";

import VoteResult from "../core/models/VoteResult";
import { parse } from "csv-parse";

export default class VoteResultService {
  voteResults: VoteResult[] = [];

  constructor() {}

  async loadVoteResultsFromCSVFile(): Promise<any[]> {
    const csvFilePath = path.resolve(__dirname, "../../data/vote_results.csv");
    const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });

    const columns: string[] = ["id", "personId", "voteId", "voteType"];

    const voteResults: VoteResult[] = await new Promise((resolve, reject) => {
      parse(
        fileContent,
        { delimiter: ",", columns },
        (error, result: any[]) => {
          if (error) reject(error);

          // Remove first element of array because it's the header
          result.shift();

          // Transforms result array into an array of VoteResult
          // Resolves promise with VoteResult array
          resolve(
            result.map(
              (voteResult: any) =>
                new VoteResult(
                  Number(voteResult.id),
                  Number(voteResult.personId),
                  Number(voteResult.voteId),
                  Number(voteResult.voteType)
                )
            )
          );
        }
      );
    });

    this.voteResults = voteResults;

    console.info(voteResults, "VoteResult array has been successfuly loaded");

    return voteResults;
  }
}
