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

@Component({
  selector: 'app-financials-new',
  templateUrl: './financials-new.component.html',
  styleUrls: ['./financials-new.component.css']
})
export class FinancialsNewComponent implements OnInit {

  //NG Models variables
  billName: String;
  billDueDate: String;
  billDescription: String;
  billTotalValue: Number;
  billAmountQuantity: Number = 1;//Quantidade de vezes da conta
  billTags: string[] = ['Contas fixas'];
  isCashIn: Boolean = false;
  uiColor: string = ui.color;
  billId: String;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl('');
  filteredTags: Observable<string[]>;
  allTags: string[] = ['Contas fixas', 'Contas não previstas', 'Faculdade', 'Mercado', 'Lazer', 'Salário', 'Cŕedito'];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  constructor(
    public dialogRef: MatDialogRef<FinancialsNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this.filterTag(fruit) : this.allTags.slice())),
    );
  }

  ngOnInit (): void {
    if (this.data) { //Its an update
      this.billId = this.data.id;
      this.billName = this.data.name;
      this.billDueDate = `${this.data.dueDate.split("/")[2]}-${this.data.dueDate.split("/")[1]}-${this.data.dueDate.split("/")[0]}`;
      this.billDescription = this.data.description;
      this.billTotalValue = this.data.value;
      this.billAmountQuantity = this.data.quantityAmount;
      this.billTags = this.data.tags;
      this.isCashIn = this.data.isCashIn;
    }
  }

  onSaveClick () {
    this.data = new FinancialModel(
      this.billId ? this.billId : '0',
      localStorage.getItem('userLogin'),
      this.billName,
      `${this.billDueDate}T${new Date().toLocaleTimeString()}Z`,
      this.billDescription || '',
      this.billTotalValue,
      this.billAmountQuantity,
      this.billTags,
      this.isCashIn
    );
    if (environment.logInfo) console.log('this.data: ', this.data);
    this.dialogRef.close(this.data);
  }

  onExitClick () {
    if (this.validateBeforeExit()) this.dialogRef.close();
  }

  validateBeforeExit () {
    if (this.billName || this.billDescription || this.billDueDate || this.billTotalValue || this.billAmountQuantity) {
      if (confirm("Você deseja realmente sair?")) return true;
      else return false;
    } else return true;
  }

  addTag (event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add new tag
    if (value) this.billTags.push(value);

    // Clear the input value
    event.chipInput!.clear();
    this.tagCtrl.setValue(null);
  }

  selectTag (event: MatAutocompleteSelectedEvent): void {
    if (this.billTags.length <= 0)
      this.billTags.push(event.option.viewValue);
    else {
      if (this.billTags.filter(t => t.toUpperCase().trim() == event.option.viewValue.toUpperCase().trim()).length <= 0)
        this.billTags.push(event.option.viewValue);
    }
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  removeTag (tag: string): void {
    const index = this.billTags.indexOf(tag);

    if (index >= 0) {
      this.billTags.splice(index, 1);
    }
  }

  filterTag (value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }

}