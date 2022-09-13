export class EmptyFieldException extends Error {
  constructor(fieldObject: Object) {
    super(`Field '${Object.keys({ fieldObject })}' cannot be null`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'EmptyFieldException';
  }
}