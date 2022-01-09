export class RandomDie {
  constructor(public numOfSides: number) { }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numOfSides);
  }

  roll({ numOfRolls }: { numOfRolls: number }) {
    var output = [];
    for (var i = 0; i < numOfRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}
