import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserModel } from 'src/app/models/user.model';
import { GenericFunctions } from 'src/app/util/generic-functions';
import { ui, environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  public userName: String;
  public userLogin: String;
  public userPass: String;
  public userConfirmPass: String;
  public userEmail: String;
  /**
   * Define default color on UI (User Interface)
   */
  public uiColor: string = ui.color;
  public showPassword: Boolean = false;
  public showPassword2: Boolean = false;


  constructor(
    private genericFunctions: GenericFunctions,
    public dialogRef: MatDialogRef<UserNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit (): void {
  }

  onExitClick () {
    if (this.validateBeforeExit()) this.dialogRef.close();
  }

  validateBeforeExit () {
    if (this.userName || this.userLogin || this.userPass || this.userConfirmPass || this.userEmail) {
      if (confirm("Você deseja realmente sair?")) return true;
      else return false;
    } else return true;
  }

  onSaveClick () {
    if (this.validateUser()) {
      this.data = new UserModel(
        this.userLogin,
        this.userName,
        this.userPass,
        this.userEmail,
        false,
        true
      );
      if (environment.logInfo) console.log('this.data: ', this.data);
      this.dialogRef.close(this.data);
    }
  }

  validateUser () {
    if (this.validateField(this.userName)) {
      this.genericFunctions.showNotification('O nome possuí caracteres inválidos', 'Nome inválido');
      return false;
    }
    else if (this.validateField(this.userLogin)) {
      this.genericFunctions.showNotification('Login não respeita as regras de cadastro', 'Login inválido');
      return false;
    }
    else if (this.validateField(this.userPass)) {
      this.genericFunctions.showNotification('Senha não respeita as regras de cadastro', 'Senha inválida');
      return false;
    }
    else if (this.userPass != this.userConfirmPass) {
      this.genericFunctions.showNotification('Senhas não conferem', 'Senhas diferentes');
      return false;
    }
    else if (this.validateField(this.userEmail) && !this.userEmail.includes("@") && !this.userEmail.includes(".")) {
      this.genericFunctions.showNotification('E-mail incoerente ou incompleto', 'E-mail inválido');
      return false;
    }
    else return true;
  }

  /**
   * Validate if the field is properly filled.
   * @param field 
   * @returns True if ok
   */
  validateField (field: any) {
    return !(field || field == 'undefined' || field.toString().includes(' '));
  }

  togglePasswordVisibility () {
    this.showPassword = !this.showPassword;
  }

  toggleRepeatPasswordVisibility () {
    this.showPassword2 = !this.showPassword2;
  }

}
