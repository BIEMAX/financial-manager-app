import { EmptyFieldException } from 'src/app/exceptions/empty.field.exception';

export class Phone {
  number: String;
  areaCode: String;
  phoneType: PhoneType

  constructor(Number: String, AreaCode: String, PhoneType: PhoneType) {
    this.number = Number;
    this.areaCode = AreaCode;
    this.phoneType = PhoneType;
  }
}

export enum PhoneType {
  CELLPHONE,
  RESIDENTIAL,
  CONTACT,
  SPOUSE
}

export class Address {
  zipCode: String;
  street: String;
  number: String;
  complement: String;

  constructor(ZipCode: String, Street: String, Number: String, Complement: String) {
    this.number = ZipCode;
    this.street = Street;
    this.number = Number;
    this.complement = Complement;
  }
}

export enum DefaulterStatus {
  ACTIVE,
  CANCELLED,
  BLOCKED
}

export enum DefaulterType {
  DEBTOR,
  CREDITOR
}

export class PaymentDeal {
  value: Number;
  type: DefaulterType;
  payByInstallments: Boolean = false;
  quantity: Number;

  constructor(Value: Number, Type: DefaulterType, Quantity: Number, PayByInstallments: Boolean = false) {
    this.value = Value;
    this.type = Type;
    this.quantity = Quantity;
    this.payByInstallments = PayByInstallments;
  }
}

export class DefaulterHistory {
  description: String;
  date: String

  constructor(Description: String, Date: String) {
    this.description = Description;
    this.date = Date;
  }
}

export class DefaulterModel {
  user: String;
  id: String;
  name: String;
  cpf: String;
  mail: String;
  phone: Phone;
  address: Address;
  status: DefaulterStatus.ACTIVE;
  paymentDeal: PaymentDeal;
  history: Array<DefaulterHistory>;

  constructor(
    User: String,
    Id: String,
    Name: String,
    Cpf: String,
    Mail: String,
    Phone: Phone,
    Address: Address,
    PaymentDeal: PaymentDeal,
    Status: DefaulterStatus.ACTIVE,
    History: Array<DefaulterHistory> = [],
  ) {
    if (typeof (User) == "undefined" || !User) throw new EmptyFieldException("Usuário");
    if (typeof (Id) == "undefined" || !Id) throw new EmptyFieldException("Id");
    else if (typeof (Name) == "undefined" || !Name) throw new EmptyFieldException("Nome do inadimplente");
    else if (typeof (Mail) == "undefined" || !Mail) throw new EmptyFieldException("E-mail");
    else if (typeof (Phone) == "undefined" || !Phone) throw new EmptyFieldException("Telefone");
    else if (typeof (PaymentDeal) == "undefined" || !PaymentDeal) throw new EmptyFieldException("Pagamento");
    else {
      this.user = User;
      this.id = Id;
      this.name = Name;
      this.cpf = Cpf;
      this.mail = Mail;
      this.phone = Phone;
      this.address = Address;
      this.paymentDeal = PaymentDeal;
      this.status = Status;
      this.history = History;
    }
  }
}