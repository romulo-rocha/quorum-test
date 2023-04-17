import PersonService from "./services/person.service";

const init = async () => {
  try {
    console.log("Initiating service");
    const personService = new PersonService();
    const persons = await personService.loadPersonsFromCSVFile();
    console.log(persons);
  } catch (err) {
    console.error("Error during execution of process", err);
  } finally {
    process.exit();
  }
};

init();
