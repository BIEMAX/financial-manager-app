import {
  Component,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ui } from 'src/environments/environment';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'history.component',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  /**
   * Define default color on UI (User Interface)
   */
  public uiColor: string = ui.color;
  public displayedColumns: string[] = [
    'date',
    'description'
  ];

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public _dialogRef: MatDialogRef<HistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit (): void {
    this.data.sort = this.sort;
  }

  onNoClick (): void {
    this._dialogRef.close();
  }
}