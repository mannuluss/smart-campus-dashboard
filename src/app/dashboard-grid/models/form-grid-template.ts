import { ChartOptions } from 'src/app/libs/graficas/config/apexchart.type';

export interface FormGridTemplate {
  /**nombre del template */
  name: string;
  idTemplate: number;
  idDevice: number;
  realtime: boolean;
  initialDate: Date;
  endDate: Date;
}
