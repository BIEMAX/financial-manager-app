import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';

import { ui } from 'src/environments/environment';
import { CustomDialogComponent } from '../../generic/dialog/custom-dialog.component';
import { DialogFields } from 'src/app/models/dialog-fields.model';
import { FinancialsService } from 'src/app/services/financials.service';
import { environment } from 'src/environments/environment';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'financials-list.component',
  styleUrls: ['financials-list.component.css'],
  templateUrl: 'financials-list.component.html',
})
export class FinancialsListComponent implements OnInit {

  //NG Models variables
  descPicked: string = "";
  datePicked: any;

  /**
   * Define default color on UI (User Interface)
   */
  uiColor: string = ui.color;

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private financialService: FinancialsService
  ) { }

  ngOnInit (): void { }

  /**
   * 
   * @param normalizedMonthAndYear 
   * @param datepicker 
   */
  setMonthAndYear (normalizedMonthAndYear: Object, datepicker: MatDatepicker<Object>) {
    // const ctrlValue = this.date.value;
    // ctrlValue.month(normalizedMonthAndYear);
    // ctrlValue.year(normalizedMonthAndYear);
    // this.date.setValue(ctrlValue);
    // datepicker.close();
  }

  /**
   * Call the API to query registers
   */
  search () {
    try {
      this.showNotification('Dados pesquisados', '');
    }
    catch (err) {
      this.showNotification(err, 'Error when searching');
    }
  }

  /**
   * Show a notification in the main page
   * @param message Message to display
   * @param action Origin event
   * @param duration Integer containing the value to animation time
   */
  showNotification (message: string, action: string, duration = 2000) {
    this.snackBar.open(message, action, { duration: duration })
  }

  applyFilter (event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  openDialogAddNewBill (): void {
    var lstFields: DialogFields[] = [
      { fieldName: "Bill", fieldType: String },
      { fieldName: "Description", fieldType: String },
      { fieldName: "Date", fieldType: Date },
      { fieldName: "Value", fieldType: Number },
    ]
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      width: '250px',
      data: lstFields
    });

    dialogRef.afterClosed().subscribe(result => {
      if (environment.logInfo) console.log('The dialog was closed');
      if (environment.logInfo) console.log('result: ', result);
      this.saveBill(result);
    });
  }

  saveBill (bill: any) {
    this.financialService.createBill(bill).subscribe(
      data => {
        if (environment.logInfo) console.log(data);
        this.showNotification('Conta salva com êxito', '');
      },
      error => {
        if (environment.logInfo) console.log(error);
        //this.hasToWait = false;
        this.showNotification(error.message, 'Erro ao tentar efetuar login');
      }
    );
  }
}