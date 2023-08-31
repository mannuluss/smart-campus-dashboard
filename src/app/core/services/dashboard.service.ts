import { Injectable } from '@angular/core';

import { CoreModule } from 'src/app/core/core.module';
import { Notification } from '../models/notification';

/**
 * Dashboard service to mannage template and grids.
 *
 * @export
 */
@Injectable({
  providedIn: CoreModule
})
export class DashboardService {

  /**
   * Creates an instance of DashboardService.
   *
   */
  constructor() { }

}
