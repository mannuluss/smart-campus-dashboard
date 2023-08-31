/**
 * Interfaz que define el modelo de un botón.
 */
export interface Button {
  /**
   * Texto del botón.
   */
  nombre: string | any;
  /**
   * Acción del botón.
   */
  action?: (...args: any) => any;
  /**
   * tipo del botón
   */
  type: 'primary' | 'secondary';

  /**
   * Si se le quieren aplicar estilos customizados a los botones.
   */
  customStyles?: { [key: string]: string | number };
}
