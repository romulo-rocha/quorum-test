import { VoteType } from "../enums/VoteType";
import Person from "./Person";
import Vote from "./Vote";
import VoteResult from "./VoteResult";

export default class Bill {
  public id?: number;
  public title: string;
  public sponsorId: number;

  constructor(id: number | undefined, title: string, sponsorId: number) {
    this.id = id || undefined;
    this.title = title;
    this.sponsorId = sponsorId;
  }

  getVote(votes: Vote[]): Vote | undefined {
    return votes.find((vote) => vote.billId === this.id);
  }

  getPrimarySponsor(persons: Person[]): Person | undefined {
    return persons.find((person) => person.id === this.sponsorId);
  }

  getSupporterCount(votes: Vote[], voteResults: VoteResult[]): number {
    const vote = this.getVote(votes);
    return voteResults.filter(
      (voteResult) =>
        voteResult.voteId === vote?.id && voteResult.voteType === VoteType.YES
    ).length;
  }

  getOpposerCount(votes: Vote[], voteResults: VoteResult[]): number {
    const vote = this.getVote(votes);
    return voteResults.filter(
      (voteResult) =>
        voteResult.voteId === vote?.id && voteResult.voteType === VoteType.NO
    ).length;
  }
}
