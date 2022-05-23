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
  private readonly apiHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getUser (user: UserLogginModel) {
    return this.http.get(this.apiUrl, this.apiHeader);
  }

  addUser (user: UserModel) {
    return this.http.post(this.apiUrl, user);
  }
}