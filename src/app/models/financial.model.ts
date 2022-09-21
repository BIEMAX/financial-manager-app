import { EmptyFieldException } from '../exceptions/empty.field.exception'

export class FinancialModel {
  id: String;
  user: String;
  name: String;
  dueDate: String;
  description: String;
  value: Number;
  quantityAmount: Number;
  tags: Array<String>;
  isCashIn: Boolean;

  constructor(
    Id: String,
    User: String,
    Name: String,
    DueDate: String,
    Description: String,
    Value: Number,
    QuantityAmount: Number,
    Tags: Array<String>,
    IsCashIn: Boolean
  ) {
    if (typeof (Id) == "undefined" || !Id) throw new EmptyFieldException(Id);
    else if (typeof (Name) == "undefined" || !Name) throw new EmptyFieldException(Name);
    else if (typeof (DueDate) == "undefined" || !DueDate) throw new EmptyFieldException(DueDate);
    else if (typeof (Value) == "undefined" || !Value) throw new EmptyFieldException(Value);
    else {
      this.id = Id;
      this.user = User;
      this.name = Name;
      this.dueDate = DueDate;
      this.description = Description;
      this.value = Value;
      this.quantityAmount = QuantityAmount || 1;
      this.tags = Tags;
      this.isCashIn = IsCashIn;
    }
  }
}