/**
 * informacion de los datos enviados por el dispositivo.
 */
export interface DataMessageDTO {
  deviceUUID: number;
  topic: string;
  timeStamp: string;
  /**
   * key : value
   */
  values: { [key: string]: any };
  status: string;
  alert: boolean;
}
