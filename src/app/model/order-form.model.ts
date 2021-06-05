import {MedicineQuantityModel} from './medicineQuantity.model';

export class OrderFormModel {
  constructor(
    public id: number = 0,
    public status: string,
    public pharmacyAdmin: number,
    public chosenSupplier: number,
    public price: number,
    public endDate: Date,
    public createDate: Date,
    public medQuan: MedicineQuantityModel
  ) {
  }
}
