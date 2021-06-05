import {PharmacyModel} from './pharmacy.model';
import {PharmacistModel} from './pharmacist.model';

export class WorkingHoursPharmacist {
  constructor(
    public id: number = 0,
    public startTime: Date,
    public endTime: Date,
    public pharmacy: PharmacyModel,
    public pharmacist: PharmacistModel,
    public workDay: string
  ) {
  }
}
