export default class User {
  constructor(private _name: string) {}

  get name() {
    return this._name;
  }
}
