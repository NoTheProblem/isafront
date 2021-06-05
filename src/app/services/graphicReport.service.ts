import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {PharmacyExaminationReportModel} from '../model/pharmacyExaminationReport.model';
import {PharmacyMedicineReportModel} from '../model/pharmacyMedicineReport.model';
import {Constants} from './constants';

@Injectable()
export class GraphicReportService {
  private path = '';

  constructor(private httpClient: HttpClient) {
  }


  public getDataForExaminationReport(tip: string): Observable<PharmacyExaminationReportModel> {
    if (tip === 'Mesecni izvestaj'){
      this.path = Constants.API + '/pharmacyReport/examination/monthly/2021/5';
    }
    if (tip === 'Godisnji izvestaj'){
      this.path = Constants.API + '/pharmacyReport/examination/yearly/2021';
    }
    if (tip === 'Kvartalni izvestaj'){
      this.path = Constants.API + '/pharmacyReport/examination/quartally/2021/2';
    }
    return this.httpClient.get<PharmacyExaminationReportModel>(this.path);
  }

  public getDataForExaminationReportMonthly(extraPath: string): Observable<PharmacyExaminationReportModel> {
    this.path = Constants.API + '/pharmacyReport/examination/monthly/' + extraPath;
    return this.httpClient.get<PharmacyExaminationReportModel>(this.path);
  }
  public getDataForExaminationReportQuartaly(extraPath: string): Observable<PharmacyExaminationReportModel> {
    this.path = Constants.API + '/pharmacyReport/examination/quartally/' + extraPath;
    return this.httpClient.get<PharmacyExaminationReportModel>(this.path);
  }
  public getDataForExaminationReportYearly(extraPath: string): Observable<PharmacyExaminationReportModel> {
    this.path = Constants.API + '/pharmacyReport/examination/yearly/' + extraPath;
    return this.httpClient.get<PharmacyExaminationReportModel>(this.path);
  }

  public getDataForIncomeReport(startDate: any, endDate: any): Observable<PharmacyExaminationReportModel> {
    this.path = Constants.API + '/pharmacyReport/income/' + String(startDate) + '/' + String(endDate);
    return this.httpClient.get<PharmacyExaminationReportModel>(this.path);
  }

  public getDataForMedicineReportMonthly(extraPath: string): Observable<PharmacyMedicineReportModel> {
    this.path = Constants.API + '/pharmacyReport/medicine/monthly/' + extraPath;
    return this.httpClient.get<PharmacyMedicineReportModel>(this.path);
  }

  public getDataForMedicineReportQuartal(extraPath: string): Observable<PharmacyMedicineReportModel> {
    this.path = Constants.API + '/pharmacyReport/medicine/quartally/' + extraPath;
    return this.httpClient.get<PharmacyMedicineReportModel>(this.path);
  }

  public getDataForMedicineReportYearly(extraPath: string): Observable<PharmacyMedicineReportModel> {
    this.path = Constants.API + '/pharmacyReport/medicine/yearly/' + extraPath;
    return this.httpClient.get<PharmacyMedicineReportModel>(this.path);
  }


}
