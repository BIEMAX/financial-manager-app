import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAccessService implements OnDestroy {

  public userAuthenticated: Boolean = false;
  public showMainMenu: Boolean = false;
  public user: any = [];
  public permissions: any = [];

  constructor() { }

  ngOnDestroy () {
    this.userAuthenticated = false;
    this.showMainMenu = false;
    this.user = null;
    this.permissions = [];
  }
}