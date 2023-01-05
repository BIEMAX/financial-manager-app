import {
  Component,
  OnInit,
  Inject,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TagModel } from 'src/app/models/tag.model';
import { environment, ui } from 'src/environments/environment';
import { TagsService } from 'src/app/services/tags.service';
import { DialogReport } from 'src/app/util/error-dialog-report';

@Component({
  selector: 'app-financials-tag-new',
  templateUrl: './financials-tag-new.component.html',
  styleUrls: ['./financials-tag-new.component.css']
})
export class FinancialsTagNewComponent implements OnInit {

  public tagName: string;
  public uiColor: string = ui.color;

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  constructor(
    public dialogRef: MatDialogRef<FinancialsTagNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private tagsService: TagsService,
    private dialogReport: DialogReport
  ) { }

  ngOnInit (): void {
    if (this.data) { //Its an update
      this.tagName = this.data.name;
    }
  }

  onSaveClick () {
    try {
      this.data = new TagModel(this.tagName);

      if (environment.logInfo) console.log('this.data: ', this.data);
      this.dialogRef.close(this.data);
    }
    catch (error) {
      if (environment.logInfo) console.log('error on save: ', error);
      this.dialogReport.showMessageDialog(error, true, true);
      return;
    }
  }

  onExitClick () {
    if (this.validateBeforeExit()) this.dialogRef.close();
  }

  validateBeforeExit () {
    if (this.tagName) {
      if (confirm("Você deseja realmente sair?")) return true;
      else return false;
    }
    return true;
  }

  /**
   * Show a notification in the main page
   * @param message Message to display
   * @param action Origin event
   * @param duration Integer containing the value to animation time
   */
  showNotification (message: string, action: string, duration = 2000) {
    this.snackBar.open(message, action, { duration: duration });
  }

}