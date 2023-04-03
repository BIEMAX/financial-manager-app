import { Component, OnInit, ViewChild } from '@angular/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormControl } from '@angular/forms';
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
import { FinancialModel } from 'src/app/models/financial.model';
import { DialogReport } from 'src/app/util/error-dialog-report';
import { GenericFunctions } from 'src/app/util/generic-functions';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MM/YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'financials-list.component',
  styleUrls: ['financials-list.component.css'],
  templateUrl: 'financials-list.component.html',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class FinancialsListComponent implements OnInit {

  /**
   * Description to filter bills
   */
  public descToFilter: string = "";
  /**
   * Tag to filter bills
   */
  public tagToFilter: string = "";
  public hasToWait: Boolean = false;
  public listBills: MatTableDataSource<any>;
  /**
   * Contains all columns from api
   */
  public defaultColumns: any[];
  /**
   * Contains only visible columns based on device (web or mobile)
   */
  public displayedColumns: string[];
  public date = new FormControl(moment());

  /**
   * Define default color on UI (User Interface)
   */
  public uiColor: string = ui.color;
  public isMobileDevice: Boolean = false;
  public expandFilterTab: Boolean;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private billsService: BillsService,
    private dialogReport: DialogReport,
    private genericFunctions: GenericFunctions
  ) { }

  ngOnInit () {
    this.isMobileDevice = this.genericFunctions.isMobileDevice();
    this.expandFilterTab = !this.isMobileDevice;
    this.loadDefaultColumns();
    this.paginator._intl.itemsPerPageLabel = "Items por página";
  }

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
    let description = this.descToFilter != undefined && this.descToFilter != '' ? this.descToFilter : undefined;
    let tag = this.tagToFilter != undefined && this.tagToFilter != '' ? this.tagToFilter : undefined;
    this.billsService.getBills(month, year, description, tag).subscribe(
      response => {
        if (this.listBills != undefined) this.listBills = undefined;
        let data: any = response;

        if ((this.descToFilter || this.tagToFilter) && data.length > 0) {
          let sumBillsValues = {
            id: '123',
            user: '',
            name: 'Somatório dos valores',
            dueDate: '',
            description: '',
            isBillPayed: false,
            isCashEntry: null,
            isToDivideValue: false,
            quantityAmount: 0,
            tags: ['Somatório'],
            value: parseFloat(data.map((b) => b.value).reduce((b1, b2) => b1 + b2)).toFixed(2),
            disableEdit: true,
            disableDelete: true
          };
          data.push(sumBillsValues);
          this.listBills = new MatTableDataSource(data);
        } else this.listBills = new MatTableDataSource(data);

        this.listBills.sort = this.sort;
        this.listBills.paginator = this.paginator;
        this.hasToWait = false;
        this.genericFunctions.showNotification('Contas pesquisados');
      },
      error => {
        if (this.listBills != undefined) this.listBills = undefined;
        this.hasToWait = false;
        this.dialogReport.showMessageDialog(error, true, true);
      }
    );
  }

  /**
   * Open a dialog to create a new bill
   */
  openDialogAddNewBill (bill?: any): void {
    const dialogRef = this.dialog.open(FinancialsNewComponent, {
      disableClose: true,
      width: 'auto',
      height: 'auto',
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
        this.genericFunctions.showNotification('Nova conta a pagar não foi salva');
        if (environment.logInfo) console.log('The dialog openDialogAddNewBill was closed');
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
        this.genericFunctions.showNotification('Conta salva com êxito');

        this.getBills(); //Update the screen
      },
      error => {
        this.hasToWait = false;
        if (environment.logInfo) console.log(error);
        this.dialogReport.showMessageDialog(error, true, true);
      }
    );
  }

  updateBill (bill: any) {
    this.hasToWait = true;
    this.billsService.updateBill(bill).subscribe(
      response => {
        this.hasToWait = false;
        if (environment.logInfo) console.log(response);
        this.genericFunctions.showNotification('Conta atualizada com êxito');

        this.getBills(); //Update the screen
      },
      error => {
        this.hasToWait = false;
        if (environment.logInfo) console.log(error);
        this.dialogReport.showMessageDialog(error, true, true);
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
          this.genericFunctions.showNotification('Conta excluída com êxito');

          this.getBills(); //Update the screen
        },
        error => {
          this.hasToWait = false;
          if (environment.logInfo) console.log(error.error.message);
          this.dialogReport.showMessageDialog(error, true, true);
        }
      );
    }
    else return;
  }

  /**
   * Set the next month and get the bills
   */
  nextMonth () {
    const ctrlValue = this.date.value!;
    ctrlValue.month(ctrlValue.month() + 1);
    this.date.setValue(ctrlValue);
    this.getBills();
  }

  /**
   * Set the previous month and get the bills
   */
  previousMonth () {
    const ctrlValue = this.date.value!;
    ctrlValue.month(ctrlValue.month() - 1);
    this.date.setValue(ctrlValue);
    this.getBills();
  }

  loadDefaultColumns () {
    this.defaultColumns = [
      { def: 'type', showColumn: true },
      { def: 'name', showColumn: true },
      { def: 'dueDate', showColumn: true },
      { def: 'value', showColumn: true },
      { def: 'quantityAmount', showColumn: true },
      { def: 'tags', showColumn: false },
      { def: 'isBillPayed', showColumn: true },
      { def: 'userActions', showColumn: true },
    ];
    this.getDisplayedColumns();
  }

  /**
   * Get displayed columns based on device
   * @returns string[]
   */
  getDisplayedColumns () {
    this.displayedColumns =
      this.defaultColumns
        .filter(cd => cd['showColumn'] !== false)
        .map(cd => typeof cd === 'string' ? cd : cd.def);
  }

}