import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { ui } from 'src/environments/environment';
import { environment } from 'src/environments/environment';
import { TagModel } from 'src/app/models/tag.model';
import { DialogReport } from 'src/app/util/error-dialog-report';
import { GenericFunctions } from 'src/app/util/generic-functions';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'financials-tags.component',
  styleUrls: ['financials-tags.component.css'],
  templateUrl: 'financials-tags.component.html',
  providers: [],
})
export class FinancialsTagsComponent implements OnInit {

  /**
   * Description to filter bills
   */
  public descToFilter: string = "";
  /**
   * Tag to filter bills
   */
  public tagToFilter: string = "";
  public hasToWait: Boolean = false;
  public listTags: MatTableDataSource<any>;
  public displayedColumns: string[];

  /**
   * Define default color on UI (User Interface)
   */
  public uiColor: string = ui.color;
  public isMobileDevice: Boolean = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private tagsService: TagsService,
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
  getTags () {
    this.hasToWait = true;
    let description = this.descToFilter != undefined && this.descToFilter != '' ? this.descToFilter : undefined;
    this.tagsService.getTags().subscribe(
      response => {
        if (this.listTags != undefined) this.listTags = undefined;
        let data: any = response;

        this.listTags = new MatTableDataSource(data.data.tags.map(
          (t) => { return { name: t.toString() } }
        ));

        this.listTags.sort = this.sort;
        this.listTags.paginator = this.paginator;
        this.hasToWait = false;
        this.showNotification('Dados pesquisados', '');
      },
      error => {
        if (this.listTags != undefined) this.listTags = undefined;
        this.hasToWait = false;
        this.dialogReport.showMessageDialog(error, true, true);
      }
    );
  }

  /**
   * Open a dialog to create a new bill
   */
  openDialogAddNewTag (bill?: any): void {
    // const dialogRef = this.dialog.open(FinancialsNewComponent, {
    //   disableClose: true,
    //   width: this.genericFunctions.isMobileDevice() ? '100%' : '40%',
    //   autoFocus: true,
    //   data: bill
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result != undefined) {
    //     if (environment.logInfo) console.log('result: ', result);
    //     if (bill && result.id != '0') this.updateBill(result);//If exist an bill, means its a update
    //     else this.saveBill(result);
    //   }
    //   else {
    //     this.showNotification('Nova conta a pagar não foi salva', '');
    //     if (environment.logInfo) console.log('The dialog was closed');
    //   }
    // });
  }

  /**
   * Create a new tag
   * @param bill 
   */
  saveTag (bill: any) {
    // this.hasToWait = true;
    // this.billsService.createBill(bill).subscribe(
    //   response => {
    //     this.hasToWait = false;
    //     if (environment.logInfo) console.log(response);
    //     this.showNotification('Conta salva com êxito', '');

    //     this.getBills(); //Update the screen
    //   },
    //   error => {
    //     this.hasToWait = false;
    //     if (environment.logInfo) console.log(error);
    //     this.dialogReport.showMessageDialog(error, true, true);
    //   }
    // );
  }

  updateBill (bill: any) {
    // this.hasToWait = true;
    // this.billsService.updateBill(bill).subscribe(
    //   response => {
    //     this.hasToWait = false;
    //     if (environment.logInfo) console.log(response);
    //     this.showNotification('Conta atualizada com êxito', '');

    //     this.getBills(); //Update the screen
    //   },
    //   error => {
    //     this.hasToWait = false;
    //     if (environment.logInfo) console.log(error);
    //     this.dialogReport.showMessageDialog(error, true, true);
    //   }
    // );
  }

  deleteTag (tag: TagModel) {
    if (confirm("Você deseja realmente excluir a tag? Uma vez feita, não será possível desfazer")) {
      this.hasToWait = true;
      this.tagsService.deleteTag(tag.name).subscribe(
        response => {
          this.hasToWait = false;
          if (environment.logInfo) console.log(response);
          this.showNotification('Tag excluída com êxito', '');

          this.getTags(); //Update the screen
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
    this.displayedColumns = [
      'name',
      'update',
      'delete'
    ];
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
}