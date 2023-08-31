import { Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Snackbar } from '../models/snackbar.model';
import { configSnackbar, ConfigSnackbarInt } from '../config/snackbar.config';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from '../../models/api-error';
/**
 * Servicio de snackbar
 *
 * @export
 * @class SnackbarService
 */
@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  /**
   * Constructor del servicio.
   *
   * @param {MatSnackBar} snackbar - Servicio de snackbar.
   */
  constructor(private snackbar: MatSnackBar, private injector: Injector) {}

  /**
   * Permite mostrar un snackbar con los estándares de la uis.
   * @param {Snackbar} data - Objeto con la información del snackbar.
   * @param {number} durationShow - Duración en milisegundos del snackbar.
   * @param {ConfigSnackbarInt} options - Opciones del snackbar.
   */
  show(data: Snackbar, durationShow?: number, options?: ConfigSnackbarInt) {
    let { duration, positionH, positionV, action } = options ?? configSnackbar;
    duration = durationShow ?? duration;
    this.snackbar.open(data.mensaje, action, {
      duration,
      horizontalPosition: positionH,
      verticalPosition: positionV,
      panelClass: [data.tipo],
    });
  }

  /**
   * Un método para mostrar los errores de backend por defecto.
   *
   * @param {HttpErrorResponse} result - Resultado de la petición.
   * @param {ConfigSnackbarInt} options - Opciones del snackbar.
   */
  showBackError(result: HttpErrorResponse, options?: ConfigSnackbarInt): void {
    const error = result.error as ApiError;
    const { duration, positionH, positionV, action } =
      options ?? configSnackbar;
    if (!error?.message) {
      console.error(error);
    }
    this.snackbar.open(
      error?.message ? error.message : 'No se pudo realizar la acción',
      action,
      {
        duration,
        horizontalPosition: positionH,
        verticalPosition: positionV,
        panelClass: 'error',
      }
    );
  }
}
