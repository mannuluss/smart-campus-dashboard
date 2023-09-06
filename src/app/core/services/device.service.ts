import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { DeviceDTO } from '../models/device';

@Injectable({
  providedIn: CoreModule,
})
export class DeviceService {
  /**
   * Creates an instance of DeviceService.
   *
   * @param http - Angular's HTTP client.
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene una lista de todos los dispositivos.
   */
  getDevices(): Observable<DeviceDTO[]> {
    return this.http
      .get<DeviceDTO[]>(`${environment.adminService}/device`);
  }
}
