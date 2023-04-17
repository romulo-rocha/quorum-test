import * as fs from "fs";
import * as path from "path";

import Bill from "../core/models/Bill";
import { parse } from "csv-parse";
import Vote from "../core/models/Vote";
import VoteResult from "../core/models/VoteResult";
import Person from "../core/models/Person";

interface SupporterOpposerCount {
  id: number;
  title: string;
  supporterCount: number;
  opposerCount: number;
  primarySponsor: string;
}

export default class BillService {
  bills: Bill[] = [];

  constructor() {}

  getSupporterOpposerCountList(
    votes: Vote[],
    voteResults: VoteResult[],
    persons: Person[]
  ): SupporterOpposerCount[] {
    return this.bills.map(
      (bill) =>
        <SupporterOpposerCount>{
          id: bill.id,
          title: bill.title,
          supporterCount: bill.getSupporterCount(votes, voteResults),
          opposerCount: bill.getOpposerCount(votes, voteResults),
          primarySponsor: bill.getPrimarySponsor(persons)?.name || "Unknown",
        }
    );
  }

  async loadBillsFromCSVFile(): Promise<any[]> {
    const csvFilePath = path.resolve(__dirname, "../../data/bills.csv");
    const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });

    const columns: string[] = ["id", "title", "sponsorId"];

    const bills: Bill[] = await new Promise((resolve, reject) => {
      parse(
        fileContent,
        { delimiter: ",", columns },
        (error, result: any[]) => {
          if (error) reject(error);

          // Remove first element of array because it's the header
          result.shift();

          // Transforms result array into an array of Bill
          // Resolves promise with Bill array
          resolve(
            result.map(
              (bill: any) =>
                new Bill(Number(bill.id), bill.title, Number(bill.sponsorId))
            )
          );
        }
      );
    });

    this.bills = bills;

    return bills;
  }
}
