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
import { DialogReport } from 'src/app/util/error-dialog-report';
import { GenericFunctions } from 'src/app/util/generic-functions';
import { FinancialsDefaultersNewComponent } from '../financials-defaulters-new/financials-defaulters-new.component';
import { DefaulterModel } from 'src/app/models/defaulter.model';
import { HistoryComponent } from '../../generic/history/history.component';
import { FinancialsDefaultersSubtractComponent } from 'src/app/views/financial-manager/financials-defaulters-subtract/financials-defaulters-subtract.component';

@Component({
  selector: 'financials-defaulters.component',
  styleUrls: ['financials-defaulters.component.css'],
  templateUrl: 'financials-defaulters.component.html',
  providers: [],
})
export class FinancialsDefaultersComponent implements OnInit {

  /**
   * Description to filter defaulters
   */
  public descToFilter: string = "";
  /**
   * Tag to filter defaulters
   */
  public tagToFilter: string = "";
  public hasToWait: Boolean = false;
  public listDefaulters: MatTableDataSource<any>;
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
    private defaultersService: DefaultersService,
    private dialogReport: DialogReport,
    private genericFunctions: GenericFunctions
  ) { }

  ngOnInit () {
    this.isMobileDevice = this.genericFunctions.isMobileDevice();
    this.expandFilterTab = !this.isMobileDevice;
    this.loadDefaultColumns();
    this.paginator._intl.itemsPerPageLabel = "Items por página";
  }

  /**
   * Call the API to query registers
   */
  getDefaulters () {
    this.hasToWait = true;
    let description = this.descToFilter != undefined && this.descToFilter != '' ? this.descToFilter : undefined;
    // let tag = this.tagToFilter != undefined && this.tagToFilter != '' ? this.tagToFilter : undefined;
    this.defaultersService.getDefaulter(description).subscribe(
      response => {
        if (this.listDefaulters != undefined) this.listDefaulters = undefined;
        let resp: any = response;

        // if ((this.descToFilter || this.tagToFilter) && data.length > 0) {
        //   let sumBillsValues = {
        //     id: '123',
        //     user: '',
        //     name: 'Somatório dos valores',
        //     dueDate: '',
        //     description: '',
        //     isBillPayed: false,
        //     isCashEntry: null,
        //     isToDivideValue: false,
        //     quantityAmount: 0,
        //     tags: ['Somatório'],
        //     value: parseFloat(data.map((b) => b.value).reduce((b1, b2) => b1 + b2)).toFixed(2),
        //     disableEdit: true,
        //     disableDelete: true
        //   };
        //   data.push(sumBillsValues);
        //   this.listBills = new MatTableDataSource(data);
        // } else 
        this.listDefaulters = new MatTableDataSource(resp.data);

        this.listDefaulters.sort = this.sort;
        this.listDefaulters.paginator = this.paginator;
        this.hasToWait = false;
        this.genericFunctions.showNotification('Inadimplentes pesquisados');
      },
      error => {
        if (this.listDefaulters != undefined) this.listDefaulters = undefined;
        this.hasToWait = false;
        this.dialogReport.showMessageDialog(error, true, true);
      }
    );
  }

  /**
   * Open a dialog to create a new defaulter
   */
  openDialogAddNewDefaulter (defaulter?: any): void {
    const dialogRef = this.dialog.open(FinancialsDefaultersNewComponent, {
      disableClose: true,
      width: 'auto',
      height: 'auto',
      autoFocus: true,
      data: defaulter
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (environment.logInfo) console.log('result: ', result);
        if (defaulter && result.id != '0') {
          result.history = [];
          this.updateDefaulter(result);//If exist an defaulter, means its a update
        }
        else this.saveDefaulter(result);
      }
      else {
        this.genericFunctions.showNotification('Inadimplente não foi salvo');
        if (environment.logInfo) console.log('The dialog openDialogAddNewDefaulter was closed');
      }
    });
  }

  /**
   * Create a new defaulter
   * @param defaulter 
   */
  saveDefaulter (defaulter: any) {
    this.hasToWait = true;
    this.defaultersService.createDefaulter(defaulter).subscribe(
      response => {
        this.hasToWait = false;
        if (environment.logInfo) console.log(response);
        this.genericFunctions.showNotification('Inadimplente salvo com êxito');

        this.getDefaulters(); //Update the screen
      },
      error => {
        this.hasToWait = false;
        if (environment.logInfo) console.log(error);
        this.dialogReport.showMessageDialog(error, true, true);
      }
    );
  }

  updateDefaulter (defaulter: DefaulterModel) {
    this.hasToWait = true;
    this.defaultersService.updateDefaulter(defaulter).subscribe(
      response => {
        this.hasToWait = false;
        if (environment.logInfo) console.log(response);
        this.genericFunctions.showNotification('Inadimplente atualizado com êxito');

        this.getDefaulters(); //Update the screen
      },
      error => {
        this.hasToWait = false;
        if (environment.logInfo) console.log(error);
        this.dialogReport.showMessageDialog(error, true, true);
      }
    );
  }

  deleteDefaulter (defaulter: DefaulterModel) {
    if (confirm("Você deseja realmente excluir o Inadimplente? Uma vez feito, não será possível desfazer")) {
      this.hasToWait = true;
      this.defaultersService.deleteDefaulter(defaulter.id).subscribe(
        response => {
          this.hasToWait = false;
          if (environment.logInfo) console.log(response);
          this.genericFunctions.showNotification('Inadimplente excluído com êxito');

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

  subtractValue (defaulter: DefaulterModel) {
    const dialogRef = this.dialog.open(FinancialsDefaultersSubtractComponent, {
      disableClose: true,
      width: 'auto',
      height: 'auto',
      autoFocus: true,
      data: defaulter.history
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (environment.logInfo) console.log('result from subtractValue: ', result);
        if (result.valueToSubtract > 0) {
          let body = {
            id: defaulter.id,
            value: result.valueToSubtract
          }
          this.defaultersService.subtractValueFromDefaulter(body).subscribe(
            response => {
              this.hasToWait = false;
              if (environment.logInfo) console.log(response);
              this.genericFunctions.showNotification('Valor abatido com êxito');

              this.getDefaulters(); //Update the screen
            },
            error => {
              this.hasToWait = false;
              if (environment.logInfo) console.log(error);
              this.dialogReport.showMessageDialog(error, true, true);
            }
          );
        }
      }
      else {
        this.genericFunctions.showNotification('Inadimplente não foi salvo');
        if (environment.logInfo) console.log('The dialog subtractValue was closed');
      }
    });
  }

  viewHistory (defaulter: DefaulterModel) {
    const dialogRef = this.dialog.open(HistoryComponent, {
      disableClose: true,
      width: 'auto',
      height: 'auto',
      autoFocus: true,
      data: defaulter.history
    });

    dialogRef.afterClosed().subscribe(r => { });
  }

  loadDefaultColumns () {
    this.defaultColumns = [
      { def: 'status', showColumn: true },
      { def: 'type', showColumn: true },
      { def: 'name', showColumn: true },
      { def: 'cpf', showColumn: true },
      { def: 'value', showColumn: true },
      { def: 'userActions', showColumn: true }
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