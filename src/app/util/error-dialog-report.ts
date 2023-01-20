import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from 'src/app/views/generic/user-dialog-report/user-dialog-report.component';
import { IsAKnownErrorCode, ExceptionSolutionResponse } from './response-message';
import { LogService } from 'src/app/services/log.service';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user.model';
import { GenericFunctions } from 'src/app/util/generic-functions';

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
  private isException: boolean = false;
  private showReportLink: boolean = false;

  constructor(
    public dialog: MatDialog,
    private logService: LogService,
    private genericFunctions: GenericFunctions
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

    let widthDialog = '';

    if (this.genericFunctions.isMobileDevice()) widthDialog = isError ? '100%' : '75%';
    else widthDialog = isError ? '50%' : '25%';

    const dialogRef = this.dialog.open(UserDialogComponent, {
      disableClose: false,
      width: widthDialog,
      autoFocus: true,
      data: {
        isError: isError,
        title: this.title,
        message: this.message,
        solution: this.solution,
        isException: this.isException,
        showReportLink: this.showReportLink
      }
    });

    dialogRef.afterClosed().subscribe(r => { });
  }

  /**
   * Show message or error dialog for user saying that something goes wrong in user new registration.
   * @param exception Exception or message object.
   * @param isError True if is an error (the method will extract the info)
   * @param saveLog True to send log information to database.
   */
  public showMessageDialog_UserCreation (exception: any, user: UserModel, isError: Boolean = true, saveLog: Boolean = true, showDialog: Boolean = true) {
    this.extractInfoFromException(exception);

    if (saveLog) this.saveLogUserCreation(exception, user);

    if (showDialog) {
      const dialogRef = this.dialog.open(UserDialogComponent, {
        disableClose: false,
        width: 'auto',
        height: 'auto',
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
  }

  /**
   * Extract crucial info from a generic exception.
   * @param exception Exception generated
   */
  private extractInfoFromException (exception: any) {
    this.title = "Erro";

    let status = exception?.status != undefined ? exception?.status.toString() : '';

    this.showReportLink = exception?.error?.path != "/v1/user/login";

    //Exception will be if the API didn't return a expected code/status as error/exception
    this.isException = IsAKnownErrorCode(status) == '';

    //If is an exception, it's an API error
    if (this.isException) {
      this.message = exception?.error?.message || exception?.error || exception?.message;
      this.solution = ExceptionSolutionResponse(this.message);
    }
    else { //If not is an exception, it's just a message from frontend
      this.message = exception?.error;
      //In some cases, the exception error (line above) returns object, and we need that always be a string.
      if (this.message && typeof (this.message) != "string") this.message = undefined;

      if (!this.message) this.message = exception?.message ? exception?.message : exception?.error?.error;
      this.solution = ExceptionSolutionResponse(this.message);
    }
  }

  /**
   * Save log for users logged in.
   * @param exception 
   */
  private saveLog (exception: any) {
    let log = {
      timestamp: exception?.error?.timestamp || new Date().toISOString(),
      errorMessage: exception?.error?.message || exception?.message,
      httpStatusCode: exception?.error?.status || exception?.status,
      endpoint: exception?.error?.path || exception?.url,
      stackTrace: exception?.error?.trace || exception?.name
    };
    this.logService.createLog(log).subscribe(
      response => {
        if (environment.logInfo) console.log('Success when save log');
      },
      error => {
        if (environment.logInfo) console.log('error when saving log: ', error)
      }
    );
  }

  /**
   * Save log for user creation (API does not required authentication)
   * @param exception 
   */
  private saveLogUserCreation (exception: any, user: UserModel = undefined) {
    let log: any = {
      timestamp: exception?.error?.timestamp,
      errorMessage: exception?.error?.message,
      httpStatusCode: exception?.error?.status,
      endpoint: exception?.error?.path,
      stackTrace: exception?.error?.trace,
    };

    if (user != undefined) log.user = user;

    this.logService.saveLogUserCreation(log).subscribe(
      resp => { if (environment.logInfo) console.log('Success when save log'); },
      error => { if (environment.logInfo) console.log('error when saving log: ', error) }
    );
  }

}