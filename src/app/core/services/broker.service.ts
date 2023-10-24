import { Injectable } from '@angular/core';
import { SnackbarService } from '@core/snackbar/services/snackbar.service';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrokerService {
  constructor(
    private mqttService: MqttService,
    private snackbar: SnackbarService,
  ) {}

  // Conectarse al broker MQTT
  connect() {
    this.mqttService.onError.subscribe((e) =>
      this.snackbar.show({
        mensaje: 'Error al conectar con el broker MQTT',
        tipo: 'error',
      }),
    );
    this.mqttService.connect();
  }

  // Desconectarse del broker MQTT
  disconnect() {
    this.mqttService.disconnect();
  }

  // Suscribirse a un topic
  subscribe(topic: string): Observable<IMqttMessage> {
    return this.mqttService.observe(topic);
  }

  // Publicar un mensaje en un topic
  publish(topic: string, message: string) {
    this.mqttService.unsafePublish(topic, message, { qos: 1, retain: true });
  }
}
