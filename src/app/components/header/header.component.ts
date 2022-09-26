import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  template: ``,
  styles: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public enableMenu: Boolean = false;
  public applicationName: string = environment.applicationName;

  constructor(private loginService: LoginService) { }

  ngOnInit () {
    this.loginService.enableMenusOnScreen.subscribe(
      menu => this.enableMenu = menu
    );
  }

}
