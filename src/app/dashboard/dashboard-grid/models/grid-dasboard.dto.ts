import { GridsterItem } from 'angular-gridster2';
import { TemplateDTO } from 'src/app/core/models/template.dto';
import { FormGridTemplate } from './form-grid-template';

export interface GridDasboardDTO {
  id?: number;
  /**
   * nombre del dashbaord.
   */
  name: string;
  userId: string;
  data: string;
  //informacion llenada por un pipe de service.
  json?: DataGridDashboardDTO[];
}

/**
 * informacion de la grilla y las plantillas de graficas aplicadas a cada una.
 */
export interface DataGridDashboardDTO {
  grid: GridsterItem;
  formTemplate: FormGridTemplate;
}
