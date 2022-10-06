import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment, ui } from 'src/environments/environment';
import { UserAccessService } from 'src/app/services/user-access-permissions.service';

@Component({
  selector: 'app-user',
  templateUrl: './user-update-info.component.html',
  styleUrls: ['./user-update-info.component.css']
})
export class UserUpdateInfoComponent implements OnInit {

  public userName: String;
  public userOldPass: String;
  public userNewPass: String;
  public userEmail: String;
  public uiColor = ui.color;

  constructor(
    private userAccessService: UserAccessService,
    public dialogRef: MatDialogRef<UserUpdateInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit (): void {
    this.loadPreviousInformation();
  }

  loadPreviousInformation () {
    this.userName = this.userAccessService.user.userName;
    this.userEmail = this.userAccessService.user.email;
  }

  onExitClick () {
    if (this.validateBeforeExit()) this.dialogRef.close();
  }

  validateBeforeExit () {
    return true;
  }

  onSaveClick () {
    if (this.validateBeforeExit()) {
      // this.data = new UserModel(
      //   this.userLogin,
      //   this.userName,
      //   this.userPass,
      //   this.userEmail,
      //   false,
      //   true
      // );
      if (environment.logInfo) console.log('this.data: ', this.data);
      this.dialogRef.close(this.data);
    }
  }

}
