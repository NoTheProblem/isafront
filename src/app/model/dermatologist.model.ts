import {PharmacyModel} from './pharmacy.model';
import {ExaminationModel} from './examination.model';
import {WorkingHoursModel} from './workingHours.model';

export class DermatologistModel {
  constructor(
    public id: number = 0,
    public evaluationGrade: number = 0.00,
    public firstName: string,
    public lastName: string,
    public username: string,
    public email: string,
    public country: string,
    public city: string,
    public address: string,
    public phoneNumber: string,
    public birthDate: string,
    public workingHours: Array<WorkingHoursModel>,
    public examinations: Array<ExaminationModel>,
    public pharmacys: Array<PharmacyModel>
  ) {
  }
}

