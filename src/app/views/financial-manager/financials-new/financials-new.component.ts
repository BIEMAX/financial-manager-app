import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-financials-new',
  templateUrl: './financials-new.component.html',
  styleUrls: ['./financials-new.component.css']
})
export class FinancialsNewComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FinancialsNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  //Global variables
  billName: String;
  billDescription: String;
  billDueDate: Date;
  billTotalValue: Number;
  billAmountQuantity: Number;//Quantidade de vezes da conta
  billTags: Array<String>;

  ngOnInit (): void {
  }

  onExitClick () {
    this.dialogRef.close();
  }

  onSaveClick () {

  }

}
