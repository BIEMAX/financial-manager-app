import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from 'src/app/services/user.service';
import { UserAccessService } from 'src/app/services/user-access-permissions.service';
import { UserUpdateInfoComponent } from 'src/app/views/user/user-change-pass/user-update-info.component';
import { UserUpdateModel } from 'src/app/models/user.model';

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
  public showSubmenu: boolean = true;
  public isShowing = false;
  public showSubSubMenu: boolean = true;
  public userNameComplete: String = "";
  public userFirstName: String = "";

  constructor(
    private userService: UserService,
    private router: Router,
    private userAccessService: UserAccessService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit () {
    this.userNameComplete = localStorage.getItem('userName');
    this.userFirstName = localStorage.getItem('userName').split(" ")[0];
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
      width: '30%',
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
        this.showNotification('Usuário atualizado com sucesso', '');
      },
      error => {
        if (environment.logInfo) console.log(error);
        this.showNotification(error.error.message, 'Erro');
      }
    );
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
