import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { LogginModel } from "../models/login.model";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  private readonly apiUrl = `${environment.apiUrl}/${environment.apiVersion}`;
  private readonly apiHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      'Accept': '*/*'
    })
  };

  // getAuthentication (user: LogginModel) {
  //   return this.http.get(this.apiUrl, this.apiHeader);
  // }

  doLogin (user: LogginModel) {
    // return this.http.get(`${this.apiUrl}/login`, { this.reqOptions, JSON.stringify(user) })
    //   .subscribe(observer => (
    //     observer.
    // ));

    //TODO: #7 Fix the "CORs policy" issue.
    return this.http.post(`${this.apiUrl}/user/login`, JSON.stringify(user), this.apiHeader);
  }
}