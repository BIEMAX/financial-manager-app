import {
  Component,
  Inject,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DialogFields } from 'src/app/models/dialog-fields.model';

@Component({
  selector: 'custom-dialog.component',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.css']
})
export class CustomDialogComponent {

  constructor(
    public _dialogRef: MatDialogRef<CustomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogFields[]
  ) { }

  onNoClick (): void {
    this._dialogRef.close();
  }
}