import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from 'src/app/views/generic/user-dialog-report/user-dialog-report.component';
import { ResponseStatusCode, ExceptionSolutionResponse } from './response-message';
import { LogService } from 'src/app/services/log.service';
import { environment } from 'src/environments/environment';

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

  constructor(
    public dialog: MatDialog,
    private logService: LogService
  ) { }

  /**
   * Show message or error dialog for user saying that something goes wrong.
   * @param exception Exception or message object.
   * @param isError True if is an error (the method will extract the info)
   * @param saveLog True to send log information to database.
   */
  public showMessageDialog (exception: any, isError: Boolean = true, saveLog: Boolean = true) {
    this.extractInfoFromException(exception);

    if (saveLog) this.saveLog(exception);

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
    this.title = ResponseStatusCode(exception?.error?.error || '');
    this.message = exception?.error?.message || '';
    this.solution = ExceptionSolutionResponse(exception?.error?.message || '');
  }

  /**
   * 
   * @param exception 
   */
  private saveLog (exception: any) {
    let log = {
      timestamp: exception?.error?.timestamp,
      errorMessage: exception?.error?.message,
      httpStatusCode: exception?.error?.status,
      endpoint: exception?.error?.path,
      stackTrace: exception?.error?.trace
    };
    this.logService.saveLog(log).subscribe(
      response => {
        if (environment.logInfo) console.log('Success when save lag');
      },
      error => {
        if (environment.logInfo) console.log('error when saving log: ', error)
      }
    );
  }

}