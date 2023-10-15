import { FormChartOptions } from 'src/app/shared/graficas/models/form-chart-options';

export interface TemplateDTO {
  id?: number;
  userId: string;
  name: string;
  data: string;
  /**
   * json del la variable data.
   */
  json?: FormChartOptions;
}
