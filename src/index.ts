import BillService from "./services/bill.service";
import PersonService from "./services/person.service";
import VoteResultService from "./services/vote-result.service";
import VoteService from "./services/vote.service";

const init = async () => {
  try {
    console.log("Initiating service");
    const personService = new PersonService();
    await personService.loadPersonsFromCSVFile();

    const billService = new BillService();
    await billService.loadBillsFromCSVFile();

    const voteService = new VoteService();
    await voteService.loadVotesFromCSVFile();

    const voteResultService = new VoteResultService();
    await voteResultService.loadVoteResultsFromCSVFile();
  } catch (err) {
    console.error("Error during execution of process", err);
  } finally {
    console.log("End of process");
    process.exit();
  }
};

init();
