import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  template: `
    <!-- header -->
    <app-header></app-header>

    <!-- routes will be rendered here -->
    <router-outlet>login</router-outlet>

    <!-- footer -->
    <app-footer></app-footer>
  `,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  enableMenu: Boolean = false;

  constructor(private loginService: LoginService) { }

  ngOnInit () {
    this.loginService.enableMenusOnScreen.subscribe(
      menu => this.enableMenu = menu
    );
  }
}