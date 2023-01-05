import { EmptyFieldException } from 'src/app/exceptions/empty.field.exception';

export class TagModel {
  name: string;

  constructor(Name: string) {
    if (typeof (Name) == "undefined" || !Name) throw new EmptyFieldException("Nome da tag");
    else {
      this.name = Name;
    }
  }
}