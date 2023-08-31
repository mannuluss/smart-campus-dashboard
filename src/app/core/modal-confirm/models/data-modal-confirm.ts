/**
 * Interface que define la data que se le puede pasar a una modal de confirmación.
 */
export interface DataModalConfirm {
  /**
   * Título de la ventana de confirmación.
   */
  title: string;

  /**
   * Contenido de la ventana de confirmación.
   */
  content: string;

  /**
   * Configuración de acciones de la ventana de confirmación.
   */
  actions?: {
    /**
     * Acción primaria.
     */
    primary?: string;

    /**
     * Acción secundaria.
     */
    secondary?: string;
  };
}
