export class DialogFields {

  fieldName: String;
  fieldType: String;
  fieldDescription?: String;
  fieldValue?: any;

  /**
   * 
   * @param FieldName Field label that will appear in the screen
   * @param FieldType Field type (date, number, bool, string, text)
   * @param FieldDescription Description about the field (will be 'placeholder' on the screen)
   * @param FieldValue Return field value defined
   */
  constructor(FieldName: String, FieldType: String, FieldDescription?: String, FieldValue?: any) {
    this.fieldName = FieldName;
    this.fieldType = FieldType;
    this.fieldValue = FieldValue;
  }
}