import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAccessService } from './user-access-permissions.service';

@Injectable({
  providedIn: 'root'
})
export class UserHasAccess implements CanActivate {

  constructor(
    private userAccessService: UserAccessService,
    private router: Router
  ) { }

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {


    if (route.pathFromRoot.toString() == "") {
      return false;
    }
    else if (this.userAccessService.userAuthenticated) {
      return true;
    }

    this.router.navigate(['']);
    return false;
  }

}