export class DeviceDTO {
  id: number;
  name: string;
  description: string;
  is_gateway?: boolean;
  device_parent?: number;
}
