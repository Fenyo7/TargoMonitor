export interface addMachineDTO {
  clientId: number;
  addressCity: string;
  addressStreet: string;
  usePlace?: string;
  isDangerous: boolean;
  isLifting: boolean;
  inspectionGroupNumber: number;
  inventoryNumber?: number;
  kind: string;
  name: string;
  brand?: string;
  type?: string;
  factoryNumber?: string;
  manufactureYear?: string;
  commissionDate?: Date;
  lastMainInsDate?: Date;
  note?: string;

  // ### Adattábla szerinti adatok ###

  licenseNumber?: string;
  adapterName?: string;
  controlMode?: string;
  vehicleType?: string;
  liftHeight?: string;
  ropeDiam?: string;
  console?: string;
  weight?: string;
  power?: string;
  chain?: string;
  load?: string;
  span?: string;
  rope?: string;
  bend?: string;
}
