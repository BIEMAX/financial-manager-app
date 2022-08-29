import { Component, OnInit } from '@angular/core';
import { environment, ui } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar, private _router: Router) { }

  userLogin: any;
  userPassword: any;

  ngOnInit (): void {

  }

  doLogin (button) {
    try {
      if (!this.userLogin || !this.userPassword) {
        this.showNotification('Login ou senha inválidos. Tente novamente.', '');


      }
      else {
        this.showNotification('Login efetuado com êxito', '');
        this._router.navigate(['home']);
      }
    }
    catch (err) {
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
    this._snackBar.open(message, action, { duration: duration })
  }

}