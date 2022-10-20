import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from 'src/app/views/generic/user-dialog-report/user-dialog-report.component';
import { ResponseStatusCode, ExceptionSolutionResponse } from './response-message';

/**
 * Generic class that open a dialog to show user that an error ocurrered
 * (with more info than usual).
 * Maybe in some cases, show the solution to fix the error.
 */
@Injectable({
  providedIn: 'root'
})
export class DialogReport {

  private title: string;
  private message: string;
  private solution: string;

  constructor(public dialog: MatDialog) { }

  /**
   * Aa
   * @param exception 
   * @param isError 
   * @param saveLog 
   */
  public showMessageDialog (exception: any, isError: Boolean = true, saveLog: Boolean = true) {
    this.extractInfoFromException(exception);

    const dialogRef = this.dialog.open(UserDialogComponent, {
      disableClose: false,
      width: (isError ? '50%' : '25%'),
      autoFocus: true,
      data: {
        isError: isError,
        title: this.title,
        message: this.message,
        solution: this.solution
      }
    });

    dialogRef.afterClosed().subscribe(r => { });
  }

  /**
   * Extract crucial info from a generic exception.
   * @param exception Exception generated
   */
  private extractInfoFromException (exception: any) {
    this.title = ResponseStatusCode(exception?.error.error || '');
    this.message = exception?.error?.message || '';
    this.solution = ExceptionSolutionResponse(exception?.error?.message || '');
  }

}