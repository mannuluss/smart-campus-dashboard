import { ChartOptions } from "src/app/libs/graficas/config/apexchart.type";

export interface TemplateDTO {
  id?: number;
  userId: number;
  name: string;
  data: string;
  /**
   * json del la variable data.
   */
  json?: ChartOptions;
}
