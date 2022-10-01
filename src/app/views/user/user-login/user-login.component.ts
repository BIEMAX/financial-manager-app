import { Component, OnInit } from '@angular/core';
import { ui } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { LogginModel } from 'src/app/models/login.model';
import { UserAccessService } from 'src/app/services/user-access-permissions.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
   * Show a notification in the main page
   * @param message Message to display
   * @param action Origin event
   * @param duration Integer containing the value to animation time
   */
  showNotification (message: string, action: string, duration = 2000) {
    this.snackBar.open(message, action, { duration: duration })
  }

}