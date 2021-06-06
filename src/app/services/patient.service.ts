import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MedicineModel} from '../model/medicine.model';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {PatientModel} from '../model/patient.model';
import {Constants} from './constants';

@Injectable()
export class PatientService {

  constructor(
    private httpClient: HttpClient,
    private toast: ToastrService
  ) {
  }

  public addAllergy(medicine: MedicineModel): void {
    this.httpClient.post(Constants.API + '/patient/addAllergy', medicine).subscribe(
      (response: any) => {
        this.toast.success(`Dodata alergija na ${medicine.name}`);
      },
      (error => {
        this.toast.error(`Nije dodata alergija na ${medicine.name}`);
      })
    );
  }

  public getAll(): Observable<Array<PatientModel>> {
    return this.httpClient.get<Array<PatientModel>>(Constants.API + '/patient/getAll');
  }

}
