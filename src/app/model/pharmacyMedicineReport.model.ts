import {MedQuanReportModel} from './MedQuanReport.model';

export class PharmacyMedicineReportModel {
  constructor(
    public categories: Array<string>,
    public data: Array<MedQuanReportModel>,
  ) {
  }
}
