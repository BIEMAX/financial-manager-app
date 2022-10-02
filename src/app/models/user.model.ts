export class UserModel {
  user: String;
  userName: String;
  password: String;
  email: String;
  loggedIn: boolean;
  active: boolean;

  constructor(User: String, UserName: String, Password: String, Email: String, LoggedIn: boolean, Active: boolean) {
    this.user = User;
    this.userName = UserName;
    this.password = Password;
    this.email = Email;
    this.loggedIn = LoggedIn;
    this.active = Active;
  }
}

export class UserLogginModel {
  login: string;
  password: string;
}