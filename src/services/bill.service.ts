import * as fs from "fs";
import * as path from "path";

import Bill from "../core/models/Bill";
import { parse } from "csv-parse";

export default class BillService {
  bills: Bill[] = [];

  constructor() {}

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

    console.info(bills, "Bill array has been successfuly loaded");

    return bills;
  }
}
