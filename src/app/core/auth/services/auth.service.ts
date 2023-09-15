import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, catchError, tap } from 'rxjs';

import { SnackbarService } from '../../snackbar/services/snackbar.service';
import { User } from '../../models/user';
import { Util } from '../../utils/util';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../../models/api-response';

/**
 * Application glogal service, used to store general information and some utility methods required in a singleton class.
 *
 * @date 2019-04-09
 * @export
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * User logged in, null if no user is logged in yet.
   *
   */
  public user: User; //TODO: cambiar por null

  /**
   * Subject emited any time it's necessary to subscribe to the notifications (after authentication succeedd).
   *
   */
  public subscribeToNotification: Subject<any> = new Subject<any>();

  /**
   * Creates an instance of AppService.
   * @date 2019-04-09
   * @param router - Angular router.
   * @param snackBar - Angular snackbar reference.
   */
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: SnackbarService
  ) {
    this.user = this.getUser();
  }

  getUser(): User {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return user;
    } else if (!environment.production) {
      return {
        id: 1,
        name: 'felipe rojas',
        username: 'mannulus',
        email: '',
        password: '',
        admin: true,
      };
    } else {
      return null;
    }
  }

  /**
   * Verifies if the user is authenticated or not, checking first in the user stored in memory,
   * if the user is not found there then it checks if exists in the browser's session storage,
   * if it's obtained from there is also set in the user variable.
   *
   * @date 2019-04-09
   * @returns true if the user is authenticated, false otherwise.
   */
  isUserAuthenticated(): boolean {
    if (this.user) {
      return true;
    }
    try {
      this.user = JSON.parse(sessionStorage.getItem('user'));
      return this.user !== null;
    } catch (error) {
      return false;
    }
  }

  /**
   * Authenticates the user in the platform.
   *
   * @date 2019-04-09
   * @param user - user to be authenticated.
   */
  private authenticate(user: User): void {
    this.user = user;
    sessionStorage.clear();
    sessionStorage.setItem('user', JSON.stringify(user));
    this.subscribeToNotification.next(null);
    this.router.navigate(['/dashboard']);
  }

  /**
   * Authenticates the user.
   *
   * @date 2019-04-04
   * @param user - user to be authenticated.
   * @returns an Observable wrapping the User object containing the information about the logged in user.
   */
  login(user: User): Observable<User> {
    return this.http
      .post<User>(
        `${environment.adminService}/users/authentication`,
        user,
      )
      .pipe(
        catchError((error: any) => {
          this.snackBar.showBackError(error);
          return [];
        }),
        tap((user: User) => {
          this.authenticate(user);
        })
      );
  }

  /**
   * se encarga de cerrar la sesion del usuario.
   */
  logout() {
    this.user = null;
    sessionStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }

  /**
   * Creates a new User.
   *
   * @date 2019-04-04
   * @param user- user to be created.
   * @returns an Observable wrapping the User object containing the information about the created in user.
   */
  public signin(user: User): Observable<User> {
    return this.http.post<User>(
      `${environment.adminService}/users/user`,
      user,
      Util.options()
    );
  }

  /**
   * Recovers the password for a user with a given email address.
   *
   * @date 2019-04-04
   * @param email - email of the user that desires to change its password.
   * @returns an ApiResponse that indicates if the operation was successful or not.
   */
  public recoverPassword(email: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      `${environment.adminService}/users/pass/${email}`,
      Util.options()
    );
  }
}
