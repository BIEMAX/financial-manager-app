import { EmptyFieldException } from '../exceptions/empty.field.exception'

export class Financial {
  id: String;
  user: String;
  description: String;
  dueDate: Date;
  value: Number;

  constructor(Id: String, User: String, Description: String, DueDate: Date, Value: Number) {
    if (typeof (Id) == "undefined" || !Id) throw new EmptyFieldException(Id);
    else if (typeof (Description) == "undefined" || !Description) throw new EmptyFieldException(Description);
    else if (typeof (DueDate) == "undefined" || !DueDate) throw new EmptyFieldException(DueDate);
    else if (typeof (Value) == "undefined" || !Value) throw new EmptyFieldException(Value);
    else {
      this.id = Id;
      this.user = User;
      this.description = Description;
      this.dueDate = DueDate;
      this.value = Value;
    }
  }
}