import * as path from "path";
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

    const legislatorSupportOppesedCountList =
      personService.getLegislatorSupportOpposeCountList(
        voteResultService.voteResults
      );

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

    const supporterOpposerCountList = billService.getSupporterOpposerCountList(
      voteService.votes,
      voteResultService.voteResults,
      personService.persons
    );
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
