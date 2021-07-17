import Transaction from "../../models/transaction";

export class CostInput {
  inputElement?: HTMLInputElement;

  transactions: Array<Transaction> = [];

  public get transactionSum(): number {
    let sum = 0;
    this.transactions.forEach((transaction) => {
      sum += transaction.amount;
    });

    return sum;
  }

  bound() {
    this.addEventListeners();
  }

  addEventListeners() {
    if (!this.inputElement) return;
    this.inputElement.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.addInput();
      }
    });
  }

  addInput(): void {
    if (!this.inputElement) return;
    const value = parseInt(this.inputElement.value, 10);
    if (isNaN(value)) return;
    this.transactions.push(new Transaction(value));
    this.inputElement.value = "";
  }
}
