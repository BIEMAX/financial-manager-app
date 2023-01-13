import {
  Component,
  OnInit,
  Inject,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Address, DefaulterHistory, DefaulterModel, DefaulterStatus, DefaulterType, PaymentDeal, Phone, PhoneType } from 'src/app/models/defaulter.model';
import { environment, ui } from 'src/environments/environment';
import { DialogReport } from 'src/app/util/error-dialog-report';
import { GenericFunctions } from 'src/app/util/generic-functions';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-financials-defaulters-new',
  templateUrl: './financials-defaulters-new.component.html',
  styleUrls: ['./financials-defaulters-new.component.css']
})
export class FinancialsDefaultersNewComponent implements OnInit {

  /**
   * Existing defaulter ID
   */
  public defaulterId: string;
  public defaulterName: string;
  public defaulterCpf: string;
  public defaulterMail: string;
  public defaulterPhone: string;

  public defaulterZipCode: String;
  public defaulterAddress: string;
  public defaulterNumber: Number = 0;
  public defaulterComplement: string;

  /**
   * Total value of debt/credit
   */
  public defaulterValue: Number = 0;
  /**
   * false = CREDITOR, true = DEBTOR
   */
  public defaulterIsDebtor: Boolean = true;
  /**
   * True if the defaulter will pay more than once time.
   */
  public isDefaulterPayInInstallments: Boolean = false;
  /**
   * Quantity times will pay the value  
   */
  public defaulterQuantity: Number = 1;
  public uiColor: string = ui.color;

  public firstFormGroup: FormGroup = this.formBuilder.group({ firstCtrl: [''] });
  public secondFormGroup: FormGroup = this.formBuilder.group({ secondCtrl: [''] });
  public thirdFormGroup: FormGroup = this.formBuilder.group({ thirdControl: [''] })

  public phoneMask = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  constructor(
    public dialogRef: MatDialogRef<FinancialsDefaultersNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogReport: DialogReport,
    private genericFunctions: GenericFunctions,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit (): void {
    if (this.data) { //Its an update of existing defaulter
      this.defaulterId = this.data.id;
      this.defaulterName = this.data.name;
      this.defaulterCpf = this.data.cpf;
      this.defaulterMail = this.data.description;
      this.defaulterPhone = this.data.value;
      this.defaulterZipCode = this.data.quantityAmount;
      this.defaulterAddress = this.data.isCashEntry;
      this.defaulterNumber = this.data.isBillPayed;
      this.defaulterComplement = this.data.isBillPayed;
      this.defaulterValue = this.data.isBillPayed;
      this.defaulterIsDebtor = this.data.isBillPayed;
      this.isDefaulterPayInInstallments = this.data.isBillPayed;
      this.defaulterQuantity = this.data.isBillPayed;
    }
  }

  onSaveClick () {
    try {
      let areaCode = this.defaulterPhone.split(' ')[0].replace('(', '').replace(')', '');
      let phoneNumber = this.defaulterPhone.split(' ')[1];

      let phone = new Phone(
        phoneNumber,
        areaCode,
        phoneNumber.startsWith('3') ? PhoneType.RESIDENTIAL : PhoneType.CELLPHONE
      );
      let address = new Address(
        this.defaulterZipCode,
        this.defaulterAddress,
        this.defaulterNumber.toString(),
        this.defaulterComplement
      );
      let paymentDeal = new PaymentDeal(
        this.defaulterValue,
        this.defaulterIsDebtor ? DefaulterType.DEBTOR : DefaulterType.CREDITOR,
        this.defaulterQuantity,
        this.isDefaulterPayInInstallments
      );
      let history = [new DefaulterHistory('Cadastro', `${new Date().toISOString().split('T')[0]}T${new Date().toLocaleTimeString('pt-BR')}.000Z`)];

      this.data = new DefaulterModel(
        this.defaulterId ? this.defaulterId : '0',
        this.defaulterName,
        this.defaulterCpf,
        this.defaulterMail,
        phone,
        address,
        paymentDeal,
        DefaulterStatus.ACTIVE,
        history
      );

      if (environment.logInfo) console.log('this.data: ', this.data);
      this.dialogRef.close(this.data);
    }
    catch (error) {
      if (environment.logInfo) console.log('error on save: ', error);
      this.dialogReport.showMessageDialog(error, true, true);
      return;
    }
  }

  onExitClick () {
    if (this.validateBeforeExit()) this.dialogRef.close();
  }

  validateBeforeExit () {
    if (this.defaulterName) {
      if (confirm("Você deseja realmente sair?")) return true;
      else return false;
    } else return true;
  }

}