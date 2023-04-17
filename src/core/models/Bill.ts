export default class Bill {
  public id?: number;
  public title: string;
  public sponsorId: number;

  constructor(id: number, title: string, sponsorId: number) {
    this.id = id || undefined;
    this.title = title;
    this.sponsorId = sponsorId;
  }
}
