import { Component, OnInit, ViewChild } from '@angular/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

// tslint:disable-next-line:no-duplicate-imports
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
const moment = _rollupMoment || _moment;

import { ui } from 'src/environments/environment';
import { FinancialsNewComponent } from 'src/app/views/financial-manager/financials-new/financials-new.component';
import { BillsService } from 'src/app/services/bills.service';
import { environment } from 'src/environments/environment';
import { ResponseStatus } from 'src/app/util/response-status-message';
import { FinancialModel } from 'src/app/models/financial.model';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'financials-list.component',
  styleUrls: ['financials-list.component.css'],
  templateUrl: 'financials-list.component.html',
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class FinancialsListComponent implements OnInit {

  public description: string = "";
  public tag: string = "";
  public hasToWait: Boolean = false;
  public listBills: MatTableDataSource<any>;
  public displayedColumns: string[] = [
    'type',
    'name',
    'dueDate',
    'value',
    'quantityAmount',
    'tags',
    'isBillPayed',
    'update',
    'delete'
  ];
  public date = new FormControl(moment());

  /**
   * Define default color on UI (User Interface)
   */
  uiColor: string = ui.color;

  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private billsService: BillsService
  ) { }

  ngOnInit () { }

  setMonthAndYear (normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  /**
   * Call the API to query registers
   */
  getBills () {
    this.hasToWait = true;
    let month = this.date.value != undefined ? Number.parseInt(this.date.value.format("MM").toString()) : undefined;
    let year = this.date.value != undefined ? this.date.value.year() : undefined;
    let description = this.description != undefined && this.description != '' ? this.description : undefined;
    let tag = this.tag != undefined && this.tag != '' ? this.tag : undefined;
    this.billsService.getBills(month, year, description, tag).subscribe(
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
        if (this.listBills != undefined) this.listBills = undefined;
        this.hasToWait = false;
        this.showNotification(ResponseStatus((error.error.message)), 'Erro');
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
  openDialogAddNewBill (bill?: any): void {
    const dialogRef = this.dialog.open(FinancialsNewComponent, {
      disableClose: true,
      width: '40%',
      autoFocus: true,
      data: bill
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (environment.logInfo) console.log('result: ', result);
        if (bill && result.id != '0') this.updateBill(result);//If exist an bill, means its a update
        else this.saveBill(result);
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
    this.billsService.createBill(bill).subscribe(
      response => {
        this.hasToWait = false;
        if (environment.logInfo) console.log(response);
        this.showNotification('Conta salva com êxito', '');

        this.getBills(); //Update the screen
      },
      error => {
        this.hasToWait = false;
        if (environment.logInfo) console.log(error);
        this.showNotification(ResponseStatus(error.error.message), 'Não foi possível salvar o registro');
      }
    );
  }

  updateBill (bill: any) {
    this.hasToWait = true;
    this.billsService.updateBill(bill).subscribe(
      response => {
        this.hasToWait = false;
        if (environment.logInfo) console.log(response);
        this.showNotification('Conta atualizada com êxito', '');

        this.getBills(); //Update the screen
      },
      error => {
        this.hasToWait = false;
        if (environment.logInfo) console.log(error);
        this.showNotification(ResponseStatus(error.error.message), 'Não foi possível atualizar o registro');
      }
    );
  }

  deleteBill (bill: FinancialModel) {
    if (confirm("Você deseja realmente excluir a conta? Uma vez feita, não será possível desfazer")) {
      this.hasToWait = true;
      this.billsService.deleteBill(bill.id).subscribe(
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

  nextMonth () {
    const ctrlValue = this.date.value!;
    ctrlValue.month(ctrlValue.month() + 1);
    this.date.setValue(ctrlValue);
  }

  previousMonth () {
    const ctrlValue = this.date.value!;
    ctrlValue.month(ctrlValue.month() - 1);
    this.date.setValue(ctrlValue);
  }
}