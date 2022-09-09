import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DialogFields } from 'src/app/models/dialog-fields.model';
import { Financial } from 'src/app/models/financial.model';

@Component({
  selector: 'custom-dialog.component',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.css']
})
export class CustomDialogComponent {

  constructor(public _dialogRef: MatDialogRef<CustomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogFields[]) { }

  afterOpened (): void { }

  onNoClick (): void {
    this._dialogRef.close();
  }
}