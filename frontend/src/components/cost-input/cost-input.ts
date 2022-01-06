import Transaction from "../../models/transaction";
import User from "../../models/user";

export class CostInput {
  transactionInput?: HTMLInputElement;
  userInput?: HTMLInputElement;

  transactions: Array<Transaction> = [];
  users: Array<User> = [];
  participantsToShareSum: Array<User> = [];

  constructor() {
    this.transactions = [
      new Transaction(100),
      new Transaction(200),
      new Transaction(300),
    ];

    this.users = [
      new User("Max"),
      new User("John"),
      new User("Tom"),
      new User("Markus Rutström"),
      new User("1 2 3"),
    ];
  }

  attached() {
    this.addEventListeners();
  }

  public get transactionSum(): number {
    let sum = 0;
    this.transactions.forEach((transaction) => {
      sum += transaction.amount;
    });

    return sum;
  }
  public get transactionUnallocatedSum() {
    let sum = 0;
    this.getTransactionsWithoutParticipants().forEach((transaction) => {
      sum += transaction.amount;
    });

    return sum;
  }

  public getTransactionsWithoutParticipants(): Array<Transaction> {
    return this.transactions.filter(
      (transaction) => transaction.participants.length === 0
    );
  }

  addTransaction(): void {
    if (!this.transactionInput) return;
    const value = parseInt(this.transactionInput.value, 10);
    if (isNaN(value)) return;
    this.transactions.push(new Transaction(value));
    this.transactionInput.value = "";
  }

  addUser(): void {
    if (!this.userInput) return;
    const value = this.userInput.value;
    if (value === "") return;
    this.users.push(new User(value));
    this.userInput.value = "";
  }

  addRandomUserToTransaction(transaction: Transaction): void {
    const randomUser =
      this.users[Math.floor(Math.random() * this.users.length)];
    transaction.addParticipant(randomUser);
  }

  addRandomUserToUnallocatedSum(): void {
    const randomUser =
      this.users[Math.floor(Math.random() * this.users.length)];
    this.participantsToShareSum.push(randomUser);
  }

  private addEventListeners() {
    if (!this.transactionInput) return;
    this.transactionInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.addTransaction();
      }
    });

    if (!this.userInput) return;
    this.userInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.addUser();
      }
    });
  }
}
