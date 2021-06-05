import {PharmacyModel} from './pharmacy.model';
import {MedicineModel} from './medicine.model';

export class PriceMedicineModel {
  constructor(
    public id: number,
    public startDate: Date,
    public endDate: Date,
    public price: number,
    public pharmacy: PharmacyModel,
    public medicine: MedicineModel
  ) {
  }
}




