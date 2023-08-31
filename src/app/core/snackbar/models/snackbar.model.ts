/**
 * Interfaz de describe la estructura del modelo de Snackbar
 */
export interface Snackbar {
  /**
   * Mensaje que el snackbar va a mostrar
   */
  mensaje: string;
  /**
   * Tipo de snackbar
   */
  tipo: 'error' | 'success' | 'warning'; //'error', 'success', 'warning'
}
