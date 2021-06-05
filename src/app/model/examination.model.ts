import {PharmacyModel} from './pharmacy.model';
import {DermatologistModel} from './dermatologist.model';

export class ExaminationModel {
  constructor(
    public id: number = 0,
    public penalty: boolean,
    public isFree: boolean,
    public examinationReport: string = '',
    public loyaltyScore: number = 0,
    public date: Date = new Date(),
    public time: string = '',
    public durationMinutes: number = 0,
    public price: number = 0,
    public dermatologistId: number= 0,
    public patient: number= 0,
    public dermatologistName: string = '',
    public dermatologistLastname: string = '',
    public dermatologistEvaluationGrade: string = '',
    public pharmacy: PharmacyModel,
    public dermatologist: DermatologistModel
  ) {
  }
}
