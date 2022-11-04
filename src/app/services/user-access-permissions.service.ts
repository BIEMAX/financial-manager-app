import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAccessService implements OnDestroy {

  public userAuthenticated: Boolean = false;
  public showMainMenu: Boolean = false;
  public user: any = [];
  public permissions: any = [];
  /**
   * Bills near to close due date.
   */
  public billsCloseToOverdue: any = [];
  /**
   * Bills already overdue
   */
  public billsOverdue: any = [];

  constructor() { }

  ngOnDestroy () {
    this.userAuthenticated = false;
    this.showMainMenu = false;
    this.user = null;
    this.permissions = [];
    this.billsCloseToOverdue = [];
    this.billsOverdue = [];
  }
}