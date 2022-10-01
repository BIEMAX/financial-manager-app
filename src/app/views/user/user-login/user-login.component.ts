import { Component, OnInit } from '@angular/core';
import { ui, environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { LoginService } from '../../../services/login.service';
import { LogginModel } from 'src/app/models/login.model';
import { UserAccessService } from 'src/app/services/user-access-permissions.service';
import { UserNewComponent } from 'src/app/views/user/user-new/user-new.component';

@Component({
  selector: 'app-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  public userLogin: any = "";
  public userPassword: any = "";
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
    private loginService: LoginService,
    private userAccessService: UserAccessService,
    public dialog: MatDialog,
  ) { }

  ngOnInit (): void { }

  doLogin () {
    this.hasToWait = true;
    try {
      if (this.userLogin && this.userPassword) {
        this.showNotification('Login ou senha inválidos. Tente novamente.', '');
        this.loginService.doLogin(new LogginModel(this.userLogin, this.userPassword))
          .subscribe(
            response => {
              let loginData: any = response;
              localStorage.setItem('userBearerKey', loginData.bearerKey);
              localStorage.setItem('userName', this.userLogin);

              this.userAccessService.userAuthenticated = true;
              this.userAccessService.user.userLogin = this.userLogin;
              this.userAccessService.user.userPass = this.userPassword;
              this.userAccessService.user.userBearer = loginData.bearerKey;
              this.userAccessService.user.userBearerExpiration = "";
              this.userAccessService.permissions = loginData.permissions;

              this.loginService.enableMenusOnScreen.emit(true);

              this.showNotification('Login efetuado com êxito', '');
              this.router.navigate(['home']);
            },
            error => {
              this.loginService.enableMenusOnScreen.emit(false);
              console.log(error);
              this.hasToWait = false;
              this.showNotification(error.error.message, 'Erro ao tentar efetuar login');
            }
          )
      }
      else {
        this.hasToWait = false;
        this.showNotification('Preencha os campos login e senha e tente novamente', '');
      }
    }
    catch (err) {
      this.hasToWait = false;
      this.showNotification(err, 'Login');
    }
  }

  togglePasswordVisibility () {
    this.showPassword = !this.showPassword;
  }

  /**
   * Open a dialog to create a new bill
   */
  openDialogAddNewUser (bill?: any): void {
    const dialogRef = this.dialog.open(UserNewComponent, {
      disableClose: true,
      width: '50%',
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (environment.logInfo) console.log('result: ', result);
        if (bill && result.id != '0') this.createNewUser();
      }
      else {
        this.showNotification('Nova conta a pagar não foi salva', '');
        if (environment.logInfo) console.log('The dialog was closed');
      }
    });
  }

  createNewUser () {
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