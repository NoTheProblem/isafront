import {PharmacyModel} from './pharmacy.model';
import {DermatologistModel} from './dermatologist.model';

export class WorkingHoursModel {
  constructor(
    public id: number = 0,
    public startTime: Date,
    public endTime: Date,
    public pharmacy: PharmacyModel,
    public dermatologist: DermatologistModel,
    public workDay: string
  ) {
  }
}

