export class EmptyFieldException extends Error {
  constructor(fieldObject: Object) {
    super(`Campo '${fieldObject}' não pode ser vazio ou nulo`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'EmptyFieldException';
  }
}