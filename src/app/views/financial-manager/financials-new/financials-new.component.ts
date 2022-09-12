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

@Component({
  selector: 'app-financials-new',
  templateUrl: './financials-new.component.html',
  styleUrls: ['./financials-new.component.css']
})
export class FinancialsNewComponent implements OnInit {

  //NG Models variables
  billName: String;
  billDescription: String;
  billDueDate: Date;
  billTotalValue: Number;
  billAmountQuantity: Number = 1;//Quantidade de vezes da conta
  billTags: Array<String>;
  maskTotalValue: String = "R$ 000.000,00"

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl('');
  filteredTags: Observable<string[]>;
  tags: string[] = ['Contas fixas'];
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
  }

  onSaveClick () {

  }

  onExitClick () {
    if (this.validateBeforeExit()) this.dialogRef.close();
  }

  validateBeforeExit () {
    if (this.billName || this.billDescription || this.billDueDate || this.billTotalValue || this.billAmountQuantity) {
      if (confirm("Você deseja realmente sair?")) return true;
      else return false;
    } else return false;
  }

  addTag (event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);
  }

  selectTag (event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  removeTag (tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  filterTag (value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }

}