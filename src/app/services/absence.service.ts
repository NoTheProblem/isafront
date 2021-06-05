import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbsenceModel} from '../model/absence.model';
import {Observable} from 'rxjs';
import {Toast, ToastrService} from 'ngx-toastr';
import {Constants} from './constants';



@Injectable()
export class AbsenceService {

  constructor(private httpClient: HttpClient,
              private toast: ToastrService
              ) {
  }


  public getAllDermatologistRequests(): Observable<Array<AbsenceModel>> {
    return this.httpClient.get<Array<AbsenceModel>>(Constants.API + '/absence/getAllDermatologistRequests');
  }

  public getAllPharmacistRequests(): Observable<Array<AbsenceModel>> {
    return this.httpClient.get<Array<AbsenceModel>>(Constants.API + '/absence/getAllPharmacistRequests');
  }

  public getAbsenceByID(id: number): Observable<AbsenceModel> {
    return this.httpClient.get<AbsenceModel>(Constants.API + '/absence/getById/' + String(id));
  }

  public getAbsenceByEmpID(id: number): Observable<Array<AbsenceModel>> {
    return this.httpClient.get<Array<AbsenceModel>>(Constants.API + '/absence/getByEmployeeId/' + String(id));
  }

  public sendAnswer(absence: AbsenceModel): void {
    this.httpClient.put(  Constants.API + '/absence/answer', absence).subscribe(
      (response: any) => {
        this.toast.success(`Zahtev je obradjen.`);
      },
      (error => {
        this.toast.error(`Greske pri obradi `);
      })
    );
  }

}
