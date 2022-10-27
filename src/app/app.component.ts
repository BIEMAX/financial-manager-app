import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { environment } from 'src/environments/environment';

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

  public enableMenu: Boolean = false;
  public applicationName: string = environment.applicationName;

  constructor(private loginService: UserService) { }

  ngOnInit () {
    this.loginService.enableMenusOnScreen.subscribe(
      menu => this.enableMenu = menu
    );
  }
}