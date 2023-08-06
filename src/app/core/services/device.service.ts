import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResponse } from '../models/api-response';
import { Device } from '../models/device';
import { environment } from 'src/environments/environment';
import { Util } from '../utils/util';

@Injectable({
  providedIn: CoreModule
})
export class DeviceService {

  /**
   * Stores the devices of the logged user.
   */
  public devices: Device[];

  /**
   * Creates an instance of DeviceService.
   *
   * @param http - Angular's HTTP client.
   */
  constructor(private http: HttpClient) { }

  /**
   * Retrieves the devices for the given user idenfitied by its id.
   *
   *
   * @param userId - id of the user whose devices are being retrieved.
   * @returns an Array of Devices.
   */
  public getDevicesByUserId(userId: number): Observable<Device[]> {
    return this.http.get<Device[]>(`${ environment.adminService }/devices/user/${ userId }`, Util.options());
  }

  /**
   * Retrieves the device identified by its id.
   *
   *
   * @param deviceId - id of the Device.
   * @returns the Device.
   */
  public getDeviceById(deviceId: number): Observable<Device> {
    return this.http.get<Device>(`${ environment.adminService }/devices/device/${ deviceId }`, Util.options());
  }

  /**
   * Deletes the device identified by the given id.
   *
   *
   * @param deviceId - id of the Device to be removed.
   * @returns an ApiResponse indicating if the operation succeeded or not.
   */
  public deleteDeviceById(deviceId: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${ environment.adminService }/devices/device/${ deviceId }`, Util.options());
  }

  /**
   * Creates a new device.
   *
   *
   * @param device - Device to be created.
   * @returns the Device with its id after creation.
   */
  public createDevice(device: Device): Observable<Device> {
    return this.http.post<Device>(`${ environment.adminService }/devices/device`, device, Util.options());
  }

  /**
   * Updates an existing device.
   *
   *
   * @param device - Device to be updated.
   * @returns the Device with the information as it was saved.
   */
  public updateDevice(device: Device): Observable<Device> {
    return this.http.put<Device>(`${ environment.adminService }/devices/device/${ device.id }`,
      device, Util.options());
  }
}
