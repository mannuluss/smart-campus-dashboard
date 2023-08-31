import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderModule } from './loader/loader.module';
import { DialogModule } from '@angular/cdk/dialog';
import { ModalDialogModule } from './dialog/modal-dialog.module';
import { ModalConfirmModule } from './modal-confirm/modal-confirm.module';
@NgModule({
  declarations: [],
  imports: [CommonModule, LoaderModule, ModalDialogModule, ModalConfirmModule],
  exports: [LoaderModule, ModalDialogModule, ModalConfirmModule],
})
export class CoreModule {}
