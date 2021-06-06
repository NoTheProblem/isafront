import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ExaminationModel} from '../model/examination.model';
import {ToastrService} from 'ngx-toastr';
import {Constants} from './constants';
import {DermatologistModel} from '../model/dermatologist.model';

@Injectable()
export class ExaminationService {
  private path = '';

  constructor(private httpClient: HttpClient,
              private toast: ToastrService
  ) {
  }

  public getAllFree(): Observable<Array<ExaminationModel>> {
    return this.httpClient.get<Array<ExaminationModel>>(Constants.API + '/examination/getAllFree');
  }

  public addExamination(examination: ExaminationModel): void {
    this.httpClient.post(Constants.API + '/examination/addExamination', examination).subscribe(
      (response: any) => {
        this.toast.success(`Termin je uspesno dodat!`);
        },
      (error => {
        this.toast.error(`Doslo je do greske`);
      })
    );
  }

  public getExaminationsForDermatologistByDateForPhaAdmin(derma: DermatologistModel, y: Date): Observable<Array<ExaminationModel>> {
    this.path = Constants.API + '/examination/getByDermaIdAndDateForPhaAdmin/' + String(derma.id) + '/' + String(y);
    return this.httpClient.get<Array<ExaminationModel>>(this.path);
  }

}
