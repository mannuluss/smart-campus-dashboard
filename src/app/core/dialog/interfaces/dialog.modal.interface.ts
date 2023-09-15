/**
 * interfaz de los componentes que se incluyen dentro del dialogo.
 */
export interface IDialogModal {
  /**
   * metodo utilizado para limpiar el fomulario del componente.
   * se debe implementar en el componente que se desee utilizar.
   */
  limpiarFormulario(): void;
}
