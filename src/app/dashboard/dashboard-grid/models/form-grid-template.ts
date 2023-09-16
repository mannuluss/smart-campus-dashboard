import { ChartOptions } from '@shared/graficas/config/apexchart.type';

export interface FormGridTemplate {
  /**nombre del template */
  name: string;
  idTemplate: number;
  idDevice: number;
  realtime: string;
  initialDate: Date;
  endDate: Date;
}
