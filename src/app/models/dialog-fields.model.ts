export class DialogFields {

  fieldName: String;
  fieldType: any;
  fieldValue?: any;

  constructor(FieldName: String, FieldType: any, FieldValue?: any) {
    this.fieldName = FieldName;
    this.fieldType = FieldType;
    this.fieldValue = FieldValue;
  }
}