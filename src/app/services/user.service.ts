import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { UserLogginModel, UserModel } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private readonly apiUrl = `${environment.apiUrl}/${environment.apiVersion}`;
  private readonly headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  doLogin (user: UserLogginModel) {
    // return this.http.get(`${this.apiUrl}/login`, { this.reqOptions, JSON.stringify(user) })
    //   .subscribe(observer => (
    //     observer.
    // ));
    return this.http.post(`${this.apiUrl}/login`, JSON.stringify(user), this.headers)
      .subscribe(
        response => {
          const resp: any = response
          return resp
        },
        error => {
          return error
        }
      )
  }

  addUser (user: UserModel) {
    return this.http.post(this.apiUrl, user);
  }
}