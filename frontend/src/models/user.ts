export default class User {
  constructor(private _name: string) {}

  get name() {
    return this._name;
  }

  get shorthand() {
    const names = this._name.split(" ");
    const shorthand =
      names.length <= 1
        ? names[0].substring(0, 1)
        : names[0].substring(0, 1) + names[names.length - 1].substring(0, 1);
    return shorthand;
  }
}
