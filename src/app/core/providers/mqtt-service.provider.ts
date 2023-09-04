import { IMqttServiceOptions } from "ngx-mqtt";
import { environment } from "src/environments/environment";

export const mqttOptions: IMqttServiceOptions = {
  hostname: environment.brokerUrl,
  port: environment.brokerPort,
  path: environment.brokerPath,
  clientId: "webapp-dashboard",
};
