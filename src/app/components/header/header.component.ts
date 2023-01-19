import { Component, OnInit, ViewChild, HostListener, HostBinding } from '@angular/core';
import { environment, ui } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';

import { UserService } from 'src/app/services/user.service';
import { UserAccessService } from 'src/app/services/user-access-permissions.service';
import { UserUpdateInfoComponent } from 'src/app/views/user/user-change-pass/user-update-info.component';
import { UserUpdateModel } from 'src/app/models/user.model';
import { GenericFunctions } from 'src/app/util/generic-functions';
import { DialogReport } from 'src/app/util/error-dialog-report';

//Dark/light mode
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-header',
  template: ``,
  styles: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public enableMenu: Boolean = false;
  public applicationName: string = `${environment.applicationName}${environment.applicationVersion ? ' - ' + environment.applicationVersion : ''}`;

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
  public uiColor = ui.color;
  /**
   * Control to change the them between light and dark.
   */
  public isDarkModeActive: boolean = false;

  @ViewChild(MatSidenav) sideNav: MatSidenav;

  /**
   * On screen's resize, auto close sidenav
   * @param event 
   */
  @HostListener('window:resize', ['$event'])
  onResize (event) {
    if (event.target.innerWidth < 500) this.sideNav.close();
    else if (event.target.innerWidth > 500) this.sideNav.open();
  }
  @HostBinding('class') className = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private userAccessService: UserAccessService,
    private genericFunctions: GenericFunctions,
    private dialogReport: DialogReport,
    private overlay: OverlayContainer,
    public dialog: MatDialog
  ) { }

  ngOnInit (): void {
    //Validate if dark mode is previously active
    if (localStorage.length > 0 && localStorage.getItem('isDarkModeEnable') == 'true') {
      this.isDarkModeActive = true;
      this.changeTheme({ checked: true });
    } else {
      this.isDarkModeActive = false;
      this.changeTheme({ checked: false });
    }

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

  changeTheme (event: any) {
    const darkClassName = 'darkMode';
    if (event.checked) {
      this.className = darkClassName;
      localStorage.setItem('isDarkModeEnable', 'true');
      this.overlay.getContainerElement().classList.add(darkClassName);
    }
    else {
      this.className = '';
      localStorage.setItem('isDarkModeEnable', 'false');
      this.overlay.getContainerElement().classList.remove(darkClassName);
    }
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
    localStorage.removeItem('isDarkModeEnable');

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
        this.dialogReport.showMessageDialog(error, true, true);
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

  /**
   * Show 'about' dialog
   */
  about () {

  }

}
