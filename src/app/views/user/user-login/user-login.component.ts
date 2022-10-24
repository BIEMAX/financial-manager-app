import { Component, OnInit } from '@angular/core';
import { ui, environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { UserService } from 'src/app/services/user.service';
import { LogginModel } from 'src/app/models/login.model';
import { UserAccessService } from 'src/app/services/user-access-permissions.service';
import { UserNewComponent } from 'src/app/views/user/user-new/user-new.component';
import { UserModel } from 'src/app/models/user.model';
import { BillsService } from 'src/app/services/bills.service';
import { DialogReport } from 'src/app/util/error-dialog-report';

@Component({
  selector: 'app-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  public userLogin: string = "";
  public userPassword: string = "";
  /**
   * Define true to show waiting progress spinner on front.
   */
  public hasToWait: boolean = false;
  /**
     * Define default color on UI (User Interface)
     */
  public uiColor: string = ui.color;
  public showPassword: Boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService,
    private billsService: BillsService,
    private userAccessService: UserAccessService,
    public dialog: MatDialog,
    private dialogReport: DialogReport
  ) { }

  ngOnInit () {
    this.clearOldLocalStorage();
  }

  doLogin () {
    this.hasToWait = true;
    try {
      if (this.userLogin && this.userPassword) {
        this.userService.doLogin(new LogginModel(this.userLogin, this.userPassword))
          .subscribe(
            response => {
              let loginData: any = response;
              localStorage.setItem('userBearerKey', loginData.bearerKey);
              localStorage.setItem('userLogin', this.userLogin);
              localStorage.setItem('userName', loginData.data.userName);

              this.userAccessService.userAuthenticated = true;
              this.userAccessService.user = loginData.data;
              this.userAccessService.user.userBearer = loginData.bearerKey;
              this.userAccessService.permissions = loginData.data.permissions;

              this.getOverdueBills();
            },
            error => {
              this.userService.enableMenusOnScreen.emit(false);
              this.dialogReport.showMessageDialog(error, true, true);
              this.hasToWait = false;
            }
          )
      }
      else {
        this.hasToWait = false;
        this.showNotification('Preencha os campos login e senha e tente novamente', '');
      }
    }
    catch (error) {
      this.hasToWait = false;
      this.dialogReport.showMessageDialog(error, true, true);
    }
  }

  togglePasswordVisibility () {
    this.showPassword = !this.showPassword;
  }

  /**
   * Open a dialog to create a new user
   */
  openDialogAddNewUser (): void {
    const dialogRef = this.dialog.open(UserNewComponent, {
      disableClose: true,
      width: '30%',
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (environment.logInfo) console.log('result: ', result);
        if (result) this.createNewUser(result);
      }
      else {
        this.showNotification('Não foi possível cadastrar uma nova conta', '');
        if (environment.logInfo) console.log('The dialog was closed');
      }
    });
  }

  createNewUser (user: UserModel) {
    this.hasToWait = true;
    this.userService.createUser(user).subscribe(
      response => {
        this.hasToWait = false;
        this.showNotification('Conta criada com sucesso', 'Sucesso');
      },
      error => {
        this.hasToWait = false;
        this.dialogReport.showMessageDialog(error, true, true);
      }
    );
  }

  /**
   * Get the bills that will overdue or already overdue.
   */
  getOverdueBills () {
    this.billsService.getBillByPayed().subscribe(
      response => {
        let resp: any = response;

        this.userAccessService.user.notifications = resp.data.map((b) => {
          return {
            id: b.id,
            title: b.name,
            description: b.description,
            done: false,
            date: b.dueDate
          };
        });

        this.userService.enableMenusOnScreen.emit(true);
        this.hasToWait = false;

        this.showNotification('Login efetuado com êxito', '');
        this.router.navigate(['home']);
      },
      error => {
        this.hasToWait = false;
        if (environment.logInfo) console.log('erro ao consultar notificações: ', error);
        this.dialogReport.showMessageDialog(error, true, true);
      }
    );
  }

  clearOldLocalStorage () {
    localStorage.removeItem('userBearerKey');
    localStorage.removeItem('userLogin');
    localStorage.removeItem('userName');
  }

  /**
   * Show a notification in the main page
   * @param message Message to display
   * @param action Origin event
   * @param duration Integer containing the value to animation time
   */
  showNotification (message: string, action: string, duration = 2000) {
    this.snackBar.open(message, action, { duration: duration })
  }

}