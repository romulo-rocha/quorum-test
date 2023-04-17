export default class Vote {
  public id?: number;
  public billId: number;

  constructor(id: number | undefined, billId: number) {
    this.id = id || undefined;
    this.billId = billId;
  }
}
