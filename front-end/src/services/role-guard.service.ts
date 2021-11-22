import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService {
  constructor(public router: Router) {}
  public canActivate(route: ActivatedRouteSnapshot) {
    if (localStorage.getItem('isAdmin') === 'true') {
      return true;
    } else {
      this.router.navigate(['/home/dashboard']);
      return false;
    }
  }
}
