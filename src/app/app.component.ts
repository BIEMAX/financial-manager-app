import { Component } from '@angular/core';
import { environment as Environment } from 'src/environments/environment';

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
  //Global variables
  title = 'app';
  applicationName: string = Environment.applicationName;
  fakeUserName: string = "Franciele";
  welcomeTitle: string = `Welcome back ${this.fakeUserName}`;
}