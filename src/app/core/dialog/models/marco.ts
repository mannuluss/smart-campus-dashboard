import { ComponentType } from '@angular/cdk/portal';
import { Button } from './button';
import { Point } from '@angular/cdk/drag-drop';
/**
 * Interface que define la configuración que se le puede pasar a un crud dialog
 */
export interface Marco {
  /**
   * Titulo del dialog
   */
  title: string | any;
  /**
   * Componente que se mostrará en el dialog: Deberá ser importado en la sección EntryComponents del módulo
   */
  component: ComponentType<any>;
  /**
   * Data que recibirá el componente que se mostrará en el dialog, deberá incluir en su constructor una inyección de MAT_DIALOG_DATA
   */
  dataComponent: any;

  /**
   * Ancho máximo del dialog. Por defecto 600px.
   */
  maxWidth?: string;

  /**
   * Alto máximo que tendrá el dialog. Por defecto es 90vh.
   */
  maxHeight?: string;

  /**
   * Ancho del modal respecto a la ventana del navegador. Por defecto es 95%.
   */
  width?: string;

  /**
   * Ancho mínimo del dialog. Por defecto 300px.
   */
  minWidth?: string;

  /**
   * Indica si el último campo dentro del formulario del modal NO tiene un campo de material con padding de errores. Default: false.
   */
  lastFieldIsNotMaterialComponentWithError?: boolean;

  /**
   * Acciones que recibirá el dialog
   */
  actions?: {
    /**
     * Nombre que tendrá la acción primaria
     */
    primary?: string | any;
    /**
     * Nombre que tendrá la acción secundaria
     */
    secondary?: string | any;
    /**
     * Otros botones que se mostrarán en el dialog
     */
    otherButtons?: Button[];
  };

  /**
   * Permite pasar estilos customizados a la barra superior del modal.
   */
  stylesTopBar?: { [key: string]: string | number };

  /**
   * Permite mostrar u ocultar el botón X de cerrar del modal. Default false.
   */
  hideCloseButtonInTopBar?: boolean;

  /**
   * Permite mostrar u ocultar la imagen lateral del modal. Default false.
   */
  hideImg?: boolean;
}
