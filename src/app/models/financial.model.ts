import { EmptyFieldException } from 'src/app/exceptions/empty.field.exception';

export class FinancialModel {
  id: String;
  user: String;
  name: String;
  dueDate: String;
  description: String;
  value: Number;
  quantityAmount: Number;
  tags: Array<String>;
  isCashEntry: Boolean;
  isBillPayed: Boolean = false;
  isToDivideValue: Boolean = false;

  constructor(
    Id: String,
    User: String,
    Name: String,
    DueDate: String,
    Description: String,
    Value: Number,
    QuantityAmount: Number,
    Tags: Array<String>,
    IsCashEntry: Boolean,
    IsBillPayed: Boolean,
    IsToDivideValue: Boolean
  ) {
    if (typeof (Id) == "undefined" || !Id) throw new EmptyFieldException("Id");
    else if (typeof (Name) == "undefined" || !Name) throw new EmptyFieldException("Nome da conta");
    else if (typeof (DueDate) == "undefined" || !DueDate) throw new EmptyFieldException("Data de vencimento");
    else if (typeof (Value) == "undefined" || !Value) throw new EmptyFieldException("Valor");
    else {
      this.id = Id;
      this.user = User;
      this.name = Name;
      this.dueDate = DueDate;
      this.description = Description;
      this.value = Value;
      this.quantityAmount = QuantityAmount || 1;
      this.tags = Tags;
      this.isCashEntry = IsCashEntry;
      this.isBillPayed = IsBillPayed;
      this.isToDivideValue = IsToDivideValue;
    }
  }
}