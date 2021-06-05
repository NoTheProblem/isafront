import {OrderFormModel} from './order-form.model';
import {SupplierModel} from './supplier.model';

export class BidModel {
  constructor(
    public id: number,
    public price: number,
    public status: string,
    public endDate: Date,
    public supplier: SupplierModel,
    public purchaseOrder: OrderFormModel
  ) {
  }
}



