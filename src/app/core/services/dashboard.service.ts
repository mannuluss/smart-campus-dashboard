import { Injectable } from '@angular/core';

import { CoreModule } from 'src/app/core/core.module';
import { Notification } from '../models/notification';

/**
 * Dashboard service to store global information.
 *
 *
 * @export
 */
@Injectable({
  providedIn: CoreModule
})
export class DashboardService {

  /**
   * Indicates if the user card is opened or not.
   *
   */
  public isUserCardOpened: boolean;

  /**
   * Indicates if the notifications card is opened or not.
   *
   */
  public isNotificationsCardOpened: boolean;

  /**
   * Indicates if the notification card (alert) is shown or not.
   *
   */
  public isNotificationShown: boolean;

  /**
   * Stores the notification to be shown in the card if any.
   *
   */
  public newNotification: Notification;

  /**
   * Creates an instance of DashboardService.
   *
   */
  constructor() { }

}
