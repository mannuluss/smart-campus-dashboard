import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResponse } from '../models/api-response';
import { CoreModule } from 'src/app/core/core.module';
import { environment } from 'src/environments/environment';
import { Gateway } from '../models/gateway';
import { Util } from '../utils/util';

/**
 * Service to manage gateways.
 *
 *
 * @export
 */
@Injectable({
  providedIn: CoreModule
})
export class GatewayService {

  /**
   * Stores the gateways of the logged user.
   *
   */
  public gateways: Gateway[];

  /**
   * Creates an instance of GatewayService.
   *
   * @param http - Angular's HTTP client.
   */
  constructor(private http: HttpClient) { }

  /**
   * Retrieves the gateways for the given user idenfitied by its id.
   *
   *
   * @param userId - id of the user whose gateways are being retrieved.
   * @returns an Array of Gateways.
   */
  public getGatewaysByUserId(userId: number): Observable<Gateway[]> {
    return this.http.get<Gateway[]>(`${ environment.adminService }/gateways/user/${ userId }`, Util.options());
  }

  /**
   * Retrieves the gateway identified by its id.
   *
   *
   * @param gatewayId - id of the Gateway.
   * @returns the Gateway.
   */
  public getGatewayById(gatewayId: number): Observable<Gateway> {
    return this.http.get<Gateway>(`${ environment.adminService }/gateways/gateway/${ gatewayId }`, Util.options());
  }

  /**
   * Deletes the gateway identified by the given id.
   *
   *
   * @param gatewayId - id of the Gateway to be removed.
   * @returns an ApiResponse indicating if the operation succeeded or not.
   */
  public deleteGatewayById(gatewayId: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${ environment.adminService }/gateways/gateway/${ gatewayId }`, Util.options());
  }

  /**
   * Creates a new gateway.
   *
   *
   * @param gateway - Gateway to be created.
   * @returns the Gateway with its id after creation.
   */
  public createGateway(gateway: Gateway): Observable<Gateway> {
    return this.http.post<Gateway>(`${ environment.adminService }/gateways/gateway`, gateway, Util.options());
  }

  /**
   * Updates an existing gateway.
   *
   *
   * @param gateway - Gateway to be updated.
   * @returns the Gateway with the information as it was saved.
   */
  public updateGateway(gateway: Gateway): Observable<Gateway> {
    return this.http.put<Gateway>(`${ environment.adminService }/gateways/gateway/${ gateway.id }`,
      gateway, Util.options());
  }

}
