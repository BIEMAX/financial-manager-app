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
import { HelpDialogComponent } from '../../generic/help-dialog/help-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-financials-new',
  templateUrl: './financials-new.component.html',
  styleUrls: ['./financials-new.component.css']
})
export class FinancialsNewComponent implements OnInit {

  public billName: string;
  public billDueDate: string; //format yyyy-MM-dd
  public billDescription: string;
  public billTotalValue: number;
  /**
   * Quantity times that the bill will be paid.
   */
  public billAmountQuantity: number = 1;
  /**
   * Contains the tags linked to new bill creation
   */
  public listTags: string[] = ['Contas fixas']; //Starter tag
  public isCashEntry: Boolean = false;
  public uiColor: string = ui.color;
  public billId: string;
  public isBillPayed: boolean = false;
  public isBillValueToDivide: boolean = false;

  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public tagCtrl = new FormControl('');
  public filteredTags: Observable<string[]>;
  /**
   * Contains the calculation (using variables billTotalValue and billAmountQuantity)
   * to format and show the correct value.
   */
  public installmentValue: number;
  public installmentDescription: string;

  /**
   * Contains the user tags previously stored into database.
   */
  private allTags: string[];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  public firstFormGroup: FormGroup = this.formBuilder.group({ firstCtrl: [''] });
  public secondFormGroup: FormGroup = this.formBuilder.group({ secondCtrl: [''] });

  constructor(
    public dialogRef: MatDialogRef<FinancialsNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tagsService: TagsService,
    private dialogReport: DialogReport,
    private genericFunctions: GenericFunctions,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) { }

  ngOnInit (): void {
    if (this.data) { //Its an update
      this.billId = this.data.id;
      this.billName = this.data.name;
      this.billDueDate = `${this.data.dueDate.split("/")[2]}-${this.data.dueDate.split("/")[1]}-${this.data.dueDate.split("/")[0]}`;
      this.billDescription = this.data.description;
      this.billTotalValue = this.data.value;
      this.billAmountQuantity = this.data.quantityAmount;
      this.listTags = this.data.tags;
      this.isCashEntry = this.data.isCashEntry;
      this.isBillPayed = this.data.isBillPayed;
    } else {
      this.billDueDate = new Date().toISOString().split("T")[0];
    }
    this.getTagsByUser();
  }

  onSaveClick () {
    try {
      this.data = new FinancialModel(
        this.billId ? this.billId : '0',
        localStorage.getItem('userLogin'),
        this.billName,
        `${this.billDueDate}T${new Date().toLocaleTimeString('pt-BR')}.000Z`,
        this.billDescription || '',
        this.billTotalValue,
        this.billAmountQuantity,
        this.listTags,
        this.isCashEntry,
        this.isBillPayed || false,
        this.isBillValueToDivide
      );

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
    if (this.listTags.length > 0) {
      let newTags = this.listTags.filter(t => !this.allTags.includes(t));
      if (newTags.length > 0) {
        newTags.map((newTag) => {
          //If tag doesn't exist, creat it 
          this.tagsService.createTag(newTag).subscribe(
            response => { if (environment.logInfo) console.log('response: ', response); },
            error => { if (environment.logInfo) console.log('error: ', error); }
          );
        })
      }
    }
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
    if (value) this.listTags.push(value);

    // Clear the input value
    event.chipInput!.clear();
    this.tagCtrl.setValue(null);
  }

  selectTag (event: MatAutocompleteSelectedEvent): void {
    if (this.listTags.length <= 0)
      this.listTags.push(event.option.viewValue);
    else {
      if (this.listTags.filter(t => t.toUpperCase().trim() == event.option.viewValue.toUpperCase().trim()).length <= 0)
        this.listTags.push(event.option.viewValue);
    }
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  removeTag (tag: string): void {
    const index = this.listTags.indexOf(tag);

    if (index >= 0) {
      this.listTags.splice(index, 1);
    }
  }

  filterTag (value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }

  getTagsByUser () {
    this.tagsService.getTags().subscribe(
      response => {
        let resp: any = response;
        if (resp.data) {
          this.allTags = resp.data.tags;
          this.filteredTags = this.tagCtrl.valueChanges.pipe(
            startWith(null),
            map((tag: string | null) => (tag ? this.filterTag(tag) : this.allTags.slice())),
          );
        }
        else this.genericFunctions.showNotification('Não foi possível identificar tags no seu usuário', 'Erro');
      },
      error => {
        if (environment.logInfo) console.log('error on save: ', error);
        this.dialogReport.showMessageDialog(error, true, true);
      }
    )
  }

  /**
   * After the user fill the 'value' and 'quantity of amounts', we calculate
   * each value will be payed and format.
   */
  calculateAmountValue () {
    if (this.billAmountQuantity > 1 && this.billTotalValue > 1) {
      if (this.isBillValueToDivide) {
        this.installmentValue = Math.round(this.billTotalValue / this.billAmountQuantity);
        this.installmentDescription = `Parcelar o valor total? Valor por prestação: R$ ${this.installmentValue}`;
      }
      else {
        this.installmentValue = Math.round(this.billTotalValue * this.billAmountQuantity);
        this.installmentDescription = `Parcelar o valor total? Valor total à pagar: R$ ${this.installmentValue}`;
      }
    }
  }

  /**
   * Show a help dialog to user understand the functionality.
   */
  showHelpDialog () {
    let help = `
    Exemplo:
    <br><br>
    Caso a opção 'parcelar o valor total' seja marcada, <br>
    o sistema irá aplicar a seguinte fórmula:
    <br><br>
    valorTotalDaConta / numeroPrestacoes = valorPorPrestacao
    <br><br>
    <strong>E.g.: 1500 / 10 = R$ 150,00</strong> será o <br>
    valor pago <strong>por</strong> prestação à pagar
    <br><br>
    Caso a opção esteja desmarcada, o cálculo será feito da seguinte forma:
    <br><br>
    valorTotalDaConta * numeroPrestacoes = valorPorPrestacao
    <br><br>
    <strong>E.g.: 1500 * 10 = R$ 15.000,00</strong> será o <br>
    valor total à ser pago <strong>após as dez prestações</strong>
    `;

    const dialogRef = this.dialog.open(HelpDialogComponent, {
      disableClose: true,
      width: 'auto',
      height: 'auto',
      autoFocus: true,
      data: help
    });

    dialogRef.afterClosed().subscribe(r => { });
  }

}