import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { LogginModel } from "../models/login.model";
import { UserModel } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  enableMenusOnScreen = new EventEmitter<boolean>();

  private readonly apiUrl = `${environment.apiUrl}/${environment.apiVersion}`;
  private readonly apiHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      'Accept': '*/*'
    })
  };
  private readonly apiHeaderSecret = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x_client_secret': environment.apiSecret,
      'x_client_id': environment.apiClientId
    })
  }

  constructor(private http: HttpClient) { }

  doLogin (user: LogginModel) {
    return this.http.post(`${this.apiUrl}/user/login`, JSON.stringify(user), this.apiHeader);
  }

  createUser (user: UserModel) {
    return this.http.post(`${this.apiUrl}/user/new`, JSON.stringify(user), this.apiHeaderSecret);
  }

  updateUser (user: UserModel) {
    return this.http.post(`${this.apiUrl}/user/update`, JSON.stringify(user), this.apiHeader);
  }
}