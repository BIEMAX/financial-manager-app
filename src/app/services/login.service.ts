import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { LogginModel } from "../models/login.model";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  enableMenusOnScreen = new EventEmitter<boolean>();

  private readonly apiUrl = `${environment.apiUrl}/${environment.apiVersion}`;
  private readonly apiHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      'Accept': '*/*'
    })
  };

  constructor(private http: HttpClient) { }

  doLogin (user: LogginModel) {
    return this.http.post(`${this.apiUrl}/user/login`, JSON.stringify(user), this.apiHeader);
  }
}