import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderModule } from './loader/loader.module';
import { ModalDialogModule } from './dialog/modal-dialog.module';
import { ModalConfirmModule } from './modal-confirm/modal-confirm.module';
import { MqttModule } from 'ngx-mqtt';
import { mqttOptions } from './providers/mqtt-service.provider';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { keyCloakInitializer } from './auth/utils/keycloackInitializer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoaderModule,
    ModalDialogModule,
    ModalConfirmModule,
    MqttModule.forRoot(mqttOptions),
    KeycloakAngularModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: keyCloakInitializer,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  exports: [LoaderModule, ModalDialogModule, ModalConfirmModule],
})
export class CoreModule {}
