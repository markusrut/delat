import User from "./user";

export default class Transaction {
  private _participants: Array<User> = [];
  constructor(private _amount: number, private _date: Date = new Date()) {}

  public get date(): Date {
    return this._date;
  }

  public get participants(): Array<User> {
    return this._participants;
  }

  public get amount(): number {
    return this._amount;
  }

  public get amountPerUser(): number {
    return this._participants.length === 0
      ? this._amount
      : this._amount / this._participants.length;
  }

  public get dateFormated(): string {
    return this._date.toLocaleDateString();
  }

  public addParticipant(user: User) {
    this._participants.push(user);
  }
}
