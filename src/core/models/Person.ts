import { VoteType } from "../enums/VoteType";
import VoteResult from "./VoteResult";

export default class Person {
  public id?: number;
  public name: string;

  constructor(id: number | undefined, name: string) {
    this.id = id || undefined;
    this.name = name;
  }

  getNumSupportedBills(voteResults: VoteResult[]): number {
    return voteResults.filter(
      (voteResult) =>
        this.id === voteResult.personId && voteResult.voteType === VoteType.YES
    ).length;
  }

  getNumOpposedBills(voteResults: VoteResult[]): number {
    return voteResults.filter(
      (voteResult) =>
        this.id === voteResult.personId && voteResult.voteType === VoteType.NO
    ).length;
  }
}
