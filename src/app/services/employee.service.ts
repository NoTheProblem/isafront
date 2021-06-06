import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EmployeeModel} from '../model/employee.model';
import {DermatologistModel} from '../model/dermatologist.model';
import {PharmacistModel} from '../model/pharmacist.model';
import {ToastrService} from 'ngx-toastr';
import {Constants} from './constants';


@Injectable()
export class EmployeeService {
  path: string;
  constructor(private httpClient: HttpClient,
              private toast: ToastrService) {
  }

  public getAllDermaByPharmacyID(pharmacyID): Observable<Array<EmployeeModel>> {
    this.path = Constants.API + '/pharmacy/getDerma/' + String(pharmacyID);
    return this.httpClient.get<Array<EmployeeModel>>(this.path);
  }

  public getAllPharmacistsByPharmacyID(pharmacyID): Observable<Array<EmployeeModel>> {
    this.path = Constants.API + '/pharmacy/getPharma/' + String(pharmacyID);
    return this.httpClient.get<Array<EmployeeModel>>(this.path);
  }

  public getAllPharmacists(): Observable<Array<PharmacistModel>> {
    return this.httpClient.get<Array<PharmacistModel>>(Constants.API + '/pharmacist/getAll');
  }

  public getAllDermatologists(): Observable<Array<DermatologistModel>> {
    return this.httpClient.get<Array<DermatologistModel>>(Constants.API + '/dermatologist/getAll');
  }

  public deleteEmployee(emp: EmployeeModel): void {
    this.path = Constants.API + '/pharmacy/deleteEmployee/' + String(emp.id);
    this.httpClient.post(this.path, ' ').subscribe(
      (response: any) => {
        this.toast.success(`Zaposleni je uklonjen`);
      },
      (error => {
        this.toast.error(`Doslo je do greske.`);
      })
    );
  }

  public getAllFreePharmacists(): Observable<Array<PharmacistModel>> {
    return this.httpClient.get<Array<PharmacistModel>>(Constants.API + '/pharmacist/getAllFree');
  }

  public getAllDermatologistsCandidates(): Observable<Array<DermatologistModel>> {
    return this.httpClient.get<Array<DermatologistModel>>(Constants.API + '/dermatologist/getAllDermatologistsCandidates');
  }

  public addPharmacistToPharmacy(pharmacist: PharmacistModel): void {
    this.httpClient.post(Constants.API + '/pharmacist/addToPharmacy', pharmacist).subscribe(
      (response: any) => {
        this.toast.success(`Farmaceut je dodat.`);
      },
      (error => {
        this.toast.error(`Farmaceut nije dodat.`);
      })
    );
  }

  public registerNewPharmacistForPharmacy(pharmacist: PharmacistModel): void {
    this.httpClient.post(Constants.API + '/pharmacist/registerToPharmacy', pharmacist).subscribe(
      (response: any) => {
        this.toast.success(`Farmaceut je dodat.`);
      },
      (error => {
        this.toast.error(`Farmaceut nije dodat.`);
      })
    );
  }
  public addDermatologistToPharmacy(dermatologist: DermatologistModel): void {
    this.httpClient.post(Constants.API + '/dermatologist/addToPharmacy', dermatologist).subscribe(
      (response: any) => {
        this.toast.success(`Dermatolog je dodat.`);
      },
      (error => {
        this.toast.error(`Dermatolog nije dodat. `);
      })
    );
  }

}
