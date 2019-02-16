class Maybe {
  constructor(value) {
    this._value = value;
  }

  static of(value) {
    return new Maybe(value);
  }

  _isNothing() {
    return this._value === null || this._value === undefined;
  }

  map(fn) {
    return this._isNothing()
      ? Maybe.of(null)
      : Maybe.of(fn(this._value));
  }

  getOrElse(defaultValue) {
    return this._isNothing()
      ? defaultValue
      : this._value;
  }
}

export default Maybe;
