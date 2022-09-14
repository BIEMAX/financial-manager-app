import { Component, OnInit } from '@angular/core';
import { environment, ui } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { LogginModel } from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private loginService: LoginService
  ) { }

  userLogin: any = "dionei.santos";
  userPassword: any = "JOSNEL";
  /**
   * Define true to show waiting progress spinner on front.
   */
  hasToWait: boolean = false;

  ngOnInit (): void { }

  doLogin (button: any) {
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

              this.showNotification('Login efetuado com êxito', '');
              this.router.navigate(['home']);
            },
            error => {
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