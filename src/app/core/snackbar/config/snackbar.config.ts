import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
/**
 * Interface que define la configuración de los snackbar
 */
export interface ConfigSnackbarInt {
  /**
   * Describe la posición horizontal del snackbar
   */
  positionH: MatSnackBarHorizontalPosition;
  /**
   * Describe la posición vertical del snackbar
   */
  positionV: MatSnackBarVerticalPosition;
  /**
   * Describe el tiempo de duración del snackbar en milisegundos
   */
  duration: number;
  /**
   * Describe el titulo que saldrá en la acción del snackbar
   */
  action: string;
}

/**
 * Configuración por defecto de todos los snackbar
 */
export const configSnackbar: ConfigSnackbarInt = {
  positionH: 'right',
  positionV: 'top',
  duration: 5000,
  action: 'Ok',
};
