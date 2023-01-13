import {
  Component,
  OnInit,
  Inject,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FinancialModel } from 'src/app/models/financial.model';
import { environment, ui } from 'src/environments/environment';
import { TagsService } from 'src/app/services/tags.service';
import { DialogReport } from 'src/app/util/error-dialog-report';
import { GenericFunctions } from 'src/app/util/generic-functions';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-financials-defaulters-new',
  templateUrl: './financials-defaulters-new.component.html',
  styleUrls: ['./financials-defaulters-new.component.css']
})
export class FinancialsDefaultersNewComponent implements OnInit {

  /**
   * Existing defaulter ID
   */
  public defaulterId: string;
  public defaulterName: string;
  public defaulterCpf: string;
  public defaulterMail: string;
  public defaulterPhone: string;

  public defaulterZipCode: String;
  public defaulterAddress: string;
  public defaulterNumber: Number = 0;
  public defaulterComplement: string;

  /**
   * Total value of debt/credit
   */
  public defaulterValue: Number = 0;
  /**
   * false = CREDITOR, true = DEBTOR
   */
  public defaulterIsDebtor: Boolean = true;
  /**
   * True if the defaulter will pay more than once time.
   */
  public isDefaulterPayInInstallments: Boolean = false;
  /**
   * Quantity times will pay the value  
   */
  public defaulterQuantity: Number = 1;
  public uiColor: string = ui.color;

  public firstFormGroup: FormGroup = this.formBuilder.group({ firstCtrl: [''] });
  public secondFormGroup: FormGroup = this.formBuilder.group({ secondCtrl: [''] });
  public thirdFormGroup: FormGroup = this.formBuilder.group({ thirdControl: [''] })

  constructor(
    public dialogRef: MatDialogRef<FinancialsDefaultersNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogReport: DialogReport,
    private genericFunctions: GenericFunctions,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit (): void {
    // if (this.data) { //Its an update
    //   this.defaulterId = this.data.id;
    //   this.defaulterName = this.data.name;
    //   this.defaulterCpf = this.data.cpf;
    //   this.defaulterMail = this.data.description;
    //   this.defaulterPhone = this.data.value;
    //   this.defaulterZipCode = this.data.quantityAmount;
    //   this.defaulterAddress = this.data.isCashEntry;
    //   this.defaulterNumber = this.data.isBillPayed;
    //   this.defaulterComplement = this.data.isBillPayed;
    //   this.defaulterValue = this.data.isBillPayed;
    //   this.defaulterIsDebtor = this.data.isBillPayed;
    //   this.isDefaulterPayInInstallments = this.data.isBillPayed;
    //   this.defaulterQuantity = this.data.isBillPayed;
    // }
    // this.getTagsByUser();
  }

  onSaveClick () {
    try {
      // this.data = new FinancialModel(
      //   this.billId ? this.billId : '0',
      //   localStorage.getItem('userLogin'),
      //   this.defaulterName,
      //   this.defaulterCpf,
      //   this.billDescription || '',
      //   this.billTotalValue,
      //   this.billAmountQuantity,
      //   this.isCashEntry,
      //   this.isBillPayed || false,
      //   this.isBillValueToDivide
      // );

      this.thereIsNewTags();

      if (environment.logInfo) console.log('this.data: ', this.data);
      this.dialogRef.close(this.data);
    }
    catch (error) {
      if (environment.logInfo) console.log('error on save: ', error);
      this.dialogReport.showMessageDialog(error, true, true);
      return;
    }
  }

  /**
   * Validate if there are new tags to save in database
   */
  thereIsNewTags () {
    // if (this.billTags.length > 0) {
    //   let newTags = this.billTags.filter(t => !this.allTags.includes(t));
    //   if (newTags.length > 0) {
    //     newTags.map((newTag) => {
    //       //If tag doesn't exist, creat it 
    //       this.tagsService.createTag(newTag).subscribe(
    //         response => { if (environment.logInfo) console.log('response: ', response); },
    //         error => { if (environment.logInfo) console.log('error: ', error); }
    //       );
    //     })
    //   }
    // }
  }

  onExitClick () {
    if (this.validateBeforeExit()) this.dialogRef.close();
  }

  validateBeforeExit () {
    if (this.defaulterName) {
      if (confirm("Você deseja realmente sair?")) return true;
      else return false;
    } else return true;
  }

  addTag (event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // // Add new tag
    // if (value) this.billTags.push(value);

    // // Clear the input value
    // event.chipInput!.clear();
    // this.tagCtrl.setValue(null);
  }

  selectTag (event: MatAutocompleteSelectedEvent): void {
    // if (this.billTags.length <= 0)
    //   this.billTags.push(event.option.viewValue);
    // else {
    //   if (this.billTags.filter(t => t.toUpperCase().trim() == event.option.viewValue.toUpperCase().trim()).length <= 0)
    //     this.billTags.push(event.option.viewValue);
    // }
    // this.tagInput.nativeElement.value = '';
    // this.tagCtrl.setValue(null);
  }

  removeTag (tag: string): void {
    // const index = this.billTags.indexOf(tag);

    // if (index >= 0) {
    //   this.billTags.splice(index, 1);
    // }
  }

  filterTag (value: string): string[] {
    return [''];
    // const filterValue = value.toLowerCase();

    // return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }

  getTagsByUser () {
    // this.tagsService.getTags().subscribe(
    //   response => {
    //     let resp: any = response;
    //     if (resp.data) {
    //       this.allTags = resp.data.tags;
    //       this.filteredTags = this.tagCtrl.valueChanges.pipe(
    //         startWith(null),
    //         map((t: string | null) => (t ? this.filterTag(t) : this.allTags.slice())),
    //       );
    //     }
    //     else this.genericFunctions.showNotification('Não foi possível identificar tags no seu usuário', 'Erro');
    //   },
    //   error => {
    //     if (environment.logInfo) console.log('error on save: ', error);
    //     this.dialogReport.showMessageDialog(error, true, true);
    //   }
    // )
  }

}