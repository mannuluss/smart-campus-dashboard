import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CoreModule } from 'src/app/core/core.module';
import { DataMessageDTO } from '../models/data.dto';

import { environment } from 'src/environments/environment';
import { BrokerService } from './broker.service';
import { ResponseTopicDevice } from '../models/response-topic-device';
import * as moment from 'moment';
import { APP_DATE_TIME_FORMAT } from 'src/app/shared/material/providers/date-time-picker';

@Injectable({
  providedIn: CoreModule,
})
export class DataService {
  constructor(
    private http: HttpClient,
    private brokerService: BrokerService,
  ) {}

  getDataByUUID(
    uuid: any,
    desde?: any,
    hasta?: any,
  ): Observable<DataMessageDTO[]> {
    let params = {
      uuid: uuid,
      initialDate: moment(desde).format(APP_DATE_TIME_FORMAT),
    };
    if (hasta) {
      params['finalDate'] = moment(hasta).format(APP_DATE_TIME_FORMAT);
    }

    return this.http.get<DataMessageDTO[]>(
      `${environment.dataService}/device/message`,
      {
        params: params,
      },
    );
  }

  /**
   * Le indica al dispositivo que se desea susbcribir a los datos que esta enviando.
   * @param uuid identificador del dispositivo
   * @returns observable con el topic al que el dispositivo publicara los datos.
   */
  subcribeToDataDevice(uuid: any): Observable<ResponseTopicDevice> {
    return this.http.get<any>(
      `${environment.dataService}/device/message/subscribe`,
      {
        params: {
          uuid: uuid,
        },
      },
    );
  }
}
