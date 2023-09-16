import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from 'src/app/shared/material/material.module';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss'],
})
export class ModalConfirmComponent {
  /**
   * Acción emitida.
   */
  @Output() accion = new EventEmitter<boolean>();

  /**
   * Constructor del componente.
   *
   * @param data - Data que se enviará al componente.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      content: string;
      actions?: {
        primary?: string | undefined;
        secondary?: string | undefined;
      };
    }
  ) {}

  /**
   * Al aceptar el confirm.
   */
  aceptar() {
    this.accion.emit(true);
  }

  /**
   * Al cancelar el confirm.
   */
  cancelar() {
    this.accion.emit(false);
  }
}
