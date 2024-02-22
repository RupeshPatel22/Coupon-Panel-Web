export interface IApiEndPoint {
  service: string;
  prefix?: string;
}

export enum Services {
  Food = 'food',
  Grocery = 'grocery',
  PND = 'pnd',
  Pharmacy ='pharmacy',
  Paan = 'paan',
  Flower = 'flower',
  Pet = 'pet',
}

export enum Roles {
  superadmin = 'Super Admin',
  admin = 'Admin',
  serviceability = 'Serviceability',
  catalog = 'Catalog',
  oneview = 'One View',
  fleet_manager = 'Fleet Manager',
  ops_manager = 'Ops Manager',
  finance_manager = 'Finance Manager'
}

export const apiEndPoints: { [key in Services]: IApiEndPoint} = {
    [Services.Food]: {service: 'food', prefix: 'restaurant'},
    [Services.Grocery]: {service:'grocery', prefix: 'store'},
    [Services.PND]: {service: 'pnd'},
    [Services.Pharmacy]:{service:'pharmacy', prefix: 'outlet'},
    [Services.Paan]:{service:'paan', prefix: 'outlet'},
    [Services.Flower]: {service:'flower', prefix: 'outlet'},
    [Services.Pet]: {service: 'pet', prefix: 'outlet'},
  }