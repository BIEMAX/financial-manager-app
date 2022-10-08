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

@Component({
  selector: 'app-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  public userLogin: string = "dionei.santos";
  public userPassword: string = "aDti3shw!";
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
    private userAccessService: UserAccessService,
    public dialog: MatDialog,
  ) { }

  ngOnInit (): void { }

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

              this.userService.enableMenusOnScreen.emit(true);

              this.showNotification('Login efetuado com êxito', '');
              this.router.navigate(['home']);
            },
            error => {
              this.userService.enableMenusOnScreen.emit(false);
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
        this.showNotification('Conta criada com sucesso', '');
      },
      error => {
        console.log(error);
        this.hasToWait = false;
        this.showNotification(error.error.message, 'Erro ao tentar cadastrar novo usuário');
      }
    );
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