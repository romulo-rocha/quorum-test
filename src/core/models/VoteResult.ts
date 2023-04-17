import { VoteType } from "../enums/VoteType";

export default class VoteResult {
  public id?: number;
  public personId: number;
  public voteId: number;
  public voteType: VoteType;

  constructor(
    id: number | undefined,
    personId: number,
    voteId: number,
    voteType: number
  ) {
    this.id = id || undefined;
    this.personId = personId;
    this.voteId = voteId;
    this.voteType = voteType;
  }
}
