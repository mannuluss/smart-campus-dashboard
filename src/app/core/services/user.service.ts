import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResponse } from '../models/api-response';
import { CoreModule } from 'src/app/core/core.module';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Util } from '../utils/util';

/**
 * Service to manage users and authentication.
 *
 * @export
 */
@Injectable({
  providedIn: CoreModule
})
export class UserService {

  /**
   * Stores the users of the logged user (admin-only).
   */
  public users: User[] | undefined;

  /**
   * Creates an instance of UserService.
   * @param http - Angular's HTTP client.
   */
  constructor(private http: HttpClient) { }

  /**
   * Consumes delete user by id REST service.
   *
   * @param id of the user to be deleted.
   * @returns an {@link Observable} with the response.
   */
  public deleteUser(id: number): Observable<ApiResponse> {
    return this.http
      .delete<ApiResponse>(`${environment.adminService}/users/user/${id}`, Util.options());
  }

  /**
   * Consumes get users REST service.
   *
   * @returns an {@link Observable} with the response.
   */
  public getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${environment.adminService}/users`, Util.options());
  }

  /**
   * Consumes get user REST service.
   *
   * @param id of the user to be obtained.
   * @returns an {@link Observable} with the response.
   */
  public getUser(id: number): Observable<User> {
    return this.http
      .get<User>(`${environment.adminService}/users/user/${id}`, Util.options());
  }

  /**
   * Creates a new user.
   *
   * @param user - User to be created.
   * @returns the User with its id after creation.
   */
  public createUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.adminService}/users/user`, user, Util.options());
  }

  /**
   * Updates an existing user.
   *
   * @param user - User to be updated.
   * @returns the Application with the information as it was saved.
   */
  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${environment.adminService}/users/user/${user.id}`, user, Util.options());
  }

}
