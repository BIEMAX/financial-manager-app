import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';

import { ui } from 'src/environments/environment';
import { FinancialsNewComponent } from 'src/app/views/financial-manager/financials-new/financials-new.component';
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
    // var lstFields: DialogFields[] = [
    //   { fieldName: "Bill", fieldType: "string", fieldDescription: 'Name of the bill' },
    //   { fieldName: "Description", fieldType: "string", fieldDescription: 'About the bill' },
    //   { fieldName: "Due date", fieldType: "date", fieldDescription: 'Due date (limit)' },
    //   { fieldName: "Value", fieldType: "number", fieldDescription: 'Value of the bill' },
    //   { fieldName: 'Tags', fieldType: "string", fieldDescription: 'Tag to find the bill' }
    // ];
    const dialogRef = this.dialog.open(FinancialsNewComponent, {
      width: '250px',
      //data: lstFields,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.isValidBill(result)) {
        if (environment.logInfo) console.log('result: ', result);
        this.saveBill(result);
      }
      else {
        this.showNotification('Nova conta a pagar não foi salva', '');
        if (environment.logInfo) console.log('The dialog was closed');
      }
    });
  }

  /**
   * Validate if all fields was filled correctly in the dialog.
   * @param bill Object containing the bill
   * @returns 
   */
  isValidBill (bill: any) {
    return bill.map((b: { fieldValue: any; }) => {
      return b.fieldValue != undefined && b.fieldValue
    }).every((b: boolean) => b == true);
  }

  saveBill (bill: any) {
    this.financialService.createBill(bill).subscribe(
      data => {
        if (environment.logInfo) console.log(data);
        this.showNotification('Conta salva com êxito', '');
      },
      error => {
        if (environment.logInfo) console.log(error);
        this.showNotification(error.message, 'Erro ao tentar salvar nova conta a pagar');
      }
    );
  }
}