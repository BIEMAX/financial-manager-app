import {
  Component,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment, ui } from 'src/environments/environment';
import { DialogReport } from 'src/app/util/error-dialog-report';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'financials-defaulters-subtract.component',
  templateUrl: './financials-defaulters-subtract.component.html',
  styleUrls: ['./financials-defaulters-subtract.component.css']
})
export class FinancialsDefaultersSubtractComponent implements OnInit {

  /**
   * Define default color on UI (User Interface)
   */
  public uiColor: string = ui.color;
  public valueToSubtract: Number;

  public firstFormGroup: FormGroup = this.formBuilder.group({ firstCtrl: [''] });

  constructor(
    public _dialogRef: MatDialogRef<FinancialsDefaultersSubtractComponent>,
    private dialogReport: DialogReport,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit (): void { }

  onExitClick () {
    this._dialogRef.close();
  }

  onSaveClick () {
    try {

      if (environment.logInfo) console.log('this.data: ', this.data);
      this.data.valueToSubtract = this.valueToSubtract;
      this._dialogRef.close(this.data);
    }
    catch (error) {
      if (environment.logInfo) console.log('error on save: ', error);
      this.dialogReport.showMessageDialog(error, true, true);
      return;
    }
  }
}