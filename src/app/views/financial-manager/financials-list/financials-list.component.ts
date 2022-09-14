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
  displayedColumns: string[] = ['billName', 'dueDate', 'value', 'quantityAmount', 'tags'];

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
  search () {
    this.hasToWait = true;
    this.financialService.getBillsList(0, 0, '').subscribe(
      response => {
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

  applyFilter (event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

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

  saveBill (bill: any) {
    this.hasToWait = true;
    this.financialService.createBill(bill).subscribe(
      data => {
        this.hasToWait = false;
        if (environment.logInfo) console.log(data);
        this.showNotification('Conta salva com êxito', '');
      },
      error => {
        this.hasToWait = false;
        if (environment.logInfo) console.log(error);
        this.showNotification(ResponseStatus(error.status), 'Não foi possível salvar o registro');
      }
    );
  }
}