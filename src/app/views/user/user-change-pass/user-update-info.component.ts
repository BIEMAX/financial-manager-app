import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment, ui } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user-update-info.component.html',
  styleUrls: ['./user-update-info.component.css']
})
export class UserUpdateInfoComponent implements OnInit {

  public userOldPass: String;
  public userNewPass: String;
  public userEmail: String;
  public uiColor = ui.color;

  constructor(
    public dialogRef: MatDialogRef<UserUpdateInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit (): void {
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
