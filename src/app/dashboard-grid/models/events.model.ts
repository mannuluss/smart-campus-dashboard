import { GridsterItem } from "angular-gridster2";
import { TemplateDTO } from "src/app/core/models/template.dto";
import { FormGridTemplate } from "./form-grid-template";

export interface EventGridRemoveItem {
  /**
   * evento del boton al ser presionado.
   */
  event$: Event;
  /**
   * elemento a eliminar
   */
  item: GridsterItem;
  /**
   * indice del elemento a eliminar
   */
  i: number;
}


/**
 * evento que es emitido al selecionar o cambiar el template de una grafica en una grid.
 */
export interface EventGridSaveItem {
  index: number;
  formTemplate: FormGridTemplate;
}
