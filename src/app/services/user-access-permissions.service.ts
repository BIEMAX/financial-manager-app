import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAccessService implements OnDestroy {

  public userAuthenticated: Boolean = false;
  public showMainMenu: Boolean = false;
  public user: any = [];
  public permissions: any = [];

  constructor(private http: HttpClient) { }

  ngOnDestroy () {
    this.userAuthenticated = false;
    this.showMainMenu = false;
    this.user = null;
    this.permissions = [];
  }
}