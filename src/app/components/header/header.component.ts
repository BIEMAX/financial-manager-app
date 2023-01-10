import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav'

import { UserService } from 'src/app/services/user.service';
import { UserAccessService } from 'src/app/services/user-access-permissions.service';
import { UserUpdateInfoComponent } from 'src/app/views/user/user-change-pass/user-update-info.component';
import { UserUpdateModel } from 'src/app/models/user.model';
import { GenericFunctions } from 'src/app/util/generic-functions';

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

  /**
   * True to show menu side bar expanded, false to show only icons.
   */
  public isExpanded = false;
  public showSubmenu: Boolean = true;
  public isShowing: Boolean = false;
  /**
   * True to show sub menus in main menus (level two)
   */
  public showSubSubMenu: boolean = true;

  public userNameComplete: String = "";
  public userFirstName: String = "";
  public qtyNotification: any = 0;
  public descNotifications: String = "";
  /**
   * True if is a mobile device
   */
  public isMobileDevice: Boolean = false;
  /**
   * Define if the side bar start opened or close (for mobile devices).
   */
  public startSideNavOpened: Boolean = false;

  @ViewChild(MatSidenav) sideNav: MatSidenav;

  constructor(
    private userService: UserService,
    private router: Router,
    private userAccessService: UserAccessService,
    public dialog: MatDialog,
    private genericFunctions: GenericFunctions
  ) { }

  ngOnInit () {
    this.userNameComplete = localStorage.getItem('userName');
    this.userFirstName = localStorage.getItem('userName').split(" ")[0];
    this.userService.enableMenusOnScreen.subscribe(
      menu => this.enableMenu = menu
    );
    this.qtyNotification = this.userAccessService.user.notifications?.length || 0;
    this.descNotifications = `Você possuí ${this.qtyNotification} novas notificações.`;
    this.isMobileDevice = this.genericFunctions.isMobileDevice();
    this.startSideNavOpened = !this.isMobileDevice;
    this.isShowing = this.isMobileDevice;
  }

  mouseenter () {
    if (!this.isMobileDevice && !this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave () {
    if (!this.isMobileDevice && !this.isExpanded) {
      this.isShowing = false;
    }
  }

  logout () {
    localStorage.removeItem('userBearerKey');
    localStorage.removeItem('userLogin');
    localStorage.removeItem('userName');
    localStorage.removeItem('userSecret');
    localStorage.removeItem('keepUserConnected');

    this.userAccessService.userAuthenticated = false;
    this.userAccessService.user = [];
    this.userAccessService.permissions = '';

    this.userService.enableMenusOnScreen.emit(false);
    this.router.navigate(['']);
  }

  /**
   * Open a dialog to create a new user
   */
  openDialogUpdateUser (): void {
    const dialogRef = this.dialog.open(UserUpdateInfoComponent, {
      disableClose: true,
      width: this.isMobileDevice ? '100%' : '30%',
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (environment.logInfo) console.log('result: ', result);
        if (result) this.updateUser(result);
      }
    });
  }

  updateUser (user: UserUpdateModel) {
    this.userService.updateUser(user).subscribe(
      response => {
        console.log('response from user update: ', response);
        this.userAccessService.user.userName = user.newUserName;
        this.userAccessService.user.email = user.newEmail;
        this.genericFunctions.showNotification('Usuário atualizado com sucesso');
      },
      error => {
        if (environment.logInfo) console.log(error);
        this.genericFunctions.showNotification(error.error.message); //TODO: Convert to this.dialogReport.showMessageDialog()
      }
    );
  }

  /**
   * Function to validate if is to toggle sidenav menu, based
   * on device (if is web device, never toggle, in mobile devices,
   * always toggle)
   */
  isToToggleSideNav () {
    if (this.isMobileDevice) {
      this.sideNav.toggle();
    }
  }

}
