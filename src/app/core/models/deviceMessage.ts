/**
 * Device message model.
 * @version 2.0
 * @autor Felipe Rojas
 */
export interface DeviceMessage {
  id: number;
  uuid: string;
  timestamp: Date;
  topic: string;
  values: { [name: string]: any };
  status: string;
  alert: boolean;
}
