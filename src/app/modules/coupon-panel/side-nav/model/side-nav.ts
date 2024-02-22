import { KeyValue } from "@angular/common";
import { Services } from "src/app/shared/models/constants/constant.type";

export const ServiceDisplayName: { [key in Services]?: string } = {
    [Services.Food]: 'Food',
    [Services.PND]: 'Pickup & Drop',
    [Services.Grocery]: 'Grocery',
    [Services.Paan]: 'Paan',
    [Services.Flower]: 'Flower',
    [Services.Pharmacy]: 'Pharmacy',
    [Services.Pet]: 'Pet',
}

export const originalOrder = (a: KeyValue<string, string>, b: KeyValue<string, string>): number => {
    return 0;
  }