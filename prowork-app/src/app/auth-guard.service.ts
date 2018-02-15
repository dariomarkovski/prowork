import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthGuardService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const canActivate = localStorage.getItem('Bearer') !== null;
    if (canActivate === true) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

  constructor(private router: Router) {
  }

}
