import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'user-dialog-report.component',
  templateUrl: './user-dialog-report.component.html',
  styleUrls: ['./user-dialog-report.component.css']
})
export class UserDialogComponent implements OnInit {

  public firstMessage: string = 'Não se preocupe, ocorreu um erro e já o reportamos para a nossa equipe que irá analisar.';
  public secondMessage: string = 'Caso continue obtendo este erro, você poderá abrir uma solicitação de suporte através:';
  public issuesReportLink: string = 'https://github.com/BIEMAX/financial-manager-app/issues';

  constructor(
    public _dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit (): void { }

  onNoClick (): void {
    this._dialogRef.close();
  }
}