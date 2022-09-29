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
  public isExpanded = true;
  public showSubmenu: boolean = false;
  public isShowing = false;
  public showSubSubMenu: boolean = false;

  constructor(private loginService: LoginService) { }

  ngOnInit () {
    this.loginService.enableMenusOnScreen.subscribe(
      menu => this.enableMenu = menu
    );
  }

  mouseenter () {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave () {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

}
