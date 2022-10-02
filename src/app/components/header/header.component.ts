import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UserAccessService } from 'src/app/services/user-access-permissions.service';

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

  constructor(
    private userService: UserService,
    private router: Router,
    private userAccessService: UserAccessService,
  ) { }

  ngOnInit () {
    this.userService.enableMenusOnScreen.subscribe(
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

  logout () {
    localStorage.removeItem('userBearerKey');
    localStorage.removeItem('userLogin');
    localStorage.removeItem('userName');

    this.userAccessService.userAuthenticated = false;
    this.userAccessService.user.userLogin = '';
    this.userAccessService.user.userPass = '';
    this.userAccessService.user.userBearer = '';
    this.userAccessService.user.userBearerExpiration = '';
    this.userAccessService.permissions = '';

    this.userService.enableMenusOnScreen.emit(false);
    this.router.navigate(['']);
  }

}
