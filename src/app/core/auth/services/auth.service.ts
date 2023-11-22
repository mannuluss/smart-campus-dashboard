import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user';
import { SnackbarService } from '../../snackbar/services/snackbar.service';

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
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  /**
   * Observable of the user logged in.
   */
  user$: Observable<User> = this.userSubject.asObservable();

  user: User = null;

  authenticatedSubject: Subject<boolean> = new Subject<boolean>();

  /**
   * Creates an instance of AppService.
   * @date 2019-04-09
   * @param router - Angular router.
   * @param snackBar - Angular snackbar reference.
   */
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: SnackbarService,
    private keycloak: KeycloakService,
  ) {
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  async login(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.keycloak
        .login()
        .then((res) => {
          resolve(res);
        })
        .catch((errorData) => {
          this.snackBar.showBackError(errorData);
          reject(errorData);
        });
    });
  }

  /**
   * Determina si el usuario esta autenticado en el sistema.
   * @returns retorna si o no.
   */
  async isAuthenticated() {
    return this.keycloak.isLoggedIn();
  }

  /**
   * carga la informacion del usuario.
   */
  initUserInfo() {
    return new Promise((resolve, reject) => {
      if (environment.authEnabled) {
        this.keycloak.loadUserProfile().then((profile) => {
          //se asigna la informacion del usuario.
          this.userSubject.next({
            id: profile.id,
            name: profile.firstName + ' ' + profile.lastName,
            username: profile.username,
            rol: this.keycloak.isUserInRole('admin') ? 'admin' : 'visitante',
            email: profile.email,
          });

          resolve(true);
        });
      } else {
        //para pruebas en local, se utiliza el LocalStorage para almacenar la informacion del usuario.
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          this.userSubject.next(user);
        } else {
          this.userSubject.next({
            id: '1',
            name: 'Felipe Rojas',
            username: 'mannulus',
            email: '',
            rol: 'admin',
          });
        }
        resolve(true);
      }
    });
  }

  /**
   * Authenticates the user in the platform.
   *
   * @date 2019-04-09
   * @param user - user to be authenticated.
   */
  // authenticate(user: User): void {
  //   this.user = user;
  //   sessionStorage.clear();
  //   sessionStorage.setItem('user', JSON.stringify(user));
  //   this.router.navigate(['/dashboard']);
  // }

  /**
   * se encarga de cerrar la sesion del usuario.
   */
  logout() {
    this.userSubject.next(null);
    sessionStorage.removeItem('user');
    this.keycloak.logout();
  }

  /**
   * Creates a new User.
   */
  public signin() {
    console.log('NOT IMPLEMENT, use keycloak');
  }
}
