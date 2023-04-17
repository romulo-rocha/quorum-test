import * as path from "path";
import * as fs from "fs";
import * as CSVWriter from "csv-writer";

import BillService from "./services/bill.service";
import PersonService from "./services/person.service";
import VoteResultService from "./services/vote-result.service";
import VoteService from "./services/vote.service";

const init = async () => {
  try {
    const personService = new PersonService();
    await personService.loadPersonsFromCSVFile();

    const billService = new BillService();
    await billService.loadBillsFromCSVFile();

    const voteService = new VoteService();
    await voteService.loadVotesFromCSVFile();

    const voteResultService = new VoteResultService();
    await voteResultService.loadVoteResultsFromCSVFile();

    // Create output folder if it doesn't exist to create csv output files
    if (!fs.existsSync(path.resolve(__dirname, "../output"))) {
      fs.mkdirSync(path.resolve(__dirname, "../output"));
    }

    // Get array with support/oppose count list
    const legislatorSupportOppesedCountList =
      personService.getLegislatorSupportOpposeCountList(
        voteResultService.voteResults
      );
    // Write legislators-support-oppose-count.csv file
    await CSVWriter.createObjectCsvWriter({
      path: path.resolve(
        __dirname,
        "../output/legislators-support-oppose-count.csv"
      ),
      header: [
        { id: "id", title: "id" },
        { id: "name", title: "name" },
        { id: "numSupportedBills", title: "num_supported_bills" },
        { id: "numOpposedBills", title: "num_opposed_bills" },
      ],
    }).writeRecords(legislatorSupportOppesedCountList);

    console.info(
      "legislators-support-oppose-count.csv file has been generated. Check folder /output"
    );

    // Get array with bills supporter/opposer count list
    const supporterOpposerCountList = billService.getSupporterOpposerCountList(
      voteService.votes,
      voteResultService.voteResults,
      personService.persons
    );
    // Write bills.csv file
    await CSVWriter.createObjectCsvWriter({
      path: path.resolve(__dirname, "../output/bills.csv"),
      header: [
        { id: "id", title: "id" },
        { id: "title", title: "title" },
        { id: "supporterCount", title: "supporter_count" },
        { id: "opposerCount", title: "opposer_count" },
        { id: "primarySponsor", title: "primary_sponsor" },
      ],
    }).writeRecords(supporterOpposerCountList);

    console.info("bills.csv file has been generated. Check folder /output");
  } catch (err) {
    console.error("Error during execution of process", err);
  } finally {
    console.log("End of process");
    process.exit();
  }
};

init();
