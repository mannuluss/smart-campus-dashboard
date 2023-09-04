import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderModule } from './loader/loader.module';
import { ModalDialogModule } from './dialog/modal-dialog.module';
import { ModalConfirmModule } from './modal-confirm/modal-confirm.module';
import { MqttModule } from 'ngx-mqtt';
import { mqttOptions } from './providers/mqtt-service.provider';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoaderModule,
    ModalDialogModule,
    ModalConfirmModule,
    MqttModule.forRoot(mqttOptions),
  ],
  exports: [LoaderModule, ModalDialogModule, ModalConfirmModule],
})
export class CoreModule {}
