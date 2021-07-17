import Transaction from "../../models/transaction";
import User from "../../models/user";

export class CostInput {
  transactionInput?: HTMLInputElement;
  userInput?: HTMLInputElement;

  transactions: Array<Transaction> = [];
  users: Array<User> = [];

  bound() {
    this.addEventListeners();
  }

  public get transactionSum(): number {
    let sum = 0;
    this.transactions.forEach((transaction) => {
      sum += transaction.amount;
    });

    return sum;
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
