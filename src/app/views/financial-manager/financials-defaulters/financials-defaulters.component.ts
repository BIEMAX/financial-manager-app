import { Component, OnInit, ViewChild } from '@angular/core';
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
import { DefaultersService } from 'src/app/services/defaulter.service';
import { environment } from 'src/environments/environment';
import { FinancialModel } from 'src/app/models/financial.model';
import { DialogReport } from 'src/app/util/error-dialog-report';
import { GenericFunctions } from 'src/app/util/generic-functions';
import { FinancialsDefaultersNewComponent } from '../financials-defaulters-new/financials-defaulters-new.component';

@Component({
  selector: 'financials-defaulters.component',
  styleUrls: ['financials-defaulters.component.css'],
  templateUrl: 'financials-defaulters.component.html',
  providers: [],
})
export class FinancialsDefaultersComponent implements OnInit {

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
  public displayedColumns: string[];
  public date = new FormControl(moment());

  /**
   * Define default color on UI (User Interface)
   */
  public uiColor: string = ui.color;
  public isMobileDevice: Boolean = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private defaultersService: DefaultersService,
    private dialogReport: DialogReport,
    private genericFunctions: GenericFunctions
  ) { }

  ngOnInit () {
    this.isMobileDevice = this.genericFunctions.isMobileDevice();
    this.setDisplayedColumnsByDevice();
    this.paginator._intl.itemsPerPageLabel = "Items por página";
  }

  /**
   * Call the API to query registers
   */
  getDefaulters () {
    this.hasToWait = true;
    let description = this.descToFilter != undefined && this.descToFilter != '' ? this.descToFilter : undefined;
    let tag = this.tagToFilter != undefined && this.tagToFilter != '' ? this.tagToFilter : undefined;
    this.defaultersService.getDefaulter(description, tag).subscribe(
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
        this.genericFunctions.showNotification('Dados pesquisados');
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
  openDialogAddNewDefaulter (bill?: any): void {
    const dialogRef = this.dialog.open(FinancialsDefaultersNewComponent, {
      disableClose: true,
      width: this.genericFunctions.isMobileDevice() ? '100%' : '40%',
      autoFocus: true,
      data: bill
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (environment.logInfo) console.log('result: ', result);
        if (bill && result.id != '0') this.updateDefaulter(result);//If exist an bill, means its a update
        else this.saveDefaulter(result);
      }
      else {
        this.genericFunctions.showNotification('Nova conta a pagar não foi salva');
        if (environment.logInfo) console.log('The dialog was closed');
      }
    });
  }

  /**
   * Create a new defaulter
   * @param bill 
   */
  saveDefaulter (bill: any) {
    this.hasToWait = true;
    this.defaultersService.createDefaulter(bill).subscribe(
      response => {
        this.hasToWait = false;
        if (environment.logInfo) console.log(response);
        this.genericFunctions.showNotification('Conta salva com êxito');

        this.getDefaulters(); //Update the screen
      },
      error => {
        this.hasToWait = false;
        if (environment.logInfo) console.log(error);
        this.dialogReport.showMessageDialog(error, true, true);
      }
    );
  }

  updateDefaulter (bill: any) {
    this.hasToWait = true;
    this.defaultersService.updateDefaulter(bill).subscribe(
      response => {
        this.hasToWait = false;
        if (environment.logInfo) console.log(response);
        this.genericFunctions.showNotification('Conta atualizada com êxito');

        this.getDefaulters(); //Update the screen
      },
      error => {
        this.hasToWait = false;
        if (environment.logInfo) console.log(error);
        this.dialogReport.showMessageDialog(error, true, true);
      }
    );
  }

  deleteDefaulter (bill: FinancialModel) {
    if (confirm("Você deseja realmente excluir a conta? Uma vez feita, não será possível desfazer")) {
      this.hasToWait = true;
      this.defaultersService.deleteDefaulter(bill.id).subscribe(
        response => {
          this.hasToWait = false;
          if (environment.logInfo) console.log(response);
          this.genericFunctions.showNotification('Conta excluída com êxito');

          this.getDefaulters(); //Update the screen
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

  setDisplayedColumnsByDevice () {
    if (this.isMobileDevice) {
      this.displayedColumns = [
        'name',
        'dueDate',
        'value',
        'update',
        'delete'
      ];
    }
    else {
      this.displayedColumns = [
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
    }
  }
}