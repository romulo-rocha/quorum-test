export class Vote {
  public id?: number;
  public billId: number;

  constructor(id: number, billId: number) {
    this.id = id || undefined;
    this.billId = billId;
  }
}
