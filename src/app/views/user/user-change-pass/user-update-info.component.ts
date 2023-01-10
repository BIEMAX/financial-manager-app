import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment, ui } from 'src/environments/environment';
import { UserAccessService } from 'src/app/services/user-access-permissions.service';
import { UserUpdateModel } from 'src/app/models/user.model';
import { GenericFunctions } from 'src/app/util/generic-functions';

@Component({
  selector: 'app-user',
  templateUrl: './user-update-info.component.html',
  styleUrls: ['./user-update-info.component.css']
})
export class UserUpdateInfoComponent implements OnInit {

  public userNameOld: String;
  public userPassOld: String;
  public userEmailOld: String;

  public userNameNew: String;
  public userPassNew: String;
  public userPassRepeatNew: String;
  public userEmailNew: String;

  public uiColor = ui.color;

  constructor(
    private userAccessService: UserAccessService,
    private genericFunctions: GenericFunctions,
    public dialogRef: MatDialogRef<UserUpdateInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit (): void {
    this.loadPreviousInformation();
  }

  loadPreviousInformation () {
    this.userNameOld = this.userAccessService.user.userName;
    // this.userPassOld = this.userAccessService.user.password;
    this.userEmailOld = this.userAccessService.user.email;

    this.userNameNew = this.userNameOld;
    this.userEmailNew = this.userEmailOld;
  }

  onExitClick () {
    if (this.validateBeforeExit()) this.dialogRef.close();
  }

  onSaveClick () {
    if (this.validateBeforeExit()) {
      if (this.validatePasswordChange()) {
        this.data = new UserUpdateModel(
          this.userNameOld,
          this.userNameNew,
          this.userEmailOld,
          this.userEmailNew,
          this.userPassOld,
          this.userPassNew
        );
        if (environment.logInfo) console.log('this.data from user update interface: ', this.data);
        this.dialogRef.close(this.data);
      } else this.genericFunctions.showNotification('Nova senha não coincidem', 'Nova senha inválida');
    }
    else this.genericFunctions.showNotification('Preencha ao menos um dado para prosseguir', 'Dados inválidos');
  }

  validateBeforeExit () {
    if (this.userNameNew || this.userEmailNew || this.userPassNew) return true;
    else return false;
  }

  validatePasswordChange () {
    if (this.userPassOld && this.userPassNew)
      if (this.userPassNew.toUpperCase().trim() === this.userPassRepeatNew.toUpperCase().trim()) return true;
      else return false;
    else return false;
  }

  validateEmailChange () {
    return this.userEmailNew.includes("@") && this.userEmailNew.includes(".");
  }

}
