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

    let permission = this.userAccessService.permissions.filter((p: { toString: () => string; }) =>
      p.toString().toUpperCase() === route.pathFromRoot[1].routeConfig.path.toString().toUpperCase());

    if (permission.toString().toUpperCase() === route.pathFromRoot[1].routeConfig.path.toString().toUpperCase()
      && this.userAccessService.userAuthenticated) {
      return true;
    }
    else {
      this.router.navigate(['']);
      return false;
    }
  }

}