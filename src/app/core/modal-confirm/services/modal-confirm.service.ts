import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataModalConfirm } from '../models/data-modal-confirm';
import { ModalConfirmComponent } from '../components/modal-confirm.component';

@Injectable({
  providedIn: 'root',
})
export class ModalConfirmService {
  /**
   * @ignore
   */
  constructor(private dialog: MatDialog) {}
  /**
   * Método para mostrar un diálogo de confirmación
   *
   * @param {DataShowConfirm} data - Data a mostrar en la ventana de confirmación: title, content y actions: {primary, secondary}
   * @returns {Promise<boolean>} - Promesa que resuelve con un booleano indicando si se aceptó o no la confirmación
   */
  public show(data: DataModalConfirm): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const dialogRef = this.dialog.open(ModalConfirmComponent, {
        disableClose: true,
        panelClass: 'modalax12789',
        maxHeight: '90vh',
        maxWidth: '600px',
        minWidth: '300px',
        width: '95%',
        autoFocus: false,
        data,
      });
      dialogRef.componentInstance.accion.subscribe(
        (accion: boolean) => {
          resolve(accion);
        },
        (err) => {
          reject(err);
        },
      );
    });
  }
}
