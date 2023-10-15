import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { CoreModule } from 'src/app/core/core.module';
import { AuthService } from '../services/auth.service';

/**
 * Guard to control the navigation over authentication pages (login, signin, password-recovery).
 *
 *
 * @export
 */
@Injectable({
  providedIn: CoreModule,
})
export class AuthenticationGuard implements CanActivate {
  /**
   * Creates an instance of AuthenticationGuard.
   *
   * @param appService - Main Application Service.
   * @param router - Angular's main router.
   */
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    if (this.authService.user) {
      return true;
    }

    this.router.navigate(['/dashboard/home']);
    return false;
  }
}
