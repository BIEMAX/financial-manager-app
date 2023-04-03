import {
  Component,
  Inject,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DialogFields } from 'src/app/models/dialog-fields.model';
import { ui } from 'src/environments/environment';

@Component({
  selector: 'help-dialog.component',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.css']
})
export class HelpDialogComponent {

  /**
   * Define default color on UI (User Interface)
   */
  public uiColor: string = ui.color;

  constructor(
    public _dialogRef: MatDialogRef<HelpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick (): void {
    this._dialogRef.close();
  }
}