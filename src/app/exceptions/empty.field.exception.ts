export class EmptyFieldException extends Error {
  /**
   * Contains status code for exceptions
   */
  status: string;

  constructor(fieldName: Object) {
    super(`Campo '${fieldName}' não pode ser vazio ou nulo`);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = 'EmptyFieldException';
    this.status = '204';
  }
}