export class LogginModel {
  userLogin: string;
  password: string;

  constructor(UserLogin: string, Password: string) {
    this.userLogin = UserLogin;
    this.password = Password;
  }
}