import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { ui } from 'src/environments/environment';
import { FinancialsNewComponent } from 'src/app/views/financial-manager/financials-new/financials-new.component';
import { FinancialsService } from 'src/app/services/financials.service';
import { environment } from 'src/environments/environment';
import { ResponseStatus } from 'src/app/util/response-status-message';
import { FinancialModel } from 'src/app/models/financial.model';

@Component({
  selector: 'financials-list.component',
  styleUrls: ['financials-list.component.css'],
  templateUrl: 'financials-list.component.html',
})
export class FinancialsListComponent implements OnInit {

  //NG Models variables
  descPicked: string = "";
  datePicked: any;
  hasToWait: Boolean = false;
  listBills: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'dueDate', 'value', 'quantityAmount', 'tags', 'update', 'delete'];

  /**
   * Define default color on UI (User Interface)
   */
  uiColor: string = ui.color;

  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatPaginator) paginator: MatPaginator;

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
  getBills () {
    this.hasToWait = true;
    this.financialService.getBills().subscribe(
      response => {
        if (this.listBills != undefined) this.listBills = undefined;
        let data: any = response;
        this.listBills = new MatTableDataSource(data);
        //this.listBills.sort = this.sort;
        //this.listBills.paginator = this.paginator;

        this.hasToWait = false;
        this.showNotification('Dados pesquisados', '');
      },
      error => {
        this.hasToWait = false;
        if (environment.logInfo) console.log(error);
        this.showNotification(ResponseStatus(error.status), 'Não foi possível buscar os registros');
      }
    );
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

  /**
   * Open a dialog to create a new bill
   */
  openDialogAddNewBill (): void {
    const dialogRef = this.dialog.open(FinancialsNewComponent, {
      disableClose: true,
      width: '40%',
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
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
   * Create a new bill
   * @param bill 
   */
  saveBill (bill: any) {
    this.hasToWait = true;
    this.financialService.createBill(bill).subscribe(
      response => {
        this.hasToWait = false;
        if (environment.logInfo) console.log(response);
        this.showNotification('Conta salva com êxito', '');
      },
      error => {
        this.hasToWait = false;
        if (environment.logInfo) console.log(error);
        this.showNotification(ResponseStatus(error.error.message), 'Não foi possível salvar o registro');
      }
    );
  }

  updateBill (bill: FinancialModel) {
    console.log('Bill to update: ', bill)
  }

  deleteBill (bill: FinancialModel) {
    if (confirm("Você deseja realmente excluir a conta? Uma vez feita, não será possível desfazer")) {
      this.hasToWait = true;
      this.financialService.deleteBill(bill.id).subscribe(
        response => {
          this.hasToWait = false;
          if (environment.logInfo) console.log(response);
          this.showNotification('Conta excluída com êxito', '');

          this.getBills(); //Update the screen
        },
        error => {
          this.hasToWait = false;
          if (environment.logInfo) console.log(error.error.message);
          this.showNotification(ResponseStatus(error.error.message), 'Não foi possível excluir o registro');
        }
      );
    }
    else return;
  }
}