import { Component, OnInit, ViewChild } from '@angular/core';
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
import { FinancialsTagNewComponent } from '../financials-tag-new/financials-tag-new.component';

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
  /**
   * Contains a data source with tags and some properties.
   */
  public dsListTags: MatTableDataSource<any>;
  public displayedColumns: string[];
  /**
   * Contains original list tags data from api to filter to
   * validate if a tag already exist.
   */
  public listTags: string[];

  /**
   * Define default color on UI (User Interface)
   */
  public uiColor: string = ui.color;
  public isMobileDevice: Boolean = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private tagsService: TagsService,
    private dialogReport: DialogReport,
    private genericFunctions: GenericFunctions
  ) { }

  ngOnInit () {
    this.isMobileDevice = this.genericFunctions.isMobileDevice();
    this.setDisplayedColumnsByDevice();
    this.paginator._intl.itemsPerPageLabel = "Items por página";
    this.getTags();
  }

  /**
   * Call the API to query registers
   */
  getTags () {
    this.hasToWait = true;
    let description = this.descToFilter != undefined && this.descToFilter != '' ? this.descToFilter : undefined;
    this.tagsService.getTags().subscribe(
      response => {
        if (this.dsListTags != undefined) this.dsListTags = undefined;
        let data: any = response;
        this.listTags = data.data.tags;

        this.dsListTags = new MatTableDataSource(data.data.tags.map(
          (t) => { return { name: t.toString() } }
        ));

        this.dsListTags.sort = this.sort;
        this.dsListTags.paginator = this.paginator;
        this.hasToWait = false;
        this.genericFunctions.showNotification('Dados pesquisados');
      },
      error => {
        if (this.dsListTags != undefined) this.dsListTags = undefined;
        this.hasToWait = false;
        this.dialogReport.showMessageDialog(error, true, true);
      }
    );
  }

  /**
   * Open a dialog to create a new bill
   */
  openDialogAddNewTag (bill?: any): void {
    const dialogRef = this.dialog.open(FinancialsTagNewComponent, {
      disableClose: true,
      width: this.genericFunctions.isMobileDevice() ? '100%' : '40%',
      autoFocus: true,
      data: bill
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (environment.logInfo) console.log('result: ', result);
        if (bill && result.id != '0') this.updateBill(result);//If exist an bill, means its a update
        else this.saveTag(result);
      }
      else {
        this.genericFunctions.showNotification('Nova tag não foi salva');
        if (environment.logInfo) console.log('The dialog openDialogAddNewTag was closed');
      }
    });
  }

  /**
   * Create a new tag
   * @param tag 
   */
  saveTag (tag: any) {
    this.hasToWait = true;
    if (!this.isNewTag(tag.name)) {
      this.tagsService.createTag(tag.name).subscribe(
        response => {
          this.hasToWait = false;
          if (environment.logInfo) console.log(response);
          this.genericFunctions.showNotification("Tag salva com êxito");

          this.getTags(); //Update the screen
        },
        error => {
          this.hasToWait = false;
          if (environment.logInfo) console.log(error);
          this.dialogReport.showMessageDialog(error, true, true);
        }
      );
    }
    else {
      this.hasToWait = false;
      this.genericFunctions.showNotification("Tag já existe");
    }
  }

  updateBill (tag: TagModel) {
    // this.hasToWait = true;
    // this.billsService.updateBill(bill).subscribe(
    //   response => {
    //     this.hasToWait = false;
    //     if (environment.logInfo) console.log(response);
    //     this.genericFunctions.showNotification('Conta atualizada com êxito', '');

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
          this.genericFunctions.showNotification('Tag excluída com êxito');

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

  /**
   * Validate if is a new tag.
   * @param tagName tag name
   * @returns 
   */
  isNewTag (tagName: string): boolean {
    if (this.listTags.length <= 0) this.getTags();

    return this.listTags.filter(
      t => t.toString().toUpperCase().trim().includes(tagName.toUpperCase().trim())
    ).length > 0;
  }

  setDisplayedColumnsByDevice () {
    this.displayedColumns = [
      'name',
      'actions'
    ];
  }
}