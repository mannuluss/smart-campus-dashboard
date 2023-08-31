import { ChartOptions } from 'src/app/libs/graficas/config/apexchart.type';

export interface FormGridTemplate {
  idTemplate: number;
  idDevice: number;
  realtime: boolean;
  initialDate: Date;
  endDate: Date;
}
